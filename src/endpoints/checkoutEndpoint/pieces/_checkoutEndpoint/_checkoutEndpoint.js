export async function _checkoutEndpoint(stripe, req, res) {

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
        price: "<STRIPE_ITEM_PRICE_ID>",
      },
    ],

    // l'url vers laquelle la page de paiement redirigera si
    // paiement successful
    success_url:
      "<API_URL>/success.html",

    // l'url vers laquelle la page de paiement redirigera si
    // paiement cancel/fail
    cancel_url: "<API_URL>/error.html",
  });


  // retourne a l'user les données permettant de souscrire
  // notamment l'url de paiement stripe
  res.send(session);
}
