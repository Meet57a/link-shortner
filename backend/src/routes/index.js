const router = require('express').Router();

const routes = [
    {
        path: '/auth',
        router: require('./auth-routes')
    },

];

routes.forEach((route) => {
    return router.use(route.path, route.router);
});

module.exports = router;