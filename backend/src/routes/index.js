const path = require('path');

const router = require('express').Router(); 

const routes = [
    {
        path: '/auth',
        router: require('./auth-routes')
    },
    {
        path: '/fetch',
        router: require('./fetch-routes')
    },
    {
        path: '/url',
        router: require('./url-routes')
    }
];

routes.forEach((route) => {
    return router.use(route.path, route.router);
});

module.exports = router;