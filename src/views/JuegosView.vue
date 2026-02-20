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
        <div v-for="juego in juegosFiltrados" :key="juego.titulo" 
             class="flex flex-row group gap-4 p-4 px-3 h-100" 
             :style="{ backgroundImage: `url(${juego.imagen})` }">
            <div class="w-20">                                            
                <div class="flex p-2 rounded-full bg-white w-fit transition-opacity duration-300 opacity-0  group-hover:opacity-100">
                    <button v-if="!esFavorito(juego.id)" @click="agregarJuego(juego.id)"><img class="corazon" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
                    <button v-else @click="eliminarJuego(juego.id)"><img class="corazon" src="../../images/corazon2.png" alt="corazon"width="20px"></button>
                </div>
            </div>
            <!--
            <div class="text-center">
                <h3 class="font-bold">{{juego.titulo}}</h3>
                <p><span class="font-medium">Desarrollado por:</span> {{ juego.creador }}</p>                
                <span class="font-medium"> Categoria:</span> {{ juego.categoria }} <br>
                <span class="font-medium">Lanzamiento:</span>  {{juego.anio}}           
                <p>{{ juego.descripcion }}</p>
            </div>  
            -->    
            <div class="flex justify-center mt-auto">              
                <button @click="toggleDatos(juego.id)" 
                    class="bg-black items-end  text-white p-1 rounded-full hover:bg-black transition-transform"
                    :class="{ 'rotate-180': juegoDesplegado === juego.id }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
            </div>  

            <div class="overflow-hidden transition-all duration-500 ease-in-out bg-black/70 text-white rounded-lg"
                :class="juegoDesplegado === juego.id ? 'max-h-[500px] p-4 opacity-100' : 'max-h-0 opacity-0'">
                
                <div class="text-center">
                    <h3 class="font-bold text-xl underline decoration-blue-500 underline-offset-4 mb-2">
                        {{juego.titulo}}
                    </h3>
                    <p><span class="font-medium text-blue-300">Desarrollado por:</span> {{ juego.creador }}</p>                
                    <p><span class="font-medium text-blue-300">Categoría:</span> {{ juego.categoria }}</p>
                    <p><span class="font-medium text-blue-300">Lanzamiento:</span> {{juego.anio}}</p>           
                    <p class="mt-2 text-sm border-t border-gray-500 pt-2">{{ juego.descripcion }}</p>
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