import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const librosStore = defineStore('libros', () => {
  const libros = ref([]);

  async function cargarLibros() {
    try {
      const response = await axios.get('/json/libros.json');
      libros.value = response.data;
    } catch (error) {
      console.error('Error cargando libros:', error);
    }
  }

  return { libros, cargarLibros };
});