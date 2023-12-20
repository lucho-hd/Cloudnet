<script setup>
    import {computed} from 'vue';
    import imagenPorDefecto from '../assets/imagenPerfil/imagenPorDefecto.png';

    const props = defineProps({
        src: {
            required: true,
        },
        alt: {
            type: String,
            default: '',
        }
    });

    const mostrarSrc = computed(() => props.src != null && props.src !== '' ? props.src : imagenPorDefecto);
</script>

<template>
    <img
        :src="mostrarSrc"
        :alt="alt"
    />
</template>