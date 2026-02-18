<template>
    <h1 class="text-2xl font-bold text-center">Listado de Libros</h1>
    <div class="flex justify-center gap-4 my-4">
        <span>Buscar por:</span><input v-model="busqueda" type="text" placeholder="Titulo o autor..." class="border-2">
        <select v-model="filtroCate" class="border-2 hover:cursor-pointer">
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
                <button v-if="!esFavorito(libro.id)" @click="agregarLibro(libro)"><img class="absolute -top-2 -right-6 hover:cursor-pointer" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
                <button v-else @click="eliminarLibro(libro.id)"><img class="absolute -top-2 -right-6 hover:cursor-pointer" src="../../images/corazon2.png" alt="corazon"width="20px"></button>

            </div>
            <div class="text-center">
                <h3>{{libro.titulo}}</h3>
                <p><span class="font-medium">Escrito por:</span>{{ libro.autor }}</p>
                <span class="font-medium">Categoria:</span>{{ libro.categoria }} <br>
                <span class="font-medium">Lanzamiento:</span> {{ libro.anio }}               
                <p>{{ libro.descripcion }}</p>
            </div>            
        </div>  
    </section>
</template>

<script setup>
    import {ref, onMounted, computed} from 'vue'
    import { librosStore } from '@/stores/libros';  
    import {usuariosStore} from '@/stores/usuarios';

    const storeLibros = librosStore();
    const storeUsuarios = usuariosStore();

    onMounted(() =>{
        storeLibros.cargarLibros();
    })

    const busqueda = ref('');
    const filtroTexto = computed(() => 
    storeLibros.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.value.toLowerCase())
    )
    )

    const filtroCate = ref('');
    const categorias = computed(() => {
        return [...new Set(storeLibros.libros.map(libro => libro.categoria))];
    })

    const librosFiltrados = computed(() => {
        return filtroTexto.value.filter(libro =>
            (libro.categoria == filtroCate.value || filtroCate.value == '')
        )
    })

    //Funciones para favoritos
    function esFavorito(id){
        return storeUsuarios.librosFav.some(librosFav => librosFav.id == id);
    }
    function agregarLibro(libroFav){
        storeUsuarios.agregarLibro(libroFav);        
    }
    function eliminarLibro(id){
        storeUsuarios.eliminarLibro(id);
    }
</script>