<template>
  <main class="mx-10">    
    <h1 class="text-2xl font-bold text-center my-4">Perfil del usuario</h1>
    
    <h2 class="text-xl mx-2 font-semibold">Datos de la cuenta</h2>
    <form @submit.prevent="guardar" class="flex flex-row bg-neutral-800 w-fit justify-center border-2 p-4 rounded-xl mb-8">
      <div class="grid grid-cols-4 gap-4 items-center">
        <label class="w-fit whitespace-nowrap">Nombre de usuario</label>
        <input v-model="form.nombreUsuario" class="border hover:border-blue-400 px-2 bg-black" type="text" placeholder="Nombre">
        <label>Correo electrónico</label> 
        <input v-model="form.correoElectronico" class="border hover:border-blue-400 px-2 bg-black" type="text" placeholder="Email">
        <label>Número de teléfono</label>
        <input v-model="form.numeroTelefono" class="border hover:border-blue-400 px-2 bg-black" type="text" placeholder="Teléfono">
        <label>Contraseña</label>
        <input v-model="form.contrasena" class="border hover:border-blue-400 px-2 bg-black" type="password" placeholder="Contraseña">
      </div>
      <div class="flex items-center">
        <button class="border-2 bg-blue-500 text-white rounded-2xl p-2 ml-3 hover:bg-blue-600 transition" type="submit">
          Guardar cambios
        </button>
      </div> 
    </form>

    <h2 class="font-bold text-lg mb-2">Juegos favoritos</h2>
    <div class="relative flex items-center gap-4 border-4 border-black p-4 rounded-xl mb-8">
      <button @click="anteriorJue" class="btnFlecha"><img src="../../images/flecha2.png" alt="prev"></button>
      <div class="carrusel">
        <div v-if="storeUsuarios.juegosCompletos.length === 0" class="w-full text-center py-4">
          No tienes juegos en favoritos
        </div>
        <div v-for="juego in visiblesJue" :key="juego.id" class="flex flex-col items-center min-w-[calc(16.66%-1rem)]">
          <img class="cardCarrusel" :src="juego.imagen" alt="foto">
          <span class="text-xs font-semibold mt-1 text-center truncate w-full">{{ juego.titulo }}</span>
        </div>
      </div>

      <button @click="siguienteJue" class="btnFlecha"><img src="../../images/flecha.png" alt="next"></button>
    </div>

    <h2 class="font-bold text-lg mb-2">Libros favoritos</h2>        
    <div class="flex items-center gap-4 border-4 border-black p-4 rounded-xl">
      <button @click="anteriorLib" class="btnFlecha"><img src="../../images/flecha2.png" alt="prev"></button>
      
      <div class="carrusel">
        <div v-if="storeUsuarios.librosCompletos.length === 0" class="w-full text-center py-4">
          No tienes libros en favoritos
        </div>
        <div v-for="libro in visiblesLib" :key="libro.id" class="flex flex-col items-center min-w-[calc(16.66%-1rem)]">
          <img class="cardCarrusel" :src="libro.imagen" alt="foto">
          <span class="text-xs font-semibold mt-1 text-center truncate w-full">{{ libro.titulo }}</span>
        </div>
      </div>

      <button @click="siguienteLib" class="btnFlecha"><img src="../../images/flecha.png" alt="next"></button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usuariosStore } from '@/stores/usuarios';

const storeUsuarios = usuariosStore();
const form = ref({ nombreUsuario: '', correoElectronico: '', numeroTelefono: '', contrasena: '' })

const inicioJue = ref(0);
const inicioLib = ref(0);
const itemsPorPagina = 6;

const visiblesJue = computed(() => {
  return storeUsuarios.juegosCompletos.slice(inicioJue.value, inicioJue.value + itemsPorPagina);
});

const visiblesLib = computed(() => {
  return storeUsuarios.librosCompletos.slice(inicioLib.value, inicioLib.value + itemsPorPagina);
});

const anteriorJue = () => {
  inicioJue.value = Math.max(inicioJue.value - itemsPorPagina, 0);
};

const siguienteJue = () => {
  const limite = storeUsuarios.juegosCompletos.length - itemsPorPagina;
  if (inicioJue.value < limite) {
    inicioJue.value += itemsPorPagina;
  }
};

const anteriorLib = () => {
  inicioLib.value = Math.max(inicioLib.value - itemsPorPagina, 0);
};

const siguienteLib = () => {
  const limite = storeUsuarios.librosCompletos.length - itemsPorPagina;
  if (inicioLib.value < limite) {
    inicioLib.value += itemsPorPagina;
  }
};

const guardar = () => {
  storeUsuarios.modificarUsuario(form.value)
  alert("Usuario Actualizado");
  form.value = { nombreUsuario: '', correoElectronico: '', numeroTelefono: '', contrasena: '' }
}
</script>

<style scoped>
img {
  animation: fadeIn 0.4s ease;
  
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>