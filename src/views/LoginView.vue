<template>
    <h1 class="text-2xl text-center font-bold">Inicio de sesion</h1>
    <div class="flex justify-center my-4">    
        <form class=" border-4 text-center w-fit p-7 rounded-xl " action="">
            <div class="grid grid-cols-2 gap-4">
            <label class="" for="">Correo Electronico</label>
            <input type="mail" class="border-2">
            <label for="">Contraseña</label>
            <input type="password" class="border-2">
            </div>
            <div class="flex justify-around m-5">
                <span class="mt-4"><a class="underline text-l font-bold " href="/register">Regitrate</a></span>
                <span><button class="border-3 rounded-4xl p-2" type="submit">Iniciar sesion</button></span>
            </div>
        </form>
    </div>

</template>