<script setup>
  import NavBar from "../components/NavBar.vue"; 
  import Footer from "../components/Footer.vue";

  import { ref, onMounted, inject } from "vue";
  import { getPricing }     from "../services/pricing";
  import { getAuth }        from "firebase/auth";
  import { useRouter }      from "vue-router";
  import { rentAPrice }     from "../services/pricing"; 

  const { feedback, clearMessage, setSuccessMessage, setErrorMessage } = inject('notification');

const loading = ref(true);
 const { pricing } = usePricing();
 const auth = getAuth();
 const router = useRouter(); 

  function usePricing(){
    const pricing = ref([]);
      
      onMounted(() => {
        getPricing( newPricing => {
            pricing.value = newPricing
            loading.value = false;
            });
        });

        return {
            pricing,
        };
    }

   
  const hiring = async (price) => {
    const user = auth.currentUser;
    if (user == null) {
      setErrorMessage({message: 'Por favor, inicia sesión para contratar un plan.'});
        router.push('/iniciar-sesion');
        return;
    }

    try {
      await rentAPrice(price, user.email, user.uid);
        setSuccessMessage({message: '¡El plan fue contratado exitosamente!'});
        console.log("¡El plan fue contratado exitosamente!.");
    } 
    catch (err) {
      setErrorMessage({message: 'Ocurrió un error inesperado al contratar el plan. Por favor, intenta de nuevo más tarde.'});
      console.log(err);
    }
  };
</script>

<template>
  <template v-if="loading">
    <div class="loader-container">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </template>
  <template v-else>
    <NavBar />
    <section class="container-fluid pricing my-4">
      <div class="text-center my-4">
        <h2>Elegí tu plan ideal sin impuestos extra</h2>
        <p class="subtitulo">Creá tu tienda gratis y potencía tu marca con las mejores herramientas.</p>
      </div>
      <div class="row justify-content-center">
        <article v-for="(shop, index) in pricing" :key="shop.id" class="card my-4 col-lg-3 col-md-6 col-12">
          <div class="card-body py-4 d-flex flex-column">
            <h3 class="card-title color-txt text-center">{{ shop.name }}</h3>
            <div class="card-text">
              <p class="card-text mt-4 text-center price">
                <span v-if="index == 0">{{ shop.price }}</span>
                <span v-else>${{ shop.price }}</span>
              </p>
              <p class="text-center my-4">{{ shop.description }}</p>
              <ul class="mt-3">
                <li v-for="(proceeds, pIndex) in shop.proceeds" :key="pIndex" class="mt-3">
                  {{ proceeds }}
                </li>
                <li v-if="index !== 0" class="mt-3">Incluye todos los beneficios del plan anterior</li>
              </ul>
            </div>
            <button @click="hiring(shop)">Crear tienda</button>
          </div>
        </article>
      </div>
    </section>
  <Footer />
</template></template>
