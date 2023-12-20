<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { getUserById } from '../services/users';
    import { subscribeToChat, sendMessage } from '../services/chat';
    import { useAuth } from '../composition/useAuth';
    import { hourToString, dateToString } from '../helpers/date';
    import Imagen  from '../components//Imagen.vue';

    const props = defineProps(['userId']);

    const user = ref(null);
    const { user: authUser } = useAuth();
    const messages = ref([]);
    const newMessage = ref('');
    const lastDate = ref(null);

    onMounted(async () => {
    if (props.userId) {
        user.value = await getUserById(props.userId);
        subscribeToChat({ user1: 'yRcshoOFuMTweFZQb6GczQc1DcJ3', user2: props.userId }, updateMessages);
        // console.log(user.value);
    }
    });

    watch(() => props.userId, async (newUserId) => {
    if (newUserId) {
        user.value = await getUserById(newUserId);
        subscribeToChat({ user1: 'yRcshoOFuMTweFZQb6GczQc1DcJ3', user2: newUserId }, updateMessages);
        // console.log('Cambio de userID:', newUserId);
    }
    });

    const sendMessageToUser = async () => {
    if (props.userId && newMessage.value.trim() !== '') {
        await sendMessage({ from: 'yRcshoOFuMTweFZQb6GczQc1DcJ3', to: props.userId, message: newMessage.value });
        newMessage.value = '';
    }
    };

    const updateMessages = (newMessages) => {
    messages.value = newMessages;
    };

    const showDate = (date) => {
    const messageDate = new Date(date);
    const showDate = !lastDate.value || messageDate.toDateString() !== lastDate.value;

    if (showDate) {
        lastDate.value = messageDate.toDateString();
    }

    return showDate;
};

</script>


<template>
    <div class="container d-flex border border-dark mt-5 header-chat-info">
        <Imagen :src="user ? user.photoURL : ''" class="chat-img ms-3"/>
        <h2 class="my-4 header-chat ms-2">{{ user ? user.name : 'Nombre' }} {{ user ? user.surname : 'Apellido'}}</h2>
    </div>
    <section class="container bg-white border border-dark mb-5" id="chat">
        <div>
            <ul v-for="message in messages" :key="message.created_at">
                <p v-if="showDate(message.created_at)" class="text-secondary fs-6 text-center mt-3"> {{ dateToString(message.created_at) }}</p>
                <li class="mt-3 mb-3 message w-50" :class="{
                    'right': message.sender === authUser.id,
                    'background-sender': message.sender === authUser.id,
                    'background-from': message.sender !== authUser.id,
                }">
                    {{ message.message }}
                    <span class="text-secondary fs-6"> {{ hourToString(message.created_at) }}</span>
                </li>
            </ul>
        </div>
    </section>

    <section class="container p-0">
        <form action="#" id="form-message" @submit.prevent="sendMessageToUser">
            <div class="d-flex flex-grow-1 mb-2">
                <textarea id="message" v-model="newMessage" class="chat-form w-100 p-2"
                    placeholder="Escribe un mensaje"></textarea>
                <button type="submit" class="send-message" :disabled="newMessage === ''">
                    <i class="bi-send fs-5"></i>
                </button>
            </div>
        </form>
    </section>
</template>
  