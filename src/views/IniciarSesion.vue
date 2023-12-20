<script setup>
import { login } from "../services/auth.js";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const { fields, feedback, errors, handleSubmit, passwordVisible, togglePasswordVisibility, handlePasswordInput, } = useLoginForm();

const { clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');



/**
 * Manejo del form de login.
 *
 * @return {{feedback: Ref<UnwrapRef<{type: string, message: string}>>, handleSubmit: handleSubmit, fields: Ref<UnwrapRef<{password: string, email: string}>>}}
 */
function useLoginForm() {
    const router = useRouter();

    const fields = ref({
        email: '',
        password: '',
    });

    const feedback = ref({
        type: null,
        message: '',
    });

    const errors = ref([]);

    const passwordVisible = ref(false);

    function handlePasswordInput(event) {
        fields.password = event.target.value;
    }

    function togglePasswordVisibility() {
        passwordVisible.value = !passwordVisible.value;

        const passwordInput = document.getElementById("password");
        if (passwordVisible.value) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function handleSubmit() {
        feedback.value.message = '';
        errors.value = [];

        if (!fields.value.email) {
            errors.value.email = 'Por favor, ingresa tu correo electrónico';
        } else if (!isValidEmail(fields.value.email)) {
            errors.value.email = 'Por favor, ingresa un correo electrónico válido';
        }

        if (!fields.value.password) {
            errors.value.password = 'Por favor, ingresa tu contraseña';
        } else if (fields.value.password.length < 6) {
            errors.value.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (Object.keys(errors.value).length > 0) {
            return;
        }

        login({ ...fields.value })
            .then(user => {
                console.log("Usuario autenticado!");
                router.push('/');
                setSuccessMessage({ message: '¡Bienvenido nuevamente' + ' ' + user.email + '!' });
            })
            .catch(err => {
                setErrorMessage({message: 'Ocurrió un error inesperado al intentar iniciar sesión. Por favor intentalo denuevo más tarde.'});
                console.error(err);
            });
    }

    return {
        fields,
        feedback,
        errors,
        handleSubmit,
        passwordVisible,
        togglePasswordVisibility,
        handlePasswordInput,
    }
}
</script>

<template>
    <section class="container my-5 py-5">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-sm-12 p-5 border border-dark rounded-4 shadow-lg mb-5 bg-body-tertiary rounded">
                <router-link to="/"><i class="bi bi-arrow-left-circle fs-1"></i></router-link>
                <h2 class="border-bottom pb-3 text-center">Bienvenido Nuevamente</h2>
                <form action="#" method="post" @submit.prevent="handleSubmit" class="mt-4">
                    <div class="mb-4">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" name="email" v-model="fields.email" />

                        <div class="mt-2 text-danger">
                            {{ errors.email }}
                        </div>
                    </div>

                    <label for="password" class="form-label">Contraseña</label>
                    <div class="container-password">
                        <input 
                            type="password"
                            class="form-control password-input" 
                            id="password"
                            name="password"
                            v-model="fields.password"
                            @input="handlePasswordInput"
                        />
                        <i :class="passwordVisible ? 'bi-eye-slash-fill' : 'bi-eye-fill'" @click="togglePasswordVisibility"></i>
                    </div>

                    <div class="mt-2 text-danger">
                        <i class="bi-exlcamation-circle-fill"></i> {{ errors.password }}
                    </div>

                    <div class="d-grid mt-4">
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </div>
                </form>
                <p class="mt-4 text-center text-registro">¿Todavía no tenes una cuenta? <router-link to="/registro" class="link-registro">Crea una aqui</router-link></p>
            </div>
        </div>
    </section>
</template>
