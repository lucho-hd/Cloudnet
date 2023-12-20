/**
 * Cambia la fecha proporcionada al formato de "DD/MM/YYYY HH:mm".
 * 
 * @param {Date} date
 * @return {string}
 */

export function hourToString(date) {
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit',
    }).format(date);

    return`${formattedTime}`
}

export function dateToString(date) {
    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(date);

    return`${formattedDate}`
}