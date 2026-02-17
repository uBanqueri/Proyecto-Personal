import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const juegosStore = defineStore('juegos', () => {
  const juegos = ref([]);

  async function cargarJuegos() {
    try {
      const response = await axios.get('/json/juegos.json');
      juegos.value = response.data;
    } catch (error) {
      console.error('Error cargando juegos:', error);
    }
  }

  return { juegos, cargarJuegos };
});