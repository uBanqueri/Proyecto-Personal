<template>
    <main class="mx-10">    
        <h1 class="text-2xl font-bold text-center">Perfil del usuario</h1>
        <h2 class="text-xl mx-2">Datos de la cuenta</h2>
        <form class="flex flex-row justify-center border-2 mx-4 p-2 w-200" action="">
            <div class="grid grid-cols-4 gap-4 w-fit">
                <label for="">Nombre de usuario</label>
                <input class="border-2" type="text" placeholder="Escribir nombre">
                <label for="">Correo electronico</label>
                <input class="border-2" type="text" placeholder="Escribir email">
                <label for="">Numero de telefono</label>
                <input class="border-2" type="text" placeholder="Escribir telefono">
                <label for="">Contraseña</label>
                <input class="border-2" type="password" placeholder="Escribir contraseña">
            </div>
            <div class="flex items-center">
                <button class="border-2 rounded-2xl p-2 ml-3" type="submit">Guardar cambios </button>
            </div> 
        </form>
        <h2>Juegos favoritos</h2>
        <div class="flex gap-4 border-4 border-solid border-black p-2 px-10 rounded-xl">
            <div v-if="storeUsuarios.juegosCompletos.length === 0">
                No tienes juegos en favoritos
            </div>
            <div v-for="juego in storeUsuarios.juegosCompletos" :key="juego.id">
                <img class="w-20 rounded-xl" :src="juego.imagen" alt="foto">
                <span>{{ juego.titulo }}</span>
            </div>
        </div>
        
        <h2>Libros favoritos</h2>        
        <div class="flex border-4 border-solid border-black p-2 px-10 rounded-xl">
            <div v-if="storeUsuarios.librosCompletos.length === 0">
                No tienes libros en favoritos
            </div>
            <div v-for="libro in storeUsuarios.librosCompletos" :key="libro.id">
                <img class="w-20 rounded-xl" :src="libro.imagen" alt="foto">
                <span>{{ libro.titulo }}</span>
            </div>
        </div>
    </main>
</template>
<script setup>
    import {usuariosStore} from '@/stores/usuarios';
    const storeUsuarios = usuariosStore();

</script>