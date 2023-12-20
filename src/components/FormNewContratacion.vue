<script setup>
    import { ref, inject } from "vue";
    import { useRouter } from "vue-router";
    import { createPricing } from "../services/pricing";

    const { clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');
    const { fields, feedback, errors, handleSubmit } = useCreatePricing();

    function useCreatePricing() {
     const router = useRouter();

    const fields = ref({
        name: '',
        price: '',
        description: '',
        proceeds: '',
    });

    const feedback = ref({
        type: 'success',
        message: '',
    });

    const errors = ref([]);

    function handleSubmit() {
    feedback.value.message = '';
    errors.value = [];

    if (!fields.value.name) {
        errors.value.name = 'El nombre de la opción de contratación no puede quedar vacío.';
    }

    if (!fields.value.price) {
        errors.value.price = 'El precio no puede quedar vacío.';
    }

    if (!fields.value.description) {
        errors.value.description = 'La descripción no puede quedar vacía.';
    }

    if (!fields.value.proceeds) {
        errors.value.proceeds = 'Debes agregar por lo menos un beneficio a la opción de contratación.';
    }

    if (Object.keys(errors.value).length > 0) {
        return;
    }

    const { name, price, description, proceeds } = fields.value; 
    
    const proceedsArray = fields.value.proceeds.split(',').map(proceed => proceed.trim());

    createPricing({
        name,
        price,
        description,
        proceeds: proceedsArray,
    })
        .then(pricing => {
            router.push('/admin/panel/pricing');
            setSuccessMessage({ message: 'La opción de contratación fue creada exitosamente' });
        })
        .catch(err => {
            setErrorMessage({ message: 'Ocurrió un error al intentar crear la opción de contratación, por favor intenta de nuevo más tarde.' });
        });
}

  return {
    fields,
    feedback,
    errors,
    handleSubmit,
  };
}
</script>

<template>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <div class="bg-white p-3 row mx-1">
        <div class="col-md-6 col-12 mt-3">
          <label class="form-label" for="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            placeholder="Ingrese un nombre"
            v-model="fields.name"
          >
  
          <div class="mt-2 text-danger">
            {{ errors.name }}
          </div>
        </div>
  
        <div class="col-md-6 col-12 mt-3">
            <label class="form-label" for="price">Precio</label>
            <input
                type="number"
                name="price"
                id="price"
                class="form-control"
                placeholder="Ingrese un precio"
                v-model="fields.price"
            >

            <div class="mt-2 text-danger">
                {{ errors.price }}
            </div>
        </div>

  
        <div class="col-12 mt-3">
          <label for="description">Descripción</label>
          <textarea
            type="text"
            name="description"
            id="description"
            class="form-control"
            placeholder="Ingrese la descripción"
            v-model="fields.description"
          ></textarea>
  
          <div class="mt-2 text-danger">
            {{ errors.description }}
          </div>
        </div>
  
        <div class="col-12 mt-3">
          <label for="proceeds" class="form-label">Beneficios</label>
          <input
            type="text"
            name="proceeds"
            id="proceeds"
            class="form-control"
            placeholder="Ingrese los beneficios separados por comas"
            v-model="fields.proceeds"
          >
  
          <div class="mt-2 text-danger">
            {{ errors.proceeds }}
          </div>
        </div>
  
        <div class="d-grid mt-3">
          <button type="submit" class="btn btn-primary">Crear nueva opción de contratación</button>
        </div>
      </div>
    </form>
  </template>
  