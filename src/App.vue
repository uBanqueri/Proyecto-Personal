<template>
  <div class="flex flex-col min-h-screen">
    <header class="">
      <img class="w-50 rounded-xl ml-10" src="../public/images/logos/frame3.png" alt="">
      <nav class="flex gap-4 items-center">
        <RouterLink class="navOp" to="/">Inicio</RouterLink>
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
              <div class="hidden text-white text-2xl bg-neutral-800 group-hover:block absolute rounded-xl p-2 border">
                <RouterLink to="/perfil" class="whitespace-nowrap p-2 hover:bg-neutral-600 rounded-xl">Mi Perfil</RouterLink> <br>
                <button @click="logout" class="whitespace-nowrap p-2 hover:bg-neutral-600 hover:underline hover:decoration-red-500 rounded-xl">Cerrar Sesion</button>
              </div>
            </div>          
          </div>
            <img class="rounded-full w-15 h-15" src="../../images/default.png" alt="fPerfil" width="40px">
        </template>
        <!--
        <button @click="userStore.alternarTema">
          <img class="w-10" :src="userStore.esOscuro ? '/images/mandoTema.png' : '/images/libroTema.png' " alt="FotosTema">
        </button>
        -->
      </nav>
    </header>
    <body class="grow">
      <RouterView/> 
    </body>  
    <footer class="h-25 flex justify-center items-center">
      <img class="h-10" src="../public/images/MediaVaultOscuro.png" alt="">
    </footer>
  </div>
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


