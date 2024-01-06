<script setup>
    import { logout } from '../services/auth.js';
    import { useRouter } from 'vue-router';
    import { useAuth } from '../composition/useAuth.js';
    import { inject } from 'vue';
    import Imagen from './Imagen.vue';

    const {user} = useAuth(); 
    const {handleLogout} = useLogout();

    const { feedback, clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');
    
    function useLogout() {
        const router = useRouter();
        function handleLogout() {
            logout();

            router.push('/iniciar-sesion');
            setSuccessMessage({message: 'Cerraste sesión exitosamente. ¡Vuelve pronto!'});
        }

        return {
            handleLogout,
        }
    }
</script>

<template>
            <nav class="navbar navbar-expand-lg sticky-top" id="navbar">
            <div class="container">
                <div>
                    <router-link to="/" class="navbar-brand text-light fw-bold fs-3">
                        <img src="../assets/favicon/favicon.ico" alt="Icono de Cloudnet" class="img-fluid logo"/> 
                        Cloudnet
                    </router-link>
                </div>
        
                <!-- Botón de nav  -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menuLateral"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <section
                    class="offcanvas offcanvas-start"
                    id="menuLateral"
                    tabindex="-1"
                >
                    <div class="offcanvas-header" data-bs-theme="white">
                    <h1 class="offcanvas-title fw-bold fs-3 mt-2">
                        <img src="../assets/favicon/favicon.ico" alt="Logo de Cloudnet" class="img-fluid logo"> 
                        Cloudnet
                    </h1>
                    <button
                        class="btn-close mt-1 me-1"
                        type="button"
                        aria-label="Close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                    </div>

                    <div class="offcanvas-body d-flex flex-lg-row flex-column justify-content-lg-center">
                        <ul class="navbar-nav fs-5 justify-content-start">
                            <li class="nav-item p-1 py-md-1 borde-bottom">
                                <router-link to="/" class="nav-link">Inicio</router-link>
                            </li>
                            <li class="nav-item p-1 py-md-1">
                                <router-link to="/precios" class="nav-link">Precios</router-link>
                            </li>
                        </ul>

                        <ul class="navbar-nav mt-auto order-lg-last">
                            <template v-if="user.email !== null"> 
                                <div class="dropdown pb-4 py-md-2">
                                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle borde-top" id="dropdownUsuario" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Imagen :src="user.photoURL" width="30" height="30" class="border border-dark rounded-circle"></Imagen>
                                        <span v-if="user.admin" class="d-sm-inline mx-1 text-dark">{{ user.name }}  {{ user.surname }} (admin)</span>
                                        <span v-else class="d-sm-inline mx-1 text-dark">{{ user.name }} {{ user.surname }}</span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                                        <template v-if="user.admin">
                                            <li><router-link class="dropdown-item" to="/admin/panel/pricing">Ir al panel de administración</router-link></li>
                                        </template>
                                        <li><router-link class="dropdown-item" to="/perfil">Mi perfil</router-link></li>
                                        <form action="#" method="post" @submit.prevent="handleLogout">
                                            <li class="nav-item"><button class="dropdown-item" href="#">Cerrar sesión</button></li>
                                        </form>
                                    </ul>
                                </div>
                            </template>
                            <template v-else>
                                <li class="nav-item p-1 py-md-1 text-center">
                                    <router-link to="/iniciar-sesion" class="nav-link">Iniciar Sesión</router-link>
                                </li>
                                <li class="nav-item p-1 py-md-1 text-center">
                                    <router-link to="/registro" class="nav-link button-register"><i class="bi bi-plus-circle"></i> Crear Cuenta</router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </section>
            </div>
      </nav>
</template>