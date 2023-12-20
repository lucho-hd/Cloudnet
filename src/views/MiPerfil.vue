<script setup>
    import { useAuth } from '../composition/useAuth.js';
    import NavBar from '../components/NavBar.vue';
    import Footer from '../components/Footer.vue';
    import Imagen from '../components/Imagen.vue';

    const {user} = useAuth();
</script>

<template>
    <NavBar/>
    <section class="container d-flex justify-content-center">
        <div class="d-flex bg-white shadow mt-5 user-data rounded-1 border-0 p-4">
            <Imagen :src="user.photoURL" width="60" height="60" class="rounded-circle border border-dark"></Imagen>
            <p class="mt-2 ps-3 fs-3 fw-semibold">{{ user.name }} {{ user.surname }}</p>
        </div>
    </section>

    <div class="container d-flex justify-content-center mt-5">
      <ul class="bg-white shadow my-5 user-data rounded-1 border-0 p-4">
        <li class="mb-5 d-flex align-items-center justify-content-between">
            <router-link to="/perfil/mis-datos" class="nav-link">
                <div class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"/></g>
                    </svg>
                    <p class="fs-5 mt-3 ps-2">Mis datos</p>
                </div>
            </router-link>
          <i class="bi bi-arrow-right-short fs-3"></i>
        </li>
        <li class="mb-3 d-flex align-items-center justify-content-between">
            <router-link to="/perfil/mensajes" class="nav-link">
                <div class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 26 26"><path fill="currentColor" d="M3 4C1.344 4 0 5.344 0 7v12c0 1.656 1.344 3 3 3h20c1.656 0 3-1.344 3-3V7c0-1.656-1.344-3-3-3H3zm0 2h20c.551 0 1 .449 1 1v.5l-11 5.938L2 7.5V7c0-.551.449-1 1-1zM2 7.781l6.531 5.094l-6.406 6.563l7.813-5.563L13 15.844l3.063-1.969l7.812 5.563l-6.406-6.563L24 7.781V19a.95.95 0 0 1-.125.438c-.165.325-.486.562-.875.562H3c-.389 0-.71-.237-.875-.563A.95.95 0 0 1 2 19V7.781z"/></svg>
                    <p class="fs-5 mt-3 ps-2">Mensajes</p>
                </div>
            </router-link>
            <i class="bi bi-arrow-right-short fs-3"></i>
        </li>
      </ul>
    </div>
    <Footer/>
</template>


