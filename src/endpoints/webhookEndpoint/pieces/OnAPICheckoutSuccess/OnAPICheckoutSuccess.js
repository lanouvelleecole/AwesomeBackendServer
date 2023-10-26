import { CreateFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { generateAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { SendEmail } from "../../../../services/SendEmail/SendEmail.js";

// ceci fait le boulot
// qd une subscription fraiche vient d'etre effectuée
export async function OnAPICheckoutSuccess(data, stripe) {

  // a description of the checkoutSession object
  // https://stripe.com/docs/api/checkout/sessions/object
  const checkoutSession = data.object;

  const customerId = checkoutSession.customer;
  const customerEmail = checkoutSession.customer_email;
  const customerEmailDefault = checkoutSession.customer_details.email;
  const subscriptionId = checkoutSession.subscription;

  console.log(`email: ${customerEmail}, default email: ${customerEmailDefault}`)

  console.log(`💰 Customer ${customerId} subscribed to plan ${subscriptionId}`);

  // Get the subscription. The first item is the plan the user subscribed to.
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const itemId = subscription.items.data[0].id;


  // Generate API key, and hashed API key.
  // (hashed = encoded, so filthy hackers don't steal my customers too easily)
  const { apiKey, hashedAPIKey } = await generateAPIKey();

  console.log(`User's API Key: ${apiKey}`);
  console.log(`Hashed API Key: ${hashedAPIKey}`);

  // Store the hashed API key in your database.
  await CreateFirestoreDocument({
    documentId: customerId,
    collectionName: "APICustomers",
    documentData: { apikey: hashedAPIKey, itemId, active: true },
  });


  // store the customer id in your database
  await CreateFirestoreDocument({
    documentId: hashedAPIKey,
    collectionName: "APIKeys",
    documentData: { customerId },
  });

  await SendEmail({
    serverToken: "<PostmarkServerToken>",
    senderEmail: "<YOUR_PRIVATE_EMAIL>",
    receiverEmail: customerEmail ?? customerEmailDefault,
    subject: "maslow-gpt-api Subscription !",
    text: `
Hello, Citizen of the future,

Here's your powerful API Key:

${apiKey}

Please keep this API key secret.

Thank You Sir. You can achieve anything you put your mind to.

The maslow-gpt-api corporation.
`
  });

  return;

}
