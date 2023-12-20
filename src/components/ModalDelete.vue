<script setup>
  import { onMounted, defineProps, ref } from 'vue';
  import { deletePricing, getPricingById } from '../services/pricing.js';

  const props = defineProps(['modalId']);
  const pricingName = ref('');

  onMounted(async () => {
    try {
      const pricingData = await getPricingById(props.modalId);
      pricingName.value = pricingData.name;
    } catch (err) {
      console.error('[ModalDelete.vue onMounted]', err);
      setErrorMessage({ message: 'Ocurrió un error al intentar obtener la información de la opción de contratación, intente nuevamente más tarde.' });
    }
  });

  const handleDelete = async () => {
    if (props.modalId) {
      try {
        await deletePricing(props.modalId);

       // Encontrar y eliminar el elemento modal-backdrop
      const backdropElement = document.querySelector('.modal-backdrop');
      backdropElement.parentNode.removeChild(backdropElement);
      } catch (err) {
        console.error('[ModalDelete.vue handleDelete]', err);
        setErrorMessage({
          message: 'Ocurrió un error inesperado al intentar eliminar la opción de contratación, intente nuevamente más tarde.',
        });
      }
    }
    return {
      handleDelete,
    };
  };
</script>

<template>
  <div class="modal fade" :id="`delete-modal-${props.modalId}`" aria-hidden="true" aria-labelledby="delete-modal"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4" id="delete-modal ">¿Estás seguro de que quieres eliminar {{ pricingName }}?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger d-flex justify-content-center align-items-center" role="alert">
            <p class="fw-bold pt-2"><i class="bi-exclamation-circle-fill fs-4"></i> Esta acción es irreversible</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

          <form action="#" method="POST" @submit.prevent="handleDelete">
            <button type="submit" class="btn btn-danger">Eliminar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>