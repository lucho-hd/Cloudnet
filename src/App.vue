<script setup>
    import { provide, ref } from 'vue';
    import Notification from './components/Notification.vue';

    const feedback = ref({
        type: 'success',
        message: '',
        title: '',
        closable: true,
    });

    function clearMessage() {
        feedback.value = {
            ...feedback.value,
            type: 'success',
            message: '',
            title: '',
        }
    } 
    
    function setMessage({message, type = 'success', title = ''}) {
        feedback.value = {
            ...feedback.value,
            message,
            type,
            title,
        };
    }

    function setSuccessMessage({message, title = ''}) {
        setMessage({message, type: 'success', title});
    }

    function setErrorMessage({message, title = ''}) {
        setMessage({message, type: 'error', title});
    }

    provide('notification', {
        feedback,
        clearMessage,
        setMessage,
        setSuccessMessage,
        setErrorMessage,
    });
</script>

<template>   
        <main>
            <Notification
                :data="feedback"
                @close="clearMessage"/>
            <router-view/>
        </main>
</template>