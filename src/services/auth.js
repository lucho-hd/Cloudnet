import {auth} from "./firebase.js";
import { ref } from "vue";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";

import { createUser, getUserById, updateUser  } from "./users.js";
import { getFile, uploadFileUsingString } from "./storage.js";

 let user = {
    id: null,
    email: null,
    name: null,
    surname: null,
    photoURL: null,
    admin: null,
};

if(localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, newUserData => {
    if (newUserData) {
    setUser({
        id: newUserData.uid,
        email: newUserData.email,
    });

    getUserById(newUserData.uid)
        .then(userData => {
            setUser({
                name: userData.name,
                surname: userData.surname,
                admin: userData.admin,
            });
        });

        getFile(newUserData.photoURL)
            .then(url => {
                setUser({
                    photoURL: url,
                })
            })
    } else {
        clearUser();
    }
  });

let observers = [];

/**
 * @param {(user: {id: string|null, email: string|null, name: string|null, surname: string|null, admin: boolean|null}) => void} observer 
 */

export function subscribeToAuthChanges(observer) {
    observers.push(observer);

    notify(observer);

    return () => (observers = observers.filter(obs => obs !== observer));
}

/**
 * Invoca al observer dándole una copia de los datos del usuario.
 * 
 * @param {(user: {id: string|null, email: string|null, name: string|null, surname: string|null, admin: boolean|null}) => void} observer 
 */
function notify(observer) {
    observer({
        ...user
    });
}

/**
 * Notifica de los cambios de autenticación a todos los observers registrados. 
 */
function notifyAll(){
    observers.forEach(obs => notify(obs));
}

export async function register({email, password, name, surname}) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        await createUser(user.uid, {
             email: user.email, 
             name, 
             surname, 
            });

        return {
            id: user.uid,
            email: user.email,
            name,
            surname,
            admin: false,
        };
    } catch (err) {
        console.error("[auth.js register()] Error al crear la cuenta: ", err);
        throw err;
    }
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{id: string, email: string, admin: boolean}>}
 */
export function login({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            const user = credentials.user;
            return {
                id: user.uid,
                email: user.email,
            };
        })
        .catch(err => {
            console.error("[auth.js login()] Error al iniciar sesión: ", err);
            throw err;
        })
}

/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @return {promise<Awaited<void>[]>} 
 */
export async function updateUserProfile(id, {name, surname, email, photoURL}) {
    try {
        const promises = [];

        let photoPath = user.photoURL;
        
        if(photoURL) { 
            photoPath = `${user.id}/avatar.jpg`;
            promises.push(uploadFileUsingString(photoPath, photoURL));
        }

        promises.push(updateProfile(auth.currentUser, {name, surname, email, photoURL: photoPath}));
        promises.push(updateUser(id, {name, surname, email, photoURL: photoPath}));

        return Promise.all(promises)
            .then(async () => {
                setUser({
                    name,
                    surname,
                    email,
                    photoURL: await getFile(photoPath),
                });
            });
    } catch (err) {
        console.error('[auth.js updateUserProfile]', err);
        throw err;
    }
}

/**
 * Cierra la sesión del usuario.
 * 
 * @returns {Promise<void>}
 */
export function logout(){
    localStorage.removeItem('user');
    return signOut(auth);
}

/**
 * Actualiza los datos locales del usuario que está autenticado, notificando los cambios realizados.
 * @param {{id: string|null, email: string|null, name: string|null, surname: string|null, admin: boolean|null}} newData 
 */
function setUser(newData) {
    user = {
        ...user,
        ...newData,
    };
    localStorage.setItem('user', JSON.stringify(user));
    notifyAll();
}

/**
 * Elimina al usuario que está autenticado y notifica los cambios realizados.
 */
function clearUser() {
    user = {
        id: null,
        email: null,
        name: null,
        surname: null,
        photoURL: null,
        admin: null,
    };
    localStorage.removeItem('user');
    notifyAll();
}