<template>
  <header class="flex flex-row justify-between p-4">
    <img src="../public/images/LogoClaro.png" alt="" width="40px">
    <nav class="flex  gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/juegos">Juegos</RouterLink>
      <RouterLink to="/libros">Libros</RouterLink>
      <RouterLink to="/login">Iniciar Sesion</RouterLink>

      <RouterLink to="/perfil">UnaiB</RouterLink>
      <div>
        <img class="rounded-full" src="../../images/default.png" alt="fPerfil" width="40px">
      </div>

    </nav>
  </header>
  <body class="bg-blue-200 pb-10">
    <RouterView/> 
  </body>  
</template>


