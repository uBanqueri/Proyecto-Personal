<template>
    <h1 class="text-2xl font-bold text-center">Listado de Juegos</h1>
    <div class="flex justify-center gap-4 my-4">
        <span class="font-semibold">Buscar por:</span><input class="border pl-1 hover:border-blue-400 hover:placeholder-white" v-model="busqueda" type="text" placeholder="Titulo o desarrollador...">
        <select v-model="filtroCate" class="border hover:border-blue-400">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="grid grid-cols-4 mx-10 pb-4 gap-4">        
        <div v-for="juego in juegosFiltrados" :key="juego.id" 
            class="group relative flex flex-col h-100 overflow-hidden rounded-xl border border-gray-700 bg-cover bg-center" 
            :style="{ backgroundImage: `url(${juego.imagen})` }">
            
            <div class="p-4">                                            
                <div class="flex p-2 rounded-full bg-white/90 w-fit transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <button v-if="!esFavorito(juego.id)" @click="agregarJuego(juego.id)">
                        <img class="corazon" src="../../images/corazon1.png" alt="corazon" width="20px">
                    </button>
                    <button v-else @click="eliminarJuego(juego.id)">
                        <img class="corazon" src="../../images/corazon2.png" alt="corazon" width="20px">
                    </button>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full transition-all duration-500 easi-in-out z-10 flex flex-col"
                    :class="juegoDesplegado == juego.id ? 'h-[75%]' : 'h-[50px]'">
                <button @click.stop="toggleDatos(juego.id)" 
                        class="w-full bg-neutral-800 hover:bg-black text-white py-3 flex items-center justify-center gap-2 cursor-pointer select-none transition-colors border-t border-white">
                    <span class="text-sm font-bold uppercase">
                        {{ juegoDesplegado === juego.id ? 'Cerrar' : 'Detalles' }}
                    </span>                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        :class="{'rotate-180': juegoDesplegado === juego.id}" 
                        class="transition-transform duration-500 pointer-events-none">
                        <path d="m18 15-6-6-6 6"/>
                    </svg>
                </button>

                <div class="bg-black/95 text-white overflow-y-auto px-6 py-4">
                    
                    
                    <div class="p-6 flex flex-col justify-center h-75 rounded-t-2xl text-center">
                        <h3 class="font-bold text-2xl underline decoration-blue-500 underline-offset-8 mb-4">
                            {{juego.titulo}}
                        </h3>
                        
                        <div class="space-y-2 mb-4">
                            <p><span class="font-medium text-blue-400">Desarrollador:</span> {{ juego.creador }}</p>                
                            <p><span class="font-medium text-blue-400">Categoría:</span> {{ juego.categoria }}</p>
                            <p><span class="font-medium text-blue-400">Año:</span> {{juego.anio}}</p>
                        </div>
                        
                        <div class="border-t border-gray-600 pt-4">
                            <p class="text-sm text-gray-300">
                                {{ juego.descripcion }}
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
    import { juegosStore } from '@/stores/juegos';  
    import { usuariosStore } from '@/stores/usuarios';

    const storeJuegos = juegosStore();
    const storeUsuarios = usuariosStore();
    
    onMounted(() =>{
        storeJuegos.cargarJuegos();
    })

    const busqueda = ref('');
    const filtroTexto = computed(() => 
    storeJuegos.juegos.filter(juego =>
        juego.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
        juego.creador.toLowerCase().includes(busqueda.value.toLowerCase())
    )
    )

    const filtroCate = ref('');
    const categorias = computed(() => {
        return [...new Set(storeJuegos.juegos.map(juego => juego.categoria))];
    })

    const juegosFiltrados = computed(() => {
        return filtroTexto.value.filter(juego =>
            (juego.categoria == filtroCate.value || filtroCate.value == '')
        )
    })

    //funciones para favoritos
    function esFavorito(id){
        return storeUsuarios.juegosFav.includes(String(id));
    }
    
    function agregarJuego(id){
        storeUsuarios.agregarJuego(id);
        
    }

    function eliminarJuego(id){
        storeUsuarios.eliminarJuego(id);
        
    }

    //desplegable de la tarjeta
    const juegoDesplegado = ref(null);
    const toggleDatos = (id) => {
        juegoDesplegado.value = juegoDesplegado.value == id ? null : id;
    }

</script>