import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JuegosView from '../views/JuegosView.vue'
import LibrosView from '../views/LibrosView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PerfilView from '../views/PerfilView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/juegos',
      name: 'juegos',
      component: JuegosView
    },
    {
      path: '/libros',
      name: 'libros',
      component: LibrosView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },
  ],
})

export default router
