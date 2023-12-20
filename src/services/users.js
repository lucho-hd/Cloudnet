import { db } from "./firebase.js";
import {setDoc, doc, getDoc, updateDoc} from "firebase/firestore";

/**
 *Crea un nuevo usuario en la base de datos.
 *  
 * @param {string} id 
 * @param {string} email 
 * @param {string} name
 * @param {string} surname
 * @returns Promise<void>
 */
export function createUser(id, {email, name, surname}) {
    const userRef = doc(db, 'users', id);

    return setDoc(userRef, {
        email,
        name,
        surname,
        admin: false,
    });
}

/**
 * Busca el usuario mediante el id proporcionado en la base de datos.
 * 
 * @param {string} id 
 * @returns  {Promise<{id: string, email: string, name: string, surname: string, admin: boolean}>}
 */
export async function getUserById(id) {
    const userRef = doc(db, 'users', id);

    const user = await getDoc(userRef);

    if(!user.exists()) {
        throw new Error('[users.js getUserById] El usuario que estas buscando parece no existir');
    }

    return {
        id,
        email: user.data().email,
        name: user.data().name,
        surname: user.data().surname,
        admin: user.data().admin,
        photoURL: user.data().photoURL,
    }
}

/**
 * Actualiza los datos del usuario en la base de datos.
 * @param {string} id 
 * @param {string} name
 * @param {string} surname
 * @param {string} email 
 * @return {promise<void>} 
 */
export async function updateUser(id, {name, surname, email, photoURL}) {
    return updateDoc(
        doc(db, 'users', id),
        {
            name,
            surname,
            email,
            photoURL,
        }
    );
}