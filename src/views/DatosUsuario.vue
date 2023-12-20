<script setup>
    import { ref, inject, watch } from "vue";
    import { useAuth } from '../composition/useAuth';

    import NavBar from '../components/NavBar.vue';
    import Footer from '../components/Footer.vue';
    import Imagen from '../components/Imagen.vue';

    import { updateUserProfile } from "../services/auth";

    const {user} = useAuth();
    const { feedback, clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');
    
    const {fields, handleSubmit, handleFile, photoPreview} = useEditProfile(user);

    /**
     * @param {id: string, email: string} user 
     */
    function useEditProfile(user) {
        const fields = ref({
            name: '',
            surname: '',
            email: '',
            photoURL: null,
        });
        const photoPreview = ref(null);

        watch(user, newUserData => {
            fields.value.name    = newUserData.name,
            fields.value.surname = newUserData.surname, 
            fields.value.photoURL = newUserData.photoURL,
            fields.value.email   = newUserData.email;
        });

        async function handleSubmit() {
            try {
                await updateUserProfile(user.value.id, {
                    ...fields.value
                });
                fields.value.photoURL = null;
                photoPreview.value = null;
                setSuccessMessage({message: '¡Tu perfil fue actualizado exitosamente!'});
            } catch(err) {
                console.error('[DatosUsuario.vue handleSubmit]', err);
                setErrorMessage({message: 'Ocurrió un error inesperado al actualzar los datos de tu perfil, por favor intenta de nuevo más tarde.'});
            }
        }

        async function handleFile(ev) {
            const file = ev.target.files[0];

            const reader = new FileReader();

            reader.addEventListener('load', function() {
                photoPreview.value = reader.result;
                fields.value.photoURL = reader.result;
            });

            reader.readAsDataURL(file);
        }

        return {
            fields, 
            photoPreview,
            handleFile,
            handleSubmit,
        }
    }

</script>

<template>
    <NavBar/>
    <section class="container bg-white p-5 my-5 user-data">
        <h2 class="border-bottom pb-3">Mis datos</h2>
            <form action="#" method="post" @submit.prevent="handleSubmit">
                <fieldset class="mt-4">
                    <legend class="mb-4">Datos de la cuenta</legend>

                    <div class="image-container">
                            <Imagen :src="user.photoURL" class="profile-image"></Imagen>

                            <div v-if="photoPreview !== null">
                                <img :src="photoPreview" alt="Foto de perfil del usuario" class="foto-default">
                            </div>

                            <label for="photoURL" class="edit">
                                <i class="bi-pencil-fill fs-5"></i>
                            </label>

                            <input 
                                id="photoURL"
                                type="file"
                                @change="handleFile"
                            />
                        </div>

                    <div class="row">
                        <div class="mb-4 col-md-6 col-12">
                            <label class="form-label" for="name">Nombre</label>
                            <input 
                            type="text"
                            id="name"
                            class="form-control"
                            name="name"
                            v-model="fields.name"
                            >
                        </div>
                        
                        <div class="mb-4 col-md-6 col-12">
                            <label class="form-label" for="surname">Apellido</label>
                            <input 
                            type="text"
                            id="surname"
                            class="form-control"
                            name="surname"
                            v-model="fields.surname"
                            >
                        </div>

                        <div class="mb-4 col-md-12 col-12">
                            <label class="form-label" for="surname">Email</label>
                            <input 
                            type="email"
                            id="email"
                            class="form-control"
                            name="email"
                            v-model="fields.email"
                            >
                        </div>
                    </div>
                </fieldset>
                <div class="d-grid mt-3">
                    <button class="btn btn-primary py-2">Editar información</button>
                </div>
            </form>
    </section>
    <Footer/>
</template>