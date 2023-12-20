import { db } from "./firebase.js";
import { collection, onSnapshot, orderBy, query, addDoc, serverTimestamp, getDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";


/**
 * Trae los datos de pricing de firestore (base de datos).
 * 
 * @param {(data: {id: string|number, name: string, price: string|number, description: string, proceeds: Array, created_at: Date}[]) => null} callback
 */
export async function getPricing(callback) {
    const ref = collection(db, 'pricing');

    const q = query(ref, orderBy('created_at'));

    return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            proceeds: doc.data().proceeds,
        }));

        callback(data);
    })
}

/**
 * Crea una nueva colección en la base de datos con la opción de contratación seleccionada por el usuario que esté autenticado. 
 * 
 * @param {string} price 
 * @param {string} user 
 * @return
 */
export function rentAPrice(price, userEmail, userId) {
    const hirings = {
        userId: userId,
        userEmail: userEmail,
        priceName: price.name,
        state: 'Pago',
        created_at: serverTimestamp(),
    };

    return addDoc(collection(db, 'hirings'), hirings)
}

/**
 * Trae las opciones de contratación de cada usuario desde Firebase.
 * 
 * @param {(data: {userEmail: string, priceName: string, created_at: Date}[]) => null} callback 
 */
export function getUsersPricing(callback) {
    const pricingRef = collection(db, 'hirings');

    const q = query(pricingRef, orderBy('created_at'));

    return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => ({
            userId: doc.data().userId,
            userEmail: doc.data().userEmail, 
            priceName: doc.data().priceName,
            state: doc.data().state,
        }));

        callback(data);
    })
}


/**
 * Crea una nueva opción de contratación en la base de datos.
 * 
 * @param {string} name 
 * @param {number} price 
 * @param {string} description 
 * @param {Array} proceeds 
 * @return
 */
export function createPricing(newPrice) {
    const newPricing = {
        name: newPrice.name,
        price: newPrice.price,
        description: newPrice.description,
        proceeds: newPrice.proceeds,
        created_at: serverTimestamp(),
    };

    return addDoc(collection(db, 'pricing'), newPricing)
}

/**
 * Busca la opción de contratación mediante el id proporcionado en la base de datos.
 * 
 * @param {string} id 
 * @returns {Promsise<{id: string, name: string, pricing: number, description: string, proceeds: array}>}
 */
export async function getPricingById(id) {
    const pricingRef = doc(db, 'pricing', id);

    const pricing = await getDoc(pricingRef);

    if(!pricing.exists()) {
        throw new Error('[pricing.js getPricingById] La opción de contratación que estás buscando parece no existir');
    }

    return {
        id, 
        name: pricing.data().name,
        price: pricing.data().price,
        description: pricing.data().description,
        proceeds: pricing.data().proceeds,
    }
}

/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {number} price 
 * @param {string} description 
 * @param {array} proceeds 
 * @returns {promise<void>}
 */
export async function updatePricing(id, {name, price, description, proceeds}) {
    return updateDoc(
        doc(db, 'pricing', id),
        {
            name,
            price,
            description,
            proceeds,
        }
    );
}

export async function deletePricing(id) {
    return deleteDoc(
        doc(db, 'pricing', id),
    )
}




