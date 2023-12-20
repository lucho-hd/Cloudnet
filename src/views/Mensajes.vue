<script setup>
    //Componentes 
    import NavBar from '../components/NavBar.vue';
    import Footer from '../components/Footer.vue';

    import { onMounted, ref, watch } from "vue";
    import { useUser } from "../composition/useUser.js";
    import { useAuth } from "../composition/useAuth";
    import { sendMessage, subscribeToChat } from "../services/chat.js";
    import { hourToString, dateToString } from "../helpers/date.js";
    
    const {user} = useUser("yRcshoOFuMTweFZQb6GczQc1DcJ3");
    const {user: authUser} = useAuth();
    const {form, handleSubmit} = useChatForm(authUser, user);
    const { messages } = useChat(authUser, user);

    const loading = ref(true);

    /**
     * 
     * @param {string} fromUser
     * @param {string} toUser
     * @return {{messages: Ref<UnwrapRef<*[]>>}}
     */
    function useChat(fromUser, toUser) {
        const messages = ref([]);

        let unsubscribe = () => {};
        let lastDate = ref(null);

        watch(toUser, newToUser => {
            if(newToUser.id != null) {
                setSubscribe(fromUser.value.id, newToUser.id);
            }
        });

        async function setSubscribe(user1, user2) {
            try {
                unsubscribe = await subscribeToChat({
                    user1,
                    user2,
                }, newMessages => {
                    messages.value = newMessages.map(message => {
                        const messageDate = new Date(message.created_at);
                        const showDate = !lastDate.value || messageDate.toDateString() !== lastDate.value;

                        if (showDate) {
                            lastDate.value = messageDate.toDateString();
                        }

                        return { ...message, showDate };
                    });
                    loading.value = false;
                });
            } catch (error) {
                console.error('Error en setSubscribe:', error);
                loading.value = false;
            }
        }

        onMounted(() => {
            unsubscribe();
        });

        return {
            messages,
        }
    }

    /**
     * @param {{id: string, email: string}} fromUser
     * @param {{id: string, email: string}} toUser
     * @return {{handleSubmit: ((function(): Promise<void>)|*), form: Ref<UnwrapRef<fields: {message: string}>>}}
     */
    function useChatForm(fromUser, toUser) {
        const form = ref({
            fields: {
                message: '',
            },
        });

        async function handleSubmit() {
            try {
                await sendMessage({
                    from: fromUser.value.id,
                    to: toUser.value.id,
                    message: form.value.fields.message,
                });
                form.value.fields.message = '';
            } catch (err) {
                console.log('[Mensajes.vue] Error al enviar el mensaje: ', err);
            }
        }

        return {
            form,
            handleSubmit,
        }
    }
    
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
        <NavBar />
        <div class="container">
            <h2 class="my-4 header-chat">Chat con el administrador</h2>
        </div>
        <section class="container bg-white border border-dark my-5" id="chat">
            <div>
                <ul v-for="message in messages" :key="message.created_at">
                    <p v-if="message.showDate" class="text-center mt-4 text-secondary">{{ dateToString(message.created_at)
                    }}</p>
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
            <form action="#" id="form-message" @submit.prevent="handleSubmit">
                <div class="d-flex flex-grow-1 mb-2">
                    <textarea id="message" v-model="form.fields.message" class="chat-form w-100 p-2"
                        placeholder="Escribe un mensaje"></textarea>
                    <button type="submit" class="send-message" :disabled="form.fields.message.trim() === ''">
                        <i class="bi-send fs-5"></i>
                    </button>
                </div>
            </form>
        </section>
        <Footer />
    </template>
</template>
  