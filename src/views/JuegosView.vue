<template>
    <h1 class="text-2xl font-bold text-center">Listado de Juegos</h1>
    <div class="flex justify-center gap-4 my-4">
        <input v-model="busquedaTit" type="text" placeholder="Titulo del juego..." class="border-2">
        <input v-model="busquedaCre" type="text" placeholder="Creador..." class="border-2">
        <select v-model="filtroCate" name="" id="">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="grid grid-cols-3 mx-10 pb-4 gap-4">
        <div class=" border-2 gap-4 p-4 px-7" v-for="juego in juegosFiltrados" :key="juego.titulo    ">
            <div class="relative flex justify-center">
                <img class="items-center h-30" :src="juego.imagen" alt="imagen">
                <!--:src="`/images/${juego.imagen}`"-->
                <button><img class="absolute -top-2 -right-6 hover:cursor-pointer" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
            </div>
            <div class="text-center">
                <h3 class="font-bold">{{juego.titulo}}</h3>
                <p>{{ juego.creador }}</p>
                <p class="flex justify-between">
                    <span>{{ juego.categoria }}</span>
                    <span>{{juego.anio}}</span>
                </p>
                <p>{{ juego.descripcion }}</p>
            </div>            
        </div>
    </section>
</template>
<script setup>
    import {ref, onMounted, computed} from 'vue'
    import { juegosStore } from '@/stores/juegos';  

    const storeJuegos = juegosStore();
    
    onMounted(() =>{
        storeJuegos.cargarJuegos();
    })

    const busquedaTit = ref('');
    const filtroTit = computed(() => 
        storeJuegos.juegos.filter(juego => juego.titulo.toLowerCase().includes(busquedaTit.value.toLowerCase()))
    );
    
    const busquedaCre = ref('');
    const filtroCre = computed(() =>{
        storeJuegos.juego.filter(juego => juego.creador.toLowerCase().includes(busquedaCre.value.toLowerCase()
    ))
    })

    const filtroCate = ref('');
    const categorias = computed(() => {
        return [...new Set(storeJuegos.juegos.map(juego => juego.categoria))];
    })

    const juegosFiltrados = computed(() => {
        return filtroTit.value.filter(juego =>
            (juego.categoria == filtroCate.value || filtroCate.value == '')
        )
    })
</script>