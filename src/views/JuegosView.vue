<template>
    <h1 class="text-2xl font-bold text-center">Listado de Juegos</h1>
    <div class="flex justify-center gap-4 my-4">
        <input type="text" placeholder="Titulo del juego..." class="border-2">
        <input type="text" placeholder="Creador..." class="border-2">
        <select name="" id="">
            <option value="">Todos</option>
            <option value="">ETC</option>
        </select>
    </div>
    <section class="grid grid-cols-3 mx-10 pb-4">
        <div class="border-2 w-fit p-4 px-7">
            <div class="relative flex justify-center">
                <img class="items-center" src="../../images/default.png" alt="imagen" width="100px">
                <button><img class="absolute -top-2 -right-6 hover:cursor-pointer" src="../../images/corazon1.png" alt="corazon"width="20px"></button>
            </div>
            <div class="text-center">
                <h3>Titulo</h3>
                <p class="flex justify-between">
                    <span>Categoria</span>
                    <span>Año</span>
                </p>
                <p>descripcion</p>
            </div>            
        </div>
    </section>
</template>