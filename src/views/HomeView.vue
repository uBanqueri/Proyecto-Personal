<template>
  <main class="mx-10">
    <h1 class="text-2xl text-center">MediaVault</h1>
    <section >    
        <h2 class="font-bold">Noticias mas relevantes</h2>
        <section class="grid grid-cols-3">
          <div v-for="noticia in storeNoticias" class="flex flex-col items-center border-solid border-4 border-black text-center">
            <div><img class="w-20" :src="noticia.imagen" alt="foto"></div>
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
    </section>
    <section>
      <h4 class="font-bold">Top Videojuegos</h4>
      <div class="border-4 border-solid border-black p-2 px-10 rounded-xl">
        <img class="w-20 rounded-xl" src="../../images/default.png" alt="foto">
      </div>
      <h4 class="font-bold">Top Libros</h4>
      <div class="border-4 border-solid border-black p-2 px-10 rounded-xl">
        <img class="w-20 rounded-xl" src="../../images/default.png" alt="foto">
      </div>
    </section>
  </main>
</template>

<script setup>
  import {ref, onMounted, computed} from 'vue'
    import { noticiasStore } from '@/stores/noticias';  

    const storeNoticias = noticiasStore();
    
    onMounted(() =>{
        storeNoticias.cargarNoticias();
    })
</script>