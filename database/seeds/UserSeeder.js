'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User');

class UserSeeder {
  async run () {
    await User.create({
      username: 'SantiagoBedoya',
      email: 'sbedoya784@misena.edu.co',
      password: '1002656487'
    });
  }
}

module.exports = UserSeeder
