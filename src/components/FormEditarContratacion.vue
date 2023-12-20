<script setup>
import { ref, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { updatePricing } from "../services/pricing";


const { clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');
const router = useRouter();

const props = defineProps(['pricing']);

const loading = ref(true);

const fields = ref({
    name: '',
    price: '',
    description: '',
    proceeds: [],
});

watch(() => props.pricing, (newPricingData) => {
  fields.value.name = newPricingData.name;
  fields.value.price = newPricingData.price;
  fields.value.description = newPricingData.description;
  fields.value.proceeds = newPricingData.proceeds;

  loading.value = false;
});

const feedback = ref({
  type: 'success',
  message: '',
});

const errors = ref([]);

async function handleSubmit() {
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

  const proceedsArray = Array.isArray(fields.value.proceeds)
  ? fields.value.proceeds
  : fields.value.proceeds.split(',').map(proceed => proceed.trim());

  const { name, price, description, proceeds } = fields.value;

  updatePricing(props.pricing.id, { name, price, description, proceeds: proceedsArray, })

  .then(pricing => {
    router.push('/admin/panel/pricing');
    setSuccessMessage({ message: `¡La opción de contratación "${fields.value.name}" fue editada exitosamente!` });
        })
        .catch(err => {
            setErrorMessage({ message: 'Ocurrió un error al intentar editar la opción de contratación, por favor intenta de nuevo más tarde.' });
        });
}

// console.log(fields);
</script>

<template>
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
      <h2 class="border-bottom border-secondary my-3 pb-2 mx-1">
        <router-link to="/admin/panel/pricing">
          <i class="bi-arrow-left-circle fs-3"></i>
        </router-link>
        Editar {{ pricing.name }}
      </h2>
        <form action="#" method="post" @submit.prevent="handleSubmit">
          <div class="bg-white p-3 row mx-1 mt-4">
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
              <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </form>
    </template>
  </template>
  