<template>
    <main class="mx-10">    
        <h1 class="text-2xl font-bold text-center">Perfil del usuario</h1>
        <h2 class="text-xl mx-2">Datos de la cuenta</h2>
        <form class="flex flex-row justify-center border-2 mx-4 p-2 w-200" action="">
            <div class="grid grid-cols-4 gap-4 w-fit">
                <label for="">Nombre de usuario</label>
                <input class="border-2" type="text">
                <label for="">Correo electronico</label>
                <input class="border-2" type="text">
                <label for="">Numero de telefono</label>
                <input class="border-2" type="text">
                <label for="">Contraseña</label>
                <input class="border-2" type="password">
            </div>
            <div class="flex items-center">
                <button class="border-2 rounded-2xl p-2 ml-3" type="submit">Guardar cambios</button>
            </div> 
        </form>
        <h2>Juegos favoritos</h2>
        <div class="border-4 border-solid border-black p-2 px-10 rounded-xl">
            <img class="w-20 rounded-xl" src="../../images/default.png" alt="foto">
        </div>
        <h2>Libros favoritos</h2>
        <div class="border-4 border-solid border-black p-2 px-10 rounded-xl">
            <img class="w-20 rounded-xl" src="../../images/default.png" alt="foto">
        </div>
    </main>
</template>