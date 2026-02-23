import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const usuariosStore = defineStore('usuarios', () => {
  const usuario = ref(null);
  const error = ref(null);
  const exito = ref(null);
  const juegosFav = ref([]);
  const librosFav = ref([]);  

  const objetosJuegos = ref ([]);
  const objetosLibros = ref ([]);

  async function cargarObjetos(){
    const [resJuegos, resLibros] = await Promise.all([
      axios.get('/json/juegos.json'),
      axios.get('/json/libros.json')
    ]);
    objetosJuegos.value = resJuegos.data;
    objetosLibros.value = resLibros.data; 
  };
  cargarObjetos();

  const juegosCompletos = computed(() => {
    if (!objetosJuegos.value.length) return [];
    const idsFavoritos = juegosFav.value.map(id => String(id).trim());
    return objetosJuegos.value.filter(juego => idsFavoritos.includes(String(juego.id).trim())); 
  })
  const librosCompletos = computed(() => {
    if (!objetosLibros.value.length) return []; 
    const idsFavoritos = librosFav.value.map(id => String(id).trim());
    return objetosLibros.value.filter(libro => idsFavoritos.includes(String(libro.id).trim()));
  })

  function cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const datos = JSON.parse(usuarioGuardado);
      usuario.value = datos;
      juegosFav.value = datos.favoritos?.juegos || [];
      librosFav.value = datos.favoritos?.libros || [];
    }
  };
  cargarUsuario();

  const guardarStorage = () => {
    if ( usuario.value){
      usuario.value.favoritos = {
        juegos: juegosFav.value,
        libros: librosFav.value
      };
      localStorage.setItem('usuario', JSON.stringify(usuario.value));

      const lista = JSON.parse(localStorage.getItem('usuarios')) || [];
      const index = lista.findIndex(user => user.id == usuario.value.id);  
      if (index !== -1){
        lista[index] = {...usuario.value};
        localStorage.setItem('usuarios', JSON.stringify(lista))
      }
    }
  };

  async function login(email, password) {
    try {
      var usuarios = JSON.parse(localStorage.getItem('usuarios'));
      if (!usuarios){  
      const response = await axios.get('/json/usuarios.json');
      usuarios = response.data;
      }
      const user = usuarios.find(user => user.correoElectronico === email && user.contrasena === password);
      
      if (user) {
        usuario.value = user;
        juegosFav.value = user.favoritos?.juegos || [];
        librosFav.value = user.favoritos?.libros || [];

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
  juegosFav.value = [];
  librosFav.value = [];
  localStorage.removeItem('usuario');
};

  //Agregar Favoritos
  function agregarJuego(idJuego){
    const idStr = String(idJuego).trim();
    if(!juegosFav.value.includes(idStr)){
      juegosFav.value.push(idStr);
      guardarStorage();
    }
  }
  function agregarLibro(idLibro){
    const idStr = String(idLibro).trim();
    if(!librosFav.value.includes(idStr)){
      librosFav.value.push(idStr);
      guardarStorage();
    }
  }
  function eliminarJuego(idJuego){
    const idStr = String(idJuego).trim()
    juegosFav.value = juegosFav.value.filter(id => String(id).trim() !== idStr);
    guardarStorage();
  }
  function eliminarLibro(idLibro){
    const idStr = String(idLibro).trim();
    librosFav.value = librosFav.value.filter(id => String(id).trim() !== idStr);
    guardarStorage();
  }

  //Crea un usuario  
  async function registrarUsuario(datosFormulario){
    error.value = null;
    var listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (!listaUsuarios){
      const response = await axios.get('/json/usuarios.json');
      listaUsuarios = response.data;
    }
    if (listaUsuarios.find(user => user.correoElectronico == datosFormulario.correoElectronico)){
      error.value = "ya existe este correo electronico";
      return false;
    }
  
  const nuevoId = Math.max(...listaUsuarios.map(user => user.id)) +1;
  const usuarioFinal = {
      id: nuevoId,
      nombreUsuario: datosFormulario.nombreUsuario || datosFormulario.nombeUsuario, 
      correoElectronico: datosFormulario.correoElectronico,
      numeroTelefono: datosFormulario.numeroTelefono,
      contrasena: datosFormulario.contrasena,
      imagen: '/images/default.png',
      favoritos: { juegos: [], libros: [] }
    };

  listaUsuarios.push(usuarioFinal);
  localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
  exito.value = "Usuario registrado correctamente";
  return true;
  }
  
  //Modficar datos del usuario
    function modificarUsuario(datosUsuario){
      if(datosUsuario.nombreUsuario) usuario.value.nombreUsuario=datosUsuario.nombreUsuario;
      if(datosUsuario.correoElectronico) usuario.value.correoElectronico=datosUsuario.correoElectronico;
      if(datosUsuario.telefono) usuario.value.telefono=datosUsuario.telefono;
      if(datosUsuario.contrasena) usuario.value.contrasena=datosUsuario.contrasena;

      guardarStorage();
    }

  //cambiar tema
      const esOscuro = ref(false);

      function alternarTema() {
        esOscuro.value = !esOscuro.value;
        document.documentElement.classList.toggle('dark');
      }

  return { usuario, login, logout, juegosFav, librosFav,
           agregarJuego, agregarLibro, eliminarJuego, eliminarLibro,
           juegosCompletos, librosCompletos, registrarUsuario, error, exito,
            modificarUsuario,esOscuro, alternarTema };
});