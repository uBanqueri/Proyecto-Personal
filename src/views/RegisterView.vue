<template>
    <h1 class="text-2xl font-bold text-center">Registrate</h1>
    <div class="flex justify-center my-4">    
        <form @submit.prevent="handleRegistro" class=" border-4 text-center w-fit p-7 rounded-xl" >
            <div class="grid grid-cols-2 gap-4">
                <label for="">Nombre de usuario</label>
                <input v-model="form.nombeUsuario" class="border-2" type="text">
                <label for="">Correo electronico</label>
                <input v-model="form.correoElectronico" class="border-2" type="text">
                <label for="">Numero de telefono</label>
                <input v-model="form.numeroTelefono" class="border-2" type="text">
                <label for="">Contraseña</label>
                <input v-model="form.contrasena" class="border-2" type="password">                
            </div>
            <div class="pt-6">
                <button class="border-3 rounded-4xl p-2" type="submit">Resgistrarse</button>
            </div>
            <p v-if="storeUsuarios.error" class="text-red-500 m-2">{{ storeUsuarios.error }}</p>            
        </form>
    </div>
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