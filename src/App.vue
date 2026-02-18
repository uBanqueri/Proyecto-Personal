<template>
  <header class="flex flex-row justify-between p-4">
    <img src="../public/images/LogoClaro.png" alt="" width="40px">
    <nav class="flex  gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/juegos">Juegos</RouterLink>
      <RouterLink to="/libros">Libros</RouterLink>
      <template v-if="!usuariosStore.usuario">
        <RouterLink to="/login">Iniciar Sesion</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/perfil">{{usuariosStore.usuario.nombre}}</RouterLink>
        <div>
          <img class="rounded-full" src="../../images/default.png" alt="fPerfil" width="40px">
        </div>
      </template>
      

    </nav>
  </header>
  <body class="bg-blue-200 pb-10">
    <RouterView/> 
  </body>  
  <footer class="bg-red-500">
    <p class="text-center">MediaVault &copy; 2024</p>
  </footer>
</template>

<script setup>
import { usuariosStore } from './stores/usuarios';


</script>


