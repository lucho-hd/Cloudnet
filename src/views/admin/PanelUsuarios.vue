<script setup>
import AdminNav from '../../components/AdminNav.vue';

import { ref, onMounted } from 'vue';
import { getUsersPricing } from '../../services/pricing';

const { usersPricing } = useUsersPricing();
const loading = ref(true);

function useUsersPricing() {
    const usersPricing = ref([]);

    onMounted(() => {
        getUsersPricing(newUserPricing => {
            usersPricing.value = newUserPricing
            loading.value = false;
        });
    })

    return {
        usersPricing,
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
                <AdminNav />
                <div class="col-md-9 col-auto admin">
                    <h2 class="my-3 border-bottom border-secondary pb-2">
                        <router-link to="/admin/panel/pricing">
                            <i class="bi-arrow-left-circle fs-3"></i>
                        </router-link>
                        Listado de usuarios
                    </h2>
                    <div class="table-responsive bg-white p-3">
                        <table class="table caption-top table-hover table-bordered border-secondary">
                            <caption class="fw-bold border-bottom">Lista de usuarios con planes contratados.</caption>
                            <template v-if="usersPricing.length === 0">
                                <div class="col-md-10 col-auto admin d-flex align-items-center justify-content-center">
                                    <p class="text-center fs-4 p-5 m-5">Actualmente no hay usuarios con planes contratados.</p>
                                </div>
                            </template>
                            <template v-else>
                                <thead class="text-center">
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Plan contratado</th>
                                    <th>Estado</th>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-for="(userPlan) in usersPricing" :key="userPlan.userId">
                                        <td>{{ userPlan.userId }}</td>
                                        <td>{{ userPlan.userEmail }}</td>
                                        <td>{{ userPlan.priceName }}</td>
                                        <td class="text-success fw-bold">{{ userPlan.state }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </table>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>