import {ref} from "vue";
import { getUserById } from "../services/users";
import { getFile } from "../services/storage";

/**
 * 
 * @param{string} id
 */
export function useUser(id) {
    const user = ref ({
        id: null,
        email: null,
        name: null,
        surname: null,
        admin: null,
        photoURL: null,
    });

    loadUser(id);

    async function loadUser(id) {
        try {
            const userData = await getUserById(id);
            user.value = {
                ...user,
                id: userData.id,
                email: userData.email,
                name: userData.name,
                surname: userData.surname,
                admin: userData.admin,
            };

            user.value.photoURL = await getFile(userData.photoURL);
        }catch(err) {
            console.error('[useUser.js loadUser] ', err);
        }
    }

    return {
        user
    }
}