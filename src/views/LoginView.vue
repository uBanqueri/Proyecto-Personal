<template>
    <h1 class="text-2xl text-center font-bold">Inicio de sesion</h1>
    <div class="flex justify-center my-4">    
        <form @submit.prevent="login" class=" border-4 text-center w-fit p-7 rounded-xl " action="">
            <div class="grid grid-cols-2 gap-4">
            <label class="" for="">Correo Electronico</label>
            <input v-model="mail" type="mail" class="border-2">
            <label for="">Contraseña</label>
            <input v-model="pass" type="password" class="border-2">
            </div>
            <p v-if="storeUsuarios.exito" class="text-green-500 m-2">{{ storeUsuarios.exito }}</p>
            <p class="text-red-500 m-2">{{ error }}</p>
            <div class="flex justify-around m-5">
                <span class="mt-4"><a class="underline text-l font-bold " href="/register">Regitrate</a></span>
                <span><button class="border-3 rounded-4xl p-2" type="submit">Iniciar sesion</button></span>
            </div>
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { usuariosStore } from '@/stores/usuarios';

const storeUsuarios = usuariosStore();
const router = useRouter();

const mail = ref('');
const pass = ref('');
const error = ref('');

async function login(){
    error.value = '';
    const resultado = await storeUsuarios.login(mail.value, pass.value)
        if(resultado){
            router.push('/')
        }else{
            error.value = "Credenciales invalidas"
        }
}
</script>