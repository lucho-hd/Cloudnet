import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToAuthChanges } from "../services/auth.js";

export function useAuth() {
    const user = ref({
        id:null,
        email: null,
        name: null,
        surname: null,
        photoURL: null,
        admin: null,
    });
    let unsubscribe = () => {}

    onMounted(() => {
        unsubscribe = subscribeToAuthChanges(newUser => user.value = newUser) ;
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        user,
    }
}