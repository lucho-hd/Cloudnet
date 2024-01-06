<script setup>
    import NavBar  from "../components/NavBar.vue";
    import Footer from "../components/Footer.vue";
</script>

<template>
    <NavBar/>
    <section class="row banner-tienda mt-4 container">
        <div class="col-lg-5">
            <h2 class="my-3">Todo lo necesario para crear tu sitio web</h2>
            <p>Alojá tu sitio web de forma gratuita sin costo mensual ni comisiones.</p>

            <form action="#">
                <div class="my-3">
                    <label for="email" class="form-label fw-bold">Email</label>
                    <input
                    type="email" 
                    class="form-control" 
                    id="email"
                    name="email"
                    placeholder="Escribí el email que más usas"
                    /> 
                </div>
                <button type="submit" class="mt-3">Creá tu tienda gratis</button>
            </form>
        </div>
        <div class="col-lg-7">  
            <img src="../assets/banner-hosting.png" class="img-fluid" alt="Creá tu tienda online gratis">
        </div>
    </section>

    <section class="slider">
        <h2 class="">Únete gratis a todas las marcas que ya venden
            <br>
            <span>sus productos con Cloudnet.</span>

        </h2>
        <div class="carrusel">
            <div class="carrusel-inner">
                <div class="carrusel-item">
                    <img src="../assets/ecommerce/ecommerce-1.png" alt="Tienda Summer hecha con Cloudnet">
                </div>
                <div class="carrusel-item">
                    <img src="../assets/ecommerce/ecommerce-2.jpg" alt="Tienda Fashion hecha con Cloudnet">
                </div>
                <div class="carrusel-item">
                    <img src="../assets/ecommerce/ecommerce-3.jpg" alt="Tienda Almost Summer hecha con Cloudnet">
                </div>
                <div class="carrusel-item">
                    <img src="../assets/ecommerce/ecommerce-4.jpg" alt="Tienda Spedo hecha con Cloudnet">
                </div>
            </div>
        </div>
    </section>

    <section class="seccion-funcionalidades">
        <div class="container-fluid">
            <h2 class="text-center">Todo lo que tu tienda 
                <br>
                <span class="color-txt">
                    en línea necesita
                </span>    
            </h2>
            <div class="row justify-content-center">
                <article class="card mt-4 col-lg-4 col-md-6 col-12">
                    <div class="mt-3">
                        <i class="bi-truck iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Integración con medios de envío</h3>
                        <p class="card-text mt-4">
                            Más de 10 opciones para apoyarte en la
                            logística de tu tienda, como Correo
                            Argentino, Oca y Andreani.
                        </p>
                    </div>
                </article>
                <article class="card mt-4 col-lg-4 col-md-6 col-12">
                    <div class="mt-3">
                        <i class="bi-cash iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Integración con medios de pago</h3>
                        <p class="card-text mt-4">
                            Integrá medios de pagó como MercadoPago, Ualá a tu tienda online y 
                            obtené los mejores beneficios para tus pagos.
                        </p>
                    </div>
                </article>
                <article class="card mt-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="mt-3">
                        <i class="bi-bag iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Diversos canales para vender</h3>
                        <p class="card-text mt-4">
                            Integrá tu tienda con redes sociales
                            y marketplaces y potenciá tus ventas.
                        </p>
                    </div>
                </article>
                <article class="card mt-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="mt-3">
                        <i class="bi-pencil iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Diseño profesional</h3>
                        <p class="card-text mt-4">
                            Ofrecemos más de 10 layouts totalmente personalizables para que tu tienda sea
                            única.
                        </p>
                    </div>
                </article>
                <article class="card mt-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="mt-3">
                        <i class="bi-infinity iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Sin límites de productos</h3>
                        <p class="card-text mt-4">
                            Agregá todos los productos que vos quieras, no hay límites de venta en tu sitio.
                        </p>
                    </div>
                </article>
                <article class="card mt-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="mt-3">
                        <i class="bi-megaphone iconos-funcionalidades"></i>
                    </div>
                    <div class="card-body px-4">
                        <h3 class="card-title color-txt">Estrategias de Marketing</h3>
                        <p class="card-text mt-4">
                            Aumentá el número de tus ventas mediante el uso de Google y redes sociales.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    </section>
    <Footer/>
</template>