module.exports = {
    plugins: ['~/plugins/store.js', '~/plugins/filter.js'],
    server: {
        host: '0.0.0.0', // 配置端口
        port: 3000,
    },
    router: {
        // base: '/test',
        linkActiveClass: 'active',
        extendRoutes (routes, resolve) {
            routes.splice(0)
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layout/index.vue'),
                children: [
                    {
                        path: '/',
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/index.vue')
                    },
                    {
                        path: '/login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/settings',
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    {
                        path: '/editor',
                        name: 'editor',
                        component: resolve(__dirname, 'pages/article/creatOrEdit.vue')
                    },
                    {
                        path: '/article/:slug',
                        name: 'article',
                        component: resolve(__dirname, 'pages/article/index.vue')
                    },
                    {
                        path: '/profile/:username',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: '/profile/:username/favorites',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    }
                ]
            }])
        }
    }
}