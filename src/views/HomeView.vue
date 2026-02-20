<template class="">
  <main class="mx-10">
    <p class="flex h-20 justify-center mt-2">
      <img src="../../public/images/MediaVaultOscuro.png"  alt="">
      
      <!--
      <img v-if="userStore.esOscuro" src="../../public/images/MediaVaultOscuro.png"  alt="">
      <img v-else src="../../public/images/MediaVaultClaro.png" alt="">
      -->
    </p>
    <section >    
        <h2 class="font-bold">Noticias mas relevantes</h2>
        <section class="grid grid-cols-3 gap-4">
          <div v-for="noticia in paginas" class="flex flex-col bg-neutral-800 items-center border-2 border-black text-center px-2 rounded-xl">
            <div><img class="h-40 mt-2" :src="noticia.imagen" alt="foto"></div>
            <div>
              <h3 class="underline font-semibold">{{noticia.titulo}}</h3>
              <p>{{noticia.descripcion}}</p>
              <p class="flex justify-between text-sm text-gray-500">
                <span>{{noticia.autor}}</span> 
                <span>{{noticia.fecha}}</span>   
              </p>
            </div>
          </div>
        </section>  
        <div class="flex justify-center text-2xl gap-2">
          <button class="paginado" v-for="p in totalPaginas" @click="irPagina(p);"          >
            {{ p }}
          </button>
        </div>          
    </section>

    <section>
      <h4 class="font-bold mb-2">Top Videojuegos</h4>      
      <div class="flex items-center gap-4 bg-neutral-800 mb-4 p-4 rounded-xl m-">
        <button @click="anteriorJue" class="btnFlecha"><img src="../../images/flecha2.png" alt=""></button>
        <div class="carrusel">
          <div v-for="juego in visiblesJue" :key="juego.id">
            <img :src="juego.imagen" class="cardCarrusel" alt="foto">
            <span class="text-xs font-semibold mt-1 text-center truncate w-full">{{ juego.titulo }}</span>
          </div>
        </div>
        <button @click="siguienteJue" class="btnFlecha"><img src="../../images/flecha.png" alt=""></button>
      </div>

      <h4 class="font-bold">Top Libros</h4>
      <div class="flex items-center gap-4 bg-neutral-800 mb-4 p-4 rounded-xl">
        <button @click="anteriorLib" class="btnFlecha"><img src="../../images/flecha2.png" alt=""></button>
        <div class="carrusel">
          <div v-for="libro in visiblesLib" :key="libro.id" class="flex flex-col items-center min-w-[calc(16.66%-1rem)]">
            <img :src="libro.imagen" class="cardCarrusel" alt="foto">
            <span class="text-xs font-semibold mt-1 text-center truncate w-full">{{ libro.titulo }}</span>
          </div>
        </div>
        <button @click="siguienteLib" class="btnFlecha"><img src="../../images/flecha.png" alt=""></button>
      </div>
    </section>
  </main>
</template>

<script setup>
  import {ref, onMounted, computed} from 'vue'
    import { noticiasStore } from '@/stores/noticias';  
    import { juegosStore} from '@/stores/juegos';
    import { librosStore} from '@/stores/libros';
    import { usuariosStore} from '@/stores/usuarios';

    const storeNoticias = noticiasStore();
    const storeJuegos = juegosStore();
    const storeLibros = librosStore();
    const userStore = usuariosStore();

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
      pagina.value = Math.min(Math.max(1, p), totalPaginas.value);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

</script>

<style scoped>
img {
  animation: fadeIn 0.4s ease;
  
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>