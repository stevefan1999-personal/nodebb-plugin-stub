import type { NextFunction, Request, Response } from 'express'

const nconf = require.main.require('nconf')
const winston = require.main.require('winston')
const routeHelpers = require.main.require('./src/routes/helpers')

const controllers = {
  renderAdminPage(req: Request, res: Response /* , next */) {
    /*
      Make sure the route matches your path to template exactly.
      If your route was:
        myforum.com/some/complex/route/
      your template should be:
        templates/some/complex/route.tpl
      and you would render it like so:
        res.render('some/complex/route');
    */

    res.render('admin/plugins/quickstart', {})
  },
}

export async function init({ router }: { router: any }) {
  /**
   * We create two routes for every view. One API call, and the actual route itself.
   * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
   *
   * Other helpers include `setupAdminPageRoute` and `setupAPIRoute`
   * */
  routeHelpers.setupPageRoute(
    router,
    '/quickstart',
    [
      (req: Request, res: Response, next: NextFunction) => {
        winston.info(
          `[plugins/quickstart] In middleware. This argument can be either a single middleware or an array of middlewares`,
        )
        setImmediate(next)
      },
    ],
    (req: Request, res: Response) => {
      winston.info(
        `[plugins/quickstart] Navigated to ${nconf.get(
          'relative_path',
        )}/quickstart`,
      )
      res.render('quickstart', { uid: req.uid })
    },
  )

  routeHelpers.setupAdminPageRoute(
    router,
    '/admin/plugins/quickstart',
    [],
    controllers.renderAdminPage,
  )
}

/**
 * If you wish to add routes to NodeBB's RESTful API, listen to the `static:api.routes` hook.
 * Define your routes similarly to above, and allow core to handle the response via the
 * built-in helpers.formatApiResponse() method.
 *
 * In this example route, the `ensureLoggedIn` middleware is added, which means a valid login
 * session or bearer token (which you can create via ACP > Settings > API Access) needs to be
 * passed in.
 *
 * To call this example route:
 *   curl -X GET \
 * 		http://example.org/api/v3/plugins/quickstart/test \
 * 		-H "Authorization: Bearer some_valid_bearer_token"
 *
 * Will yield the following response JSON:
 * 	{
 *		"status": {
 *			"code": "ok",
 *			"message": "OK"
 *		},
 *		"response": {
 *			"foobar": "test"
 *		}
 *	}
 */
export async function addRoutes({
  router,
  middleware,
  helpers,
}: {
  router: any
  middleware: any
  helpers: any
}) {
  const middlewares = [
    middleware.ensureLoggedIn, // use this if you want only registered users to call this route
    // middleware.admin.checkPrivileges,	// use this to restrict the route to administrators
  ]

  routeHelpers.setupApiRoute(
    router,
    'get',
    '/quickstart/:param1',
    middlewares,
    (req: Request, res: Response) => {
      helpers.formatApiResponse(200, res, {
        foobar: req.params.param1,
      })
    },
  )
}

export async function addAdminNavigation(header: any) {
  header.plugins.push({
    icon: 'fa-tint',
    name: 'Quickstart',
    route: '/plugins/quickstart',
  })

  return header
}
