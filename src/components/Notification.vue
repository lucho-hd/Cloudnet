<script setup>
    import {computed} from "vue";

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    });

    const notificationClasses = computed(() => {
        switch(props.data.type) {
            case 'success': 
                return 'alert-success';

            case 'error': 
                return 'alert-danger';

            default: 
                return 'alert-warnig';
        }
    });
</script>

<template>
    <div
        v-if="data.message !== ''"
        class="alert alert-dismissible"
        :class="notificationClasses"
    >
        <div class="text-center fs-3" role="alert">
            <p><i class="bi-exclamation-circle-fill"></i> {{ data.message }}</p>
            
            <button
                v-if="data.closable"
                class="btn-close"
                type="button"
                data-bs-dismiss="alert" 
                aria-label="Close"
                @click="$emit('close')"
            >
            </button>
        </div>
    </div>
</template>