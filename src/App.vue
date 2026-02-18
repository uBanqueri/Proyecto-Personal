<template>
  <header class="flex flex-row justify-between p-4 text-2xl bg-amber-50 border-b-4">
    <img class="w-20 rounded-xl ml-10" src="../public/images/LogoClaro.png" alt="">
    <nav class="flex gap-4 items-center">
      <RouterLink class="navOp" to="/">Home</RouterLink>
      <RouterLink class="navOp" to="/juegos">Juegos</RouterLink>
      <RouterLink class="navOp" to="/libros">Libros</RouterLink>
      <template v-if="!userStore.usuario">
        <RouterLink class="navOp" to="/login">Iniciar Sesion</RouterLink>
      </template>
      <template v-else>
        <div class="relative group">          
          <div class="flex gap-2">
            <RouterLink class="navOp" to="/perfil">{{userStore.usuario.nombreUsuario}}</RouterLink>
          </div>          
          <div>
            <div class="hidden group-hover:block absolute right-0 border-2">
              <RouterLink to="/perfil" class="whitespace-nowrap">Mi Perfil</RouterLink> <br>
              <button @click="logout" class="whitespace-nowrap hover:cursor-pointer">Cerrar Sesion</button>
            </div>
          </div>
        </div>
          <img class="rounded-full w-15 h-15" src="../../images/default.png" alt="fPerfil" width="40px">
      </template>
      

    </nav>
  </header>
  <body>
    <RouterView/> 
  </body>  
  <footer class="">
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


