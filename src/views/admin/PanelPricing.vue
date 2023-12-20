<script setup>
    import AdminNav from '../../components/AdminNav.vue';

    import { ref, onMounted} from "vue";
    import { getPricing } from '../../services/pricing';
    import ModalDelete from '../../components/ModalDelete.vue';
   
    const { pricing } = usePricing();
    const modalDelete = ref(null);
    const loading = ref(true);

    function usePricing() {
        const pricing = ref([]);

        onMounted(() => {
            getPricing(newPricing => {
                pricing.value = newPricing
                loading.value = false;
            });
        })

        return {
            pricing,
        }
    }
</script>

<template>
    <section class="container-fluid">
        <template v-if="loading">
            <div class="loader-container">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="row flex-nowrap">
                <AdminNav/>
                <div class="col-md-9 col-auto admin">
                    <h2 class="my-3 border-bottom border-secondary pb-2">Administrar Opciones de contratación</h2>

                    <div class="d-flex justify-content-end my-3">
                        <router-link to="/pricing/nuevo" class="btn btn-primary">Añadir una nueva opción de contratación</router-link>
                    </div>

                    <div class="table-responsive bg-white p-3">
                        <table class="table caption-top table-hover table-bordered border-secondary">
                            <caption class="fw-bold">Lista de opciones de contratación</caption>
                            <thead class="text-center">
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Beneficios</th>
                                <th>Acciones</th>
                            </thead>
                            <tbody>
                                <tr v-for="(shop, index) in pricing" :key="shop.id">
                                    <td>{{ shop.id }}</td>
                                    <td>{{ shop.name }}</td>
                                    <td>
                                        <span v-if="index == 0">{{ shop.price }}</span>
                                        <span v-else>${{ shop.price }}</span>
                                    </td>
                                    <td>{{ shop.description }}</td>
                                    <td>
                                        <ul>   
                                            <li v-for="proceeds in shop.proceeds" :key="proceeds.proceeds">
                                                {{ proceeds }}
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <router-link :to="`/pricing/${shop.id}/editar`" class="btn btn-primary">Editar</router-link>
                                        <router-link 
                                            to="#"
                                            class="btn btn-danger mt-2" 
                                            data-bs-toggle="modal" 
                                            :data-bs-target="`#delete-modal-${shop.id}`"
                                            >
                                            Eliminar
                                        </router-link>
                                        <ModalDelete :modalId="shop.id" ref="modalDelete"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>        
            </template>
    </section>
</template>