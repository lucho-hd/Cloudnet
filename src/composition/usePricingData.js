import { ref } from "vue";
import { getPricingById } from "../services/pricing";

/**
 * 
 * @param {string} id 
 * @return {pricing: Ref<UnwrapRef<{name: string|null, price: number|null, description: string|null, id: string|null, proceeds: array|null}>>}
 */
export function usePricingData(id) {
    const pricing = ref({
        id: null,
        name: null,
        price: null,
        description: null,
        proceeds: null,
    });

    loadPricing(id);
    
    async function loadPricing(id) {
        try {
            const pricingData = await getPricingById(id);
            pricing.value = {
                id: pricingData.id,
                name: pricingData.name,
                price: pricingData.price,
                description: pricingData.description,
                proceeds: pricingData.proceeds,
            };    
        } catch(err) {
            console.error("[usePricing.js loadPricing]", err)
        }
    }

    return {
        pricing,
    }
}