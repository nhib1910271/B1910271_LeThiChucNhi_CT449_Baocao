import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: "/",
        component: () => import("@/views/layouts/UserLayout.vue"),
        children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/views/HomePage.vue"),
            },
            {
                path: "tours",
                name: "Tours",
                component: () => import("@/views/tours/ToursPage.vue"),
            },
            {
                path: "tours/:id",
                name: "Detail",
                component: () => import("@/views/tours/TourDetail.vue"),
            },
            {
                path: "my-tour",
                name: "MyTour",
                component: () => import("@/views/orders/OrderPage.vue"),
            },
            {
                path: "login",
                name: "Login",
                component: () => import("@/views/auth/LoginPage.vue"),
            },
            {
                path: "register",
                name: "Register",
                component: () => import("@/views/auth/RegisterPage.vue"),
            },
            {
                path: "contact",
                name: "Contact",
                component: () => import("@/views/ContactPage.vue"),
            },
        ],
    },
    {
        path: "/admin/",
        component: () => import("@/views/layouts/AdminLayout.vue"),
        children: [
            {
                path: "",
                name: "productManager",
                component: () => import("@/views/admin/ProductsManager.vue"),
            },
            {
                path: "orders",
                name: "orderManager",
                component: () => import("@/views/admin/OrdersManager.vue"),
            },
            {
                path: "users",
                name: "userManager",
                component: () => import("@/views/admin/UsersManager.vue")
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


export default router