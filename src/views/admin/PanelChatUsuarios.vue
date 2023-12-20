<script setup>
    //Componentes 
    import AdminNav from '../../components/AdminNav.vue';
    import Imagen from '../../components/Imagen.vue';
    import AdminChat from '../../components/AdminChat.vue';

    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { getAdminChatRooms } from '../../services/chat';
    import { hourToString, dateToString } from '../../helpers/date.js';

    const chatRooms = ref([]);
    const selectedUserId = ref(null);
    const isInChatRoom= ref(false);
    const loading = ref(true);

    const adminId = "yRcshoOFuMTweFZQb6GczQc1DcJ3";

    onMounted(async () => {
        try {
            const lastChat = localStorage.getItem('lastChat');

            if (lastChat) {
                selectedUserId.value = lastChat;
            }

            const adminChatRooms = await getAdminChatRooms(adminId);
            chatRooms.value = adminChatRooms;
            loading.value = false;
            // console.log(adminChatRooms);
            // console.log('Último Chat:', lastChat);
        } catch (error) {
            console.error("Error al obtener las salas de chat del administrador:", error);
        }
    });

    onBeforeUnmount(() => {
        localStorage.setItem('lastChat', selectedUserId.value);
        // console.log('Guardando último chat: ', selectedUserId.value);
    });


    const openChat = (userId) => {
        selectedUserId.value = userId;
        // console.log(selectedUserId.value); 
    };

    const isMessageFromAdmin = (senderId) => {
      const lastMessageSender = senderId;
      return lastMessageSender === adminId;
    }
</script>

<template>
    <section class="container-fluid">
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
        <div class="row">
          <AdminNav class="col-md-2" />
          <template v-if="chatRooms.length === 0">
            <div class="col-md-10 d-flex align-items-center justify-content-center">
              <p class="text-center fs-3">Actualmente no tienes ningún mensaje.</p>
            </div>
          </template>
          
          <template v-else>
            <div class="col-md-3 col-auto admin chat-admin d-flex flex-column">
              <div v-for="chatRoom in chatRooms" :key="chatRoom.chatId" class="chats" :class="{ 'chat-open': selectedUserId === chatRoom.userId }">
                <div @click="openChat(chatRoom.userId)" class="d-flex my-3">
                  <Imagen :src="chatRoom.userPhotoURL" class="chat-img ms-3"></Imagen>
                  <div class="chat-info ms-2">
                    <div class="d-flex justify-content-between">
                      <span class="text-dark">{{ chatRoom.userName }} {{ chatRoom.userSurname }}</span>
                      <span class="text-secondary">{{ dateToString(chatRoom.lastMessageTime) }}</span>
                    </div>
                    <p class="message-content text-secondary"> 
                        {{ isMessageFromAdmin(chatRoom.lastMessageSender) ? 'Tu: ' : '' }} {{ chatRoom.lastMessage }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="selectedUserId === null">
              <div class="col-md-7 d-flex align-items-center justify-content-center">
                <p class="text-center fs-3">No has seleccionado ningún chat</p>
              </div>
            </template>
  
            <template v-else>
              <div class="container-fluid col-md-7">
                <AdminChat :userId="selectedUserId" />
              </div>
            </template>
          </template>
        </div>
      </template>
    </section>
  </template>
  