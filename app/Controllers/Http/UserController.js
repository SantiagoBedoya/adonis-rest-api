'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return User.all();
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const {username, email, password} = request.all();
    const user = await User.create({
      username,
      email,
      password
    });
    return user;
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const user = await User.find(params.id);
    if(!user){
      return response.status(404).json({
        status:404,
        message: 'User not found'
      });
    }
    return user;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id} = params;
    const {username, email, password} = request.all();

    const user = await User.find(id);

    user.username = username;
    user.email = email;
    user.password = password;
    user.save();

    return user;
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const {id} = params;
    const user = await User.find(id);

    user.delete();
    return user;
  }

  /**
   * Authenticate user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, response, auth }) {
    const {email, password} = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

}

module.exports = UserController
