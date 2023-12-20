<script setup>
    import {register} from "../services/auth.js"
    import {ref, inject} from "vue";
    import {useRouter} from "vue-router";

    const {fields, feedback, errors, handleRegister, handlePasswordInput, togglePasswordVisibility, isValidEmail} = useRegister();

    const { clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');

    function useRegister() {
        const router = useRouter();

        const fields = ref({
            name: '',
            surname: '',
            email: '',
            password: '',
        });

        const feedback = ref({
            type: 'success',
            message: '',
        });

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

        const errors = ref([]);

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }


        function handleRegister() {
            feedback.value.message = ''
            errors.value = [];

            if (!fields.value.name) {
                errors.value.name = 'Por favor, ingresa tu nombre';
            }

            if (!fields.value.surname) {
                errors.value.surname = 'Por favor, ingresa tu apellido';
            }

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

            register({
                ...fields.value
            })
                .then(user => {
                    router.push("/");
                    setSuccessMessage({message: 'La cuenta ha sido creada exitosamente'});
                })
                .catch(err => {
                    setErrorMessage({message: 'Ocurrió un error al intentar crear la cuenta, por favor intenalo de nuevo más tarde.'});
                    console.error(err);
                });
        }

        return {
            fields,
            feedback,
            errors,
            passwordVisible,
            togglePasswordVisibility,
            handlePasswordInput,
            handleRegister,
        }
    }
</script>

<template>    
    <section class="container my-5 py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10 col-sm-12 p-5 border border-dark rounded-4 shadow-lg mb-5 bg-body-tertiary rounded">
                <router-link to="/" class="fs-1"><i class="bi bi-arrow-left-circle"></i></router-link>
                <h2 class="text-center border-bottom pb-3">Crear una nueva cuenta</h2>
                <form action="#" method="post" @submit.prevent="handleRegister" class="mt-4" novalidate>
                    <div class="row">
                        <div class="mb-4 col-md-6 col-sm-12">
                            <label for="name" class="form-label">Nombre</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="name" 
                            name="name"
                             v-model="fields.name"
                             />
                             <div class="mt-2 text-danger">
                                {{ errors.name }}
                             </div>
                        </div>

                        <div class="mb-4 col-md-6 col-sm-12">
                            <label for="name" class="form-label">Apellido</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="text" 
                                name="text"
                                v-model="fields.surname"
                             />
                             <div class="mt-2 text-danger">
                                {{ errors.surname }}
                             </div>
                        </div>

                        <div class="mb-4 col-sm-12">
                            <label for="email" class="form-label">Email</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                name="email"
                                v-model="fields.email"
                             />

                             <div class="mt-2 text-danger">
                                {{ errors.email }}
                             </div>
                        </div>

                        <div class="col-sm-12">
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
                                    {{ errors.password }}
                                </div>
                        </div>
                    </div>

                    <div class="d-grid mt-4">
                        <button type="submit" class="btn btn-primary">Crear cuenta</button>
                    </div>
                </form>
                <p class="mt-4 text-center text-registro">Ya tenés una cuenta? <router-link to="/iniciar-sesion" class="link-registro">Inicia sesión aqui</router-link></p>
            </div>
        </div>
    </section>
</template>
