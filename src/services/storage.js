import {storage} from "./firebase.js";
import {ref, uploadString, getDownloadURL} from "firebase/storage";

/**
 * 
 * @param {string} url
 * @param {string} file
 * @param {string} stringFormat
 * @return {Promise<UploadResult>} 
 */

export async function uploadFileUsingString(url, file, stringFormat = "data_url") {
    const fileRef = ref(storage, url);
    return uploadString(fileRef, file, stringFormat);
}

/**
 * @param {string|null} url
 * @return {Promise<string|null>}
 */

export async function getFile(url) {
    if(url == null || url === '') return null;

    const fileRef = ref(storage, url);
    return getDownloadURL(fileRef);
}