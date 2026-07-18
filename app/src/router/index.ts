import { createRouter, createWebHistory } from 'vue-router';

import Index from '../components/IndexComponent.vue'
import Stats from '../routes/StatsComponent.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;