<script setup>
    import AdminNav               from '../../components/AdminNav.vue';
    import FormEditarContratacion from '../../components/FormEditarContratacion.vue';

    import {useRoute} from "vue-router";
    import {usePricingData} from "../../composition/usePricingData";

    const route = useRoute();
    const {pricing} = usePricingData(route.params.id);    
</script>

<template>
    <section class="container-fluid">
        <div class="row flex-nowrap">
            <AdminNav/>
            <div class="col-md-9 col-auto admin">
                <FormEditarContratacion :pricing="pricing"/>
            </div>
        </div>
    </section>
</template>