import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usuariosStore = defineStore('usuarios', () => {
  const usuario = ref(null);
  const juegosFav = ref([]);
  const librosFav = ref([]);

  async function login(email, password) {
    try {
      const response = await axios.get('/json/usuarios.json');
      const usuarios = response.data;

      const user = usuarios.find(user => user.correoElectronico === email && user.contrasena === password);
      
      if (user) {
        usuario.value = user;
        localStorage.setItem('usuario', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  function logout() {
    usuario.value = null;
    localStorage.removeItem('usuario');
  }

  function cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      usuario.value = JSON.parse(usuarioGuardado);
    }
  }

  //Agregar Favoritos
  function agregarJuego(juegoFav){
    juegosFav.value.push(juegoFav);
  }
  function agregarLibro(libroFav){
    librosFav.value.push(libroFav);
  }
  function eliminarJuego(id){
    juegosFav.value = juegosFav.value.filter(juegoFav => juegoFav.id !== id);
  }
  function eliminarLibro(id){
    librosFav.value = librosFav.value.filter(libroFav => libroFav.id !== id);
  }

  //Crea un usuario
  
  
  

  return { usuario, login, logout, cargarUsuario, juegosFav, librosFav, agregarJuego, agregarLibro, eliminarJuego, eliminarLibro };
});