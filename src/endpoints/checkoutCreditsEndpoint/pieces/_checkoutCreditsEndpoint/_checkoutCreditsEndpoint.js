import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";

export async function _checkoutCreditsEndpoint(stripe, req, res, qtyCredits) {
  // debugger;

  // la clé API présente dans l'URL de requête
  const { apiKey } = req.query;

  // si la clé API n'a pas été fournie dans l'URL de requête
  // l'aventure s'arrête ici. code 400, pas de clé API dispo
  if (!apiKey) {
    // retourne un bon vieux 4xx au client
    res
      .status(400)
      .send(
        "No API key was given, in the request url. Please subscribe to the API, copy the API key I will give you, and add this API key as a 'apiKey' query parameter, in the request url."
      );

    return;
  }

  // encode la clé API fournie par le client,
  // afin de la comparer a celle stockée dans
  // la base de données des clients de notre API
  const hashedAPIKey = hashAPIKey(apiKey);

  // get the API client data, from his Hashed API Key
  const APIClientData = await GetFirestoreDocument({
    documentId: hashedAPIKey,
    collectionName: "APIKeys",
  });



  // si cette clé API n'existe pas dans notre base de données client,
  if (!APIClientData) {
    // ...alors l'aventure s'arrête ici
    res
      .status(403)
      .send(
        "This API key is invalid/unknown. Please add a valid API key to the request url."
      );

    return;
  }

  // si l'user est inactif/desactivé/timed out...
  else if (!APIClientData.active) {
    // ...alors l'aventure s'arrête ici
    res.status(403).send("This API key is currently inactive/disabled.");

    return;
  } else {

    const { accessToken, idToken, firebase_uid, email, username, username_photo } = req.body;

    // more info here: 
    // https://stripe.com/docs/api/checkout/sessions/create?lang=node
    const session = await stripe.checkout.sessions.create({

      // the Stripe transaction type
      mode: "<STRIPE_TRANSACTION_TYPE>",

      // l'adresse email optionnelle de l'user
      customer_email: email,

      // the stripe payment type(s)
      payment_method_types: ["<STRIPE_PAYMENT_TYPE>"],

      line_items: [
        {
          // le price id du produit stripe,
          // dispo section products du dashboard stripe
          price: GetTopupPriceID(qtyCredits),

          // how much of it
          quantity: 1
        },
      ],

      // l'url vers laquelle la page de paiement redirigera si
      // paiement successful
      success_url:
        "<API_URL>/success.html",

      // l'url vers laquelle la page de paiement redirigera si
      // paiement cancel/fail
      cancel_url: "<API_URL>/error.html",

      // thanks to this param, you can differentiate 
      // between the different purchases the user can make, 
      // in the checkout success webhook
      client_reference_id: `Buy${qtyCredits}Credits`,

      // some additional data we need, for shizzle to go down
      metadata: {
        // the hashed api key of the user
        hashedAPIKey,
      }
    });


    // retourne a l'user les données permettant de souscrire
    // notamment l'url de paiement stripe
    res.send(session);
  }
}

/**
 * 
 * @param {*} qtyCredits 
 * 
 * @returns 
 */
function GetTopupPriceID(qtyCredits) {
  if (qtyCredits == 5000) {
    return "<STRIPE_ITEM_PRICE_ID>";
  } else {
    console.log(`Unknown API Credit topup qty: ${qtyCredits}`);
  }
}

