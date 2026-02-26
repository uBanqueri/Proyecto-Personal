<template>
    <h1 class="titulo">Listado de Juegos</h1>
    <div class="filtros">
        <span class="font-semibold">Buscar por:</span><input class="input" v-model="busqueda" type="text" placeholder="Titulo o desarrollador...">
        <select v-model="filtroCate" class="input">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="divCards">        
        <div v-for="juego in juegosFiltrados" :key="juego.id" 
            class="card group" 
            :style="{ backgroundImage: `url(${juego.imagen})` }">
            
            <div class="p-4">                                            
                <div class="divCorazon">
                    <button v-if="!esFavorito(juego.id)" @click="agregarJuego(juego.id)">
                        <img class="corazon" src="../../images/corazon1.png" alt="corazon" width="20px">
                    </button>
                    <button v-else @click="eliminarJuego(juego.id)">
                        <img class="corazon" src="../../images/corazon2.png" alt="corazon" width="20px">
                    </button>
                </div>
            </div>
            
            <div class="desplegableInfo easi-in-out"
                    :class="juegoDesplegado == juego.id ? 'h-[75%]' : 'h-12.5'">
                <button @click.stop="toggleDatos(juego.id)" 
                        class="despegableBtn">
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
                    
                    
                    <div class="p-6 flex flex-col h-91 rounded-t-2xl text-center">
                        <h3 class="font-bold text-2xl underline decoration-blue-500 underline-offset-8 mb-4">
                            {{juego.titulo}}
                        </h3>
                        
                        <div class="space-y-2 mb-4">
                            <p><span class="info">Desarrollador:</span> {{ juego.creador }}</p>                
                            <p><span class="info">Categoría:</span> {{ juego.categoria }}</p>
                            <p><span class="info">Año:</span> {{juego.anio}}</p>
                        </div>
                        
                        <div class="border-t border-gray-600 py-4">
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