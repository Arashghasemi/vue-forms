import { ShippingModel, BillingModel, CreditCardModel } from '@/models';
import { reactive} from 'vue'; // reactive makes the entire objectice reactive unlike ref
export default reactive({
    billing: new BillingModel(),
    shipping: new ShippingModel(),
    creditCard: new CreditCardModel(),
    error: ""
})