<template>
    <h1 class="titulo">Listado de Libros</h1>
    <div class="filtros">
        <span class="font-semibold">Buscar por:</span><input class="input" v-model="busqueda" type="text" placeholder="Titulo o autor...">
        <select v-model="filtroCate" class="input">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="divCards">        
        <div v-for="libro in librosFiltrados" :key="libro.id" 
            class="card group" 
            :style="{ backgroundImage: `url(${libro.imagen})` }">
            
            <div class="p-4">                                            
                <div class="divCorazon">
                    <button v-if="!esFavorito(libro.id)" @click="agregarLibro(libro.id)">
                        <img class="corazon" src="../../images/corazon1.png" alt="corazon" width="20px">
                    </button>
                    <button v-else @click="eliminarLibro(libro.id)">
                        <img class="corazon" src="../../images/corazon2.png" alt="corazon" width="20px">
                    </button>
                </div>
            </div>
            
            <div class="desplegableInfo easi-in-out"
                    :class="libroDesplegado == libro.id ? 'h-[75%]' : 'h-12.5'">
                <button @click.stop="toggleDatos(libro.id)" 
                        class="despegableBtn">
                    <span class="text-lg font-bold uppercase">
                        {{ libroDesplegado === libro.id ? 'Cerrar' : 'Detalles' }}
                    </span>                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        :class="{'rotate-180': libroDesplegado === libro.id}" 
                        class="transition-transform duration-500 pointer-events-none">
                        <path d="m18 15-6-6-6 6"/>
                    </svg>
                </button>

                <div class="bg-black/95 text-white overflow-y-auto px-6 py-4">
                    
                    
                    <div class="p-6 flex flex-col h-128 rounded-t-2xl text-center">
                        <h3 class="font-bold text-2xl underline decoration-blue-500 underline-offset-8 mb-4">
                            {{libro.titulo}}
                        </h3>
                        
                        <div class="space-y-2 mb-4">
                            <p><span class="info">Autor:</span> {{ libro.autor }}</p>                
                            <p><span class="info">Categoría:</span> {{ libro.categoria }}</p>
                            <p><span class="info">Año:</span> {{libro.anio}}</p>
                        </div>
                        
                        <div class="border-t border-gray-600 py-4">
                            <p class="text-sm text-gray-300">
                                {{ libro.descripcion }}
                            </p>
                        </div>
                    </div> 
                </div>
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

    //funciones para favoritos
    function esFavorito(id){
        return storeUsuarios.librosFav.includes(String(id));
    }    
    function agregarLibro(id){
        storeUsuarios.agregarLibro(id);        
    }

    function eliminarLibro(id){
        storeUsuarios.eliminarLibro(id);        
    }
    //desplegable de la tarjeta
    const libroDesplegado = ref(null);
    const toggleDatos = (id) => {
        libroDesplegado.value = libroDesplegado.value == id ? null : id;
    }
</script>