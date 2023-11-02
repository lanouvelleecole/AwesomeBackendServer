import { Handle5KCreditsPurchase } from "./Handle5KCreditsPurchase.js";
import { HandleAPISubscription } from "./HandleAPISubscription.js";

/**
 * 
 * @param {*} data 
 * @param {*} stripe
 * 
 * @returns 
 * 
 * This allows us to handle API related transactions
 *
 */
export async function OnAPICheckoutSuccess(data, stripe) {

  // debugger;

  // This checkout session object contains 
  // the data generated after the successful checkout
  //
  // a description of the checkoutSession object
  // https://stripe.com/docs/api/checkout/sessions/object
  const checkoutSession = data.object;

  // This helps us identify what item the user just purchased.
  // This is set in the checkout endpoint, during the checkout link generation
  const itemId = checkoutSession.client_reference_id;

  if (itemId == "LifetimeAPISubscription") {
    // Handle a purchase of a lifetime API subscription + 5000 API Credits
    await HandleAPISubscription(checkoutSession, itemId);
  } else if (itemId == "Buy5000Credits") {
    // handle a purchase of 5000 API Credits
    await Handle5KCreditsPurchase(checkoutSession);
  } else {
    console.log(`Unknown stripe checkout: ${itemId}`);
  }



  return;

}


