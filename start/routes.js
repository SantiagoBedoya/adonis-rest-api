'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('api/v1/login', 'UserController.login').as('login');

Route.group(() => {
  Route.resource('users', 'UserController')
    .middleware(new Map([
      [['index', 'show', 'store', 'update', 'destroy'], ['auth']]
    ]));
}).prefix('api/v1')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
