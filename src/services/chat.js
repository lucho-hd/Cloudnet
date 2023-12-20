import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp, query, where, limit, getDocs, onSnapshot, orderBy, QueryDocumentSnapshot, DocumentReference } from 'firebase/firestore';
import { getUserById } from './users.js';

const refCache = [];

/**
 * 
 * @param {string} user1
 * @param {string} user2
 * @param {(data: {sender: string, message: string, created_at: Date|null}[]) => void} callback 
 * @return {Promise<Unsubscribe>}
 */
export async function subscribeToChat({user1, user2}, callback) {
    const chatRef = await getChatReference({user1, user2});

    const collectionRef = collection(db, 'chats', chatRef.id, 'messages');
    const q = query(
        collectionRef,
        orderBy('created_at')
    );

    return onSnapshot(q, async snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                sender: doc.data().sender,
                message: doc.data().message,
                created_at: doc.data().created_at.toDate(),
            }
        });

        callback(data);
    });
}

/**
 * Envia un mensaje por defecto al chat en específico.
 * 
 * @param {string} chatId 
 * @return {Promise<void>}
 */
async function sendDefaultMessage(chatId) {
    try {
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
            sender: 'yRcshoOFuMTweFZQb6GczQc1DcJ3',
            message: '¡Hola! Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y a la brevedad uno de nuestros administradores se pondrá en contacto.', 
            created_at: serverTimestamp(),
        });
        // console.log('Mensaje predeterminado enviado exitosamente.');
    } catch (error) {
        console.error('[chat.js] Error al enviar el mensaje predeterminado: ', error);
    }
}

/**
 * Envía el mensaje al chat seleccionado.
 * 
 * @param {string} from 
 * @param {string} to 
 * @param {string} message 
 * @return {Promise<void>}
 */
export async function sendMessage({ from, to, message }) {
    const chatRef = await getChatReference({ user1: from, user2: to });

    const messageCollection = collection(db, 'chats', chatRef.id, 'messages');

    const isFirstMessage = await checkIsFirtsMessage(chatRef.id);

    try {
        await addDoc(messageCollection, {
            sender: from,
            message,
            created_at: serverTimestamp(),
        });

        if (isFirstMessage) {
            await sendDefaultMessage(chatRef.id);
        }
        
        console.log('Mensaje enviado exitosamente.');
    } catch (error) {
        console.error('Error al enviar el mensaje [chat.js, sendMessage ]:', error);
        throw error;
    }
}

async function checkIsFirtsMessage(chatId) {
    const collectionRef = collection(db, 'chats', chatId, 'messages');
    const q = query(collectionRef);

    const snapshot = await getDocs(q);
    return snapshot.size === 0;
}

/**
 * Obtiene la referencia de la sala de chat de la que participan ambos usuarios "user1", "user2".
 * @param {string} user1
 * @param {string} user2
 * @return {Promise<QueryDocumentSnapshot<DocumentData>|DocumentReference<{users: {} | {}}>>}
 */
async function getChatReference({user1, user2}) {
    const users = {
        [user1]: true,
        [user2]: true,        
    }

    const cachedref = getFromCache({user1, user2});
    if(cachedref) return cachedref;

    const chatCollection = collection(db, 'chats');
    const chatQuery = query (
        chatCollection,
        where('users', '==', users),
        limit(1)
    );

    const querySnap = await getDocs(chatQuery);

    if(querySnap.empty) {
        const documentReference = await addDoc(chatCollection, {users});
        addToCache({user1, user2}, documentReference);
        return documentReference;
    }

    addToCache({user1, user2}, querySnap.docs[0]);
    return querySnap.docs[0];
}

/**
 * @param {string} user1
 * @param {string} user2
 * @param {*} reference
 */
function addToCache({user1, user2}, reference) {
    refCache[getCacheId({user1, user2})] = reference;
}

/**
 * @param {string} user1
 * @param {string} user2
 * @return {string|null}
 */
function getFromCache({user1, user2}) {
    return refCache[getCacheId({user1, user2})] || null;
}

/**
 * Retorna la clave para el caché que corresponda a dichos usuarios "user1", "user2".
 * 
 * @param {string} user1
 * @param {string} user2
 * @return {string}
 */
function getCacheId({user1, user2}) {
    return user1 > user2 ?
        user1 + "_" + user2 : 
        user2 + "_" + user1;
}

/**
 * Obtiene todas las salas de chat en las que se encuentra el usuario administrador.
 * 
 * @param {string} adminId - ID del administrador.
 * @return {Promise<Array<{ chatId: string, userId: string, userName: string }>>}
 */
export async function getAdminChatRooms(adminId) {
    const chatRooms = [];

    try {
        const privateChatsCollection = collection(db, 'chats');
        const q = query(privateChatsCollection, where(`users.${adminId}`, '==', true));
        const querySnapshot = await getDocs(q);

        for (const chatDocs of querySnapshot.docs) {
            const users = chatDocs.data().users;
            const otherUserId = Object.keys(users).find(userId => userId !== adminId);

            if (otherUserId) {
                const user = await getUserById(otherUserId);

                const messagesCollection = collection(db, 'chats', chatDocs.id, 'messages');
                const messagesQuery = query(messagesCollection, orderBy('created_at', 'desc'), limit(1));
                const messagesSnapshot = await getDocs(messagesQuery);
                const lastMessage = messagesSnapshot.docs[0].data();

                chatRooms.push({
                    chatId: chatDocs.id,
                    userId: user.id,
                    userName: user.name,
                    userSurname: user.surname,
                    userPhotoURL: user.photoURL,
                    lastMessage: lastMessage.message,
                    lastMessageSender: lastMessage.sender,
                    lastMessageTime: lastMessage.created_at.toDate(),
                });
            }
        }
    } catch (err) {
        console.error('[getAdminChatRooms] Error:', err);
    }

    return chatRooms;
}




