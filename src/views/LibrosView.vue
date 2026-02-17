<template>
    <h1 class="text-2xl font-bold text-center">Listado de Libros</h1>
    <div class="flex justify-center gap-4 my-4">
        <input v-model="busquedaTit" type="text" placeholder="Titulo del libro..." class="border-2">
        <input v-model="busquedaAut" type="text" placeholder="Autor..." class="border-2">
        <select v-model="filtroCate" name="" id="">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="grid grid-cols-3 mx-10 pb-4 gap-4">
        <div class="border-2 p-4 px-7 " v-for="libro in librosFiltrados">
            <div class="relative flex justify-center">
                <img class="items-center" :src="libro.imagen" alt="imagen" width="100px">
                <button><img class="absolute -top-2 -right-6 hover:cursor-pointer" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
            </div>
            <div class="text-center">
                <h3>{{libro.titulo}}</h3>
                <p>{{ libro.autor }}</p>
                <p class="flex justify-between">
                    <span>{{ libro.categoria }}</span>
                    <span>{{ libro.anio }}</span>
                </p>
                <p>{{ libro.descripcion }}</p>
            </div>            
        </div>  
    </section>
</template>

<script setup>
    import {ref, onMounted, computed} from 'vue'
    import { librosStore } from '@/stores/libros';  

    const storeLibros = librosStore();
    
    onMounted(() =>{
        storeLibros.cargarLibros();
    })

    const busquedaTit = ref('');
    const filtroTit = computed(() => 
        storeLibros.libros.filter(libro => libro.titulo.toLowerCase().includes(busquedaTit.value.toLowerCase()))
    );
    
    const busquedaAut = ref('');
    const filtroAut = computed(() =>{
        storeLibros.libros.filter(libro => libro.autor.toLowerCase().includes(busquedaAut.value.toLowerCase()
    ))
    })

    const filtroCate = ref('');
    const categorias = computed(() => {
        return [...new Set(storeLibros.libros.map(libro => libro.categoria))];
    })

    const librosFiltrados = computed(() => {
        return filtroTit.value.filter(libro =>
            (libro.categoria == filtroCate.value || filtroCate.value == '')
        )
    })
</script>