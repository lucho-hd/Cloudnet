<script setup>
    import AdminNav         from '../../components/AdminNav.vue';
    import FormNewContratacion from '../../components/FormNewContratacion.vue';
</script>

<template>
      <section class="container-fluid">
        <div class="row flex-nowrap">
            <AdminNav/>
            <div class="col-md-9 col-auto admin">
                <h2 class="border-bottom border-secondary my-3 pb-2 mx-1">
                    <router-link to="/admin/panel/pricing">
                        <i class="bi-arrow-left-circle fs-3"></i>
                    </router-link>
                    Crear nueva opción de contratación
                </h2>
                <FormNewContratacion/>
            </div>
        </div>
      </section>
</template>