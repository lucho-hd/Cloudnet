import {createRouter, createWebHashHistory} from "vue-router";
import { subscribeToAuthChanges } from "../services/auth.js";
import { inject } from "vue";

// Vistas
import Inicio            from "../views/Inicio.vue";
import Precio            from "../views/Precio.vue";
import IniciarSesion     from "../views/IniciarSesion.vue"; 
import Registro          from "../views/Registro.vue";
import MiPerfil          from "../views/MiPerfil.vue";
import Mensajes          from "../views/Mensajes.vue";
import DatosUsuario      from "../views/DatosUsuario.vue"; 
import PanelPricing      from "../views/admin/PanelPricing.vue";
import Error404          from "../views/Error404.vue";
import PanelUsuarios     from "../views/admin/PanelUsuarios.vue";
import CrearPricing      from "../views/admin/NuevaContratacion.vue";
import EditarPricing     from "../views/admin/EditarContratacion.vue"; 
import PanelChatUsuarios from "../views/admin/PanelChatUsuarios.vue";

// Rutas
const routes = [ 
    
    // Rutas del sitio
    { path: '/',                            component: Inicio },
    { path: '/precios',                     component: Precio },
    { path: '/iniciar-sesion',              component: IniciarSesion},
    { path: '/registro',                    component: Registro},
    { path: '/perfil',                      component: MiPerfil,          meta: {requiresAuth: true}}, 
    { path: '/perfil/mis-datos',            component: DatosUsuario,      meta: {requiresAuth: true}},
    { path:  '/perfil/mensajes',            component: Mensajes,          meta: {requiresAuth: true}}, 
    { path: '/admin/panel/pricing',         component: PanelPricing,      meta: {requiresAuth: true, requiredAdmin: true}},
    { path: '/admin/panel/usuarios',        component: PanelUsuarios,     meta: {requiresAuth: true, requiredAdmin: true}},
    { path: '/admin/panel/chats',           component: PanelChatUsuarios, meta: {requiresAuth: true, requiredAdmin: true}},
    { path: '/pricing/nuevo',               component: CrearPricing,      meta: {requiresAuth: true, requiredAdmin: true}},
    { path: '/pricing/:id/editar',          component: EditarPricing,     meta: {requiresAuth: true, requiredAdmin: true}},

    
    // Ruta a página de Error 404
    { path: '/:catchAll(.*)',  component: Error404},
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
    admin: null,
}

subscribeToAuthChanges(newUser => user = newUser);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && user.id === null) {
        return {
            path: '/iniciar-sesion',
        }
    }
    if(to.meta.requiredAdmin && user.admin === false) {
        return {
            path: '/',
        }
    }
});

export default router;
