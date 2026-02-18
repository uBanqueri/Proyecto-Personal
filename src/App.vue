<template>
  <header class="flex flex-row justify-between p-4">
    <img src="../public/images/LogoClaro.png" alt="" width="40px">
    <nav class="flex  gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/juegos">Juegos</RouterLink>
      <RouterLink to="/libros">Libros</RouterLink>
      <template v-if="!userStore.usuario">
        <RouterLink to="/login">Iniciar Sesion</RouterLink>
      </template>
      <template v-else>
        <div class="relative group">          
          <div class="flex gap-2">
            <RouterLink to="/perfil">{{userStore.usuario.nombreUsuario}}</RouterLink>
          </div>          
          <div>
            <div class="hidden group-hover:block absolute right-0 bg-green-500">
              <RouterLink to="/perfil" class="whitespace-nowrap">Mi Perfil</RouterLink> <br>
              <button @click="logout" class="whitespace-nowrap hover:cursor-pointer">Cerrar Sesion</button>
            </div>
          </div>
        </div>
          <img class="rounded-full" src="../../images/default.png" alt="fPerfil" width="40px">
      </template>
      

    </nav>
  </header>
  <body class="bg-blue-200 pb-10">
    <RouterView/> 
  </body>  
  <footer class="bg-red-500">
    <p class="text-center">MediaVault &copy; 2026</p>
  </footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import {usuariosStore} from './stores/usuarios';
import { useRouter } from 'vue-router';

const userStore = usuariosStore();
const router = useRouter();

function logout(){
  userStore.logout();
  router.push('/');
}
</script>


