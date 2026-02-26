<template>
    <main class="mt-20">    
        <h1 class="text-6xl font-bold text-center">Registrate</h1>
        <div class="flex justify-center my-10 text-3xl">    
            <form @submit.prevent="handleRegistro" class="bg-neutral-800 border-4 text-center w-fit p-7 rounded-xl" >
                <div class="grid grid-cols-2 gap-4">
                    <label for="">Nombre de usuario</label>
                    <input v-model="form.nombeUsuario" class="input" type="text" placeholder="Escibir nombre">
                    <label for="">Correo electronico</label>
                    <input v-model="form.correoElectronico" class="input" type="text" placeholder="Escribir email">
                    <label for="">Numero de telefono</label>
                    <input v-model="form.numeroTelefono" class="input" type="text" placeholder="Escribir telefono">
                    <label for="">Contraseña</label>
                    <input v-model="form.contrasena" class="input" type="password" placeholder="Escribir contraseña">                
                </div>
                <div class="pt-6">
                    <button class="border-3 rounded-4xl p-2 hover:bg-neutral-700" type="submit">Resgistrarse</button>
                </div>
                <p v-if="storeUsuarios.error" class="text-red-500 m-2">{{ storeUsuarios.error }}</p>            
            </form>
        </div>
    </main>
</template>
<script setup>
import { usuariosStore } from '@/stores/usuarios';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const storeUsuarios = usuariosStore();
const router = useRouter();

const form = ref({
    nombeUsuario: '',
    correoElectronico: '',
    numeroTelefono: '',
    contrasena: ''
});

const handleRegistro = async () => {
    const exito = await storeUsuarios.registrarUsuario({...form.value})
    if (exito){        
        router.push('/login');
        
    }
}
</script>