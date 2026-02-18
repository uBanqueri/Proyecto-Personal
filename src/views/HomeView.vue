<template>
  <main class="mx-10">
    <h1 class="text-2xl text-center">MediaVault</h1>
    <section >    
        <h2 class="font-bold">Noticias mas relevantes</h2>
        <section class="grid grid-cols-3 gap-4">
          <div v-for="noticia in paginas" class="flex flex-col items-center border-solid border-2 border-black text-cente px-2">
            <div><img class="w-50 mt-2" :src="noticia.imagen" alt="foto"></div>
            <div>
              <h3>{{noticia.titulo}}</h3>
              <p>{{noticia.descripcion}}</p>
              <p class="flex justify-between">
                <span>{{noticia.autor}}</span> 
                <span>{{noticia.fecha}}</span>   
              </p>
            </div>
          </div>
        </section>  
        <div>
          <button v-for="p in totalPaginas" @click="irPagina(p)">
            {{ p }}
          </button>
        </div>          
    </section>

    <section>
      <h4 class="font-bold mb-2">Top Videojuegos</h4>      
      <div class="flex items-center gap-4 border-4 border-black p-4 rounded-xl">
        <button @click="anteriorJue" class="text-2xl p-2">◀</button>
        <div class="grid grid-cols-6 gap-4 flex-1">
          <div v-for="juego in visiblesJue" :key="juego.id">
            <img :src="juego.imagen" class="w-full aspect-3/4 object-cover rounded-xl" alt="foto">
          </div>
        </div>
        <button @click="siguienteJue" class="text-2xl p-2">▶</button>
      </div>

      <h4 class="font-bold">Top Libros</h4>
      <div class="flex items-center gap-4 border-4 border-black p-4 rounded-xl">
        <button @click="anteriorLib" class="text-2xl p-2">◀</button>
        <div class="grid grid-cols-6 gap-4 flex-1">
          <div v-for="libro in visiblesLib" :key="libro.id">
            <img :src="libro.imagen" class="w-full aspect-3/4 object-cover rounded-xl" alt="foto">
          </div>
        </div>
        <button @click="siguienteLib" class="text-2xl p-2">▶</button>
      </div>
    </section>
  </main>
</template>

<script setup>
  import {ref, onMounted, computed} from 'vue'
    import { noticiasStore } from '@/stores/noticias';  
    import { juegosStore} from '@/stores/juegos';
    import { librosStore} from '@/stores/libros';

    const storeNoticias = noticiasStore();
    const storeJuegos = juegosStore();
    const storeLibros = librosStore();

    onMounted(() =>{
        storeNoticias.cargarNoticias();
        storeJuegos.cargarJuegos();
        storeLibros.cargarLibros();
    })
    // "Carrusel" para juegos y libros
    const inicioJue = ref(0);
    const visiblesJue = computed(()=> {
      return storeJuegos.juegos.slice(inicioJue.value, inicioJue.value + 6);
    })
    const anteriorJue = () => {
      inicioJue.value = Math.max(inicioJue.value - 6, 0);
    };
    const siguienteJue = () => {
      const limiteJue = storeJuegos.juegos.length - 6;
      inicioJue.value = Math.min(inicioJue.value + 6, limiteJue);
    };

    const inicioLib = ref(0);
    const visiblesLib = computed(() => {
      return storeLibros.libros.slice(inicioLib.value, inicioLib.value + 6);
    })
    const anteriorLib = () => {
      inicioLib.value = Math.max(inicioLib.value - 6, 0);
    };
    const siguienteLib = () => {
      const limiteLib = storeLibros.libros.length - 6;
      inicioLib.value = Math.min(inicioLib.value + 6, limiteLib);
    };

    //Paginacion de noticias
    const noticiasPP = ref(6)
    const pagina = ref (1)

    const totalPaginas = computed(() => {
      return Math.max(1, Math.ceil(storeNoticias.noticias.length / noticiasPP.value))
    })
    const indice = computed(() => (pagina.value -1) * noticiasPP.value)
    const paginas = computed(() => {
      return storeNoticias.noticias.slice(indice.value, indice.value + noticiasPP.value)
    })
    const anteriorPagina = () => {
      if(pagina.value > 1) pagina.value--;
    }
    const siguientePagina = () => {
      if(pagina.value < totalPaginas.value) pagina.value++;
    }
    const irPagina = (p) => {
      pagina.value = Math.min(Math.max(1, p), totalPaginas.value)
    }

</script>