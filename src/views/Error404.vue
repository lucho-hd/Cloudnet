<script setup>
    import NavBar from '../components/NavBar.vue';
    import Footer from '../components/Footer.vue';
</script>

<template>
    <NavBar/>
    <section class="row error404 container">
        <div class="col-lg-6">
            <h2>Lo sentimos, no encontramos el contenido que estás buscando</h2>
            <p>Por favor, revisá la dirección que escribiste o visitá nuestra <a href="">página de inicio.</a></p>
            <p>Si el problema persiste escribinos en nuestro <a href="">centro de ayuda.</a></p>
        </div>
        <div class="col-lg-6">
            <img src="img/404/error-404.jpg" alt="Error 404" class="img-fluid">
        </div>
    </section>
    <Footer/>
</template>
