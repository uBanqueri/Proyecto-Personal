import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usuariosStore = defineStore('usuarios', () => {
  const usuario = ref(null);

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
  return { usuario, login, logout, cargarUsuario };
});