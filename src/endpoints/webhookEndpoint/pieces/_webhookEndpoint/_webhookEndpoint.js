import { OnAPICheckoutSuccess } from '../OnAPICheckoutSuccess/OnAPICheckoutSuccess.js';

export async function _webhookEndpoint(req, res, stripe) {

  let data;
  let eventType;

  // Check if webhook signing is configured.
  const webhookSecret = "<webhookSecret>";

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req["rawBody"],
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  // les events disponibles chez stripe:
  // https://stripe.com/docs/api/events/types
  switch (eventType) {
    // l'user a fourni ses données bancaires,
    // et a souscrit a l'API.
    // (la carte de l'user n'a pas encore été débité)
    case "checkout.session.completed":
      // Data included in the event object:
      await OnAPICheckoutSuccess(data, stripe);

      break;

    // permet de connaitre le statut du compte stripe dee l'user
    // après le paiement par carte bancaire
    case "invoice.paid":
      break;

    // permet de connaitre le statut du compte stripe dee l'user
    // après un paiement par carte bancaire échoué
    case "invoice.payment_failed":
      break;
    default:
    // Unhandled event type
  }

  res.sendStatus(200);
}
