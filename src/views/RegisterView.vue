<template>
    <h1 class="text-2xl font-bold text-center">Registrate</h1>
    <div class="flex justify-center my-4">    
        <form class=" border-4 text-center w-fit p-7 rounded-xl" action="">
            <div class="grid grid-cols-2 gap-4">
                <label for="">Nombre de usuario</label>
                <input class="border-2" type="text">
                <label for="">Correo eectronico</label>
                <input class="border-2" type="text">
                <label for="">Numero de telefono</label>
                <input class="border-2" type="text">
                <label for="">Contraseña</label>
                <input class="border-2" type="password">
                <label for="">Selecciona una imagen <br> (opcional)</label>
                <input class="border-2" type="file">
            </div>
            <div class="pt-6">
                <button class="border-3 rounded-4xl p-2" type="submit">Resgistrarse</button>
            </div>
        </form>
    </div>
</template>