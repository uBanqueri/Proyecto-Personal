import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const noticiasStore = defineStore('noticias', () => {
  const noticias = ref([]);

  async function cargarNoticias() {
    try {
      const response = await axios.get('/json/noticias.json');
      noticias.value = response.data;
    } catch (error) {
      console.error('Error cargando noticias:', error);
    }
  }

  return { noticias, cargarNoticias };
});