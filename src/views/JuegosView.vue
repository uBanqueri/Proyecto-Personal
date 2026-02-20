<template>
    <h1 class="text-2xl font-bold text-center">Listado de Juegos</h1>
    <div class="flex justify-center gap-4 my-4">
        <span class="font-semibold">Buscar por:</span><input v-model="busqueda" type="text" placeholder="Titulo o desarrollador..." class="border-2 pl-1 secondary-light">
        <select v-model="filtroCate" class="border-2 secondary-light hover:cursor-pointer">
            <option value="">Todos</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
            </option>
        </select>
    </div>
    <section class="grid grid-cols-4 mx-10 pb-4 gap-4">
        
        <div class=" border-2 gap-4 p-4 px-3" v-for="juego in juegosFiltrados" :key="juego.titulo    ">
            <div class="grid grid-cols-[3fr_7fr_3fr]">
                <div class=""></div>
                <div>
                    <img class=" h-30" :src="juego.imagen" alt="imagen">
                    <!--:src="`/images/${juego.imagen}`"--> 
                </div>                
                <div class="ml-5">
                    <button v-if="!esFavorito(juego.id)" @click="agregarJuego(juego.id)"><img class="corazon animar-latido" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
                    <button v-else @click="eliminarJuego(juego.id)"><img class="corazon animar-latido" src="../../images/corazon2.png" alt="corazon"width="20px"></button>
                </div>                 
            </div>
            <div class="text-center">
                <h3 class="font-bold">{{juego.titulo}}</h3>
                <p><span class="font-medium">Desarrollado por:</span> {{ juego.creador }}</p>                
                <span class="font-medium"> Categoria:</span> {{ juego.categoria }} <br>
                <span class="font-medium">Lanzamiento:</span>  {{juego.anio}}           
                <p>{{ juego.descripcion }}</p>
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

</script>