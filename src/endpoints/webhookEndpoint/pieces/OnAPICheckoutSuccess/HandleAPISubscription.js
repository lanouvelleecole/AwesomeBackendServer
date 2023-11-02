import { CreateFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { generateAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { SendEmail } from "../../../../services/SendEmail/SendEmail.js";

/**
 *
 * @param {*} checkoutSession
 * @param {*} itemId
 *
 * @returns
 *
 */
export async function HandleAPISubscription(checkoutSession, itemId) {
    const customerId = checkoutSession.id;

    // this is the email address of htis customer
    // customerEmailFromCheckoutGeneration 
    // is the email address provided in the checkout endoint, 
    // during generation of the checkout link,
    // if provided.
    //
    // otherwise customerEmailFromCheckoutGeneration 
    // is the email provided in the stripe checkout page, 
    // by the user 
    const customerEmailFromCheckoutGeneration = checkoutSession.customer_email;
    const customerEmailFromCheckoutPage = checkoutSession.customer_details.email;
    const customerEmail = customerEmailFromCheckoutGeneration ?? customerEmailFromCheckoutPage;

    console.log(`Customer's email: ${customerEmail}`);
    console.log(`💰 Customer ${customerId} just bought this item: ${itemId}`);

    // Generate API key, and hashed API key.
    // (hashed = encoded, so filthy hackers don't steal my customers too easily)
    const { apiKey, hashedAPIKey } = await generateAPIKey();

    console.log(`User's API Key: ${apiKey}`);
    console.log(`User's Hashed API Key: ${hashedAPIKey}`);

    // Store the hashed API key in your database of users API Keys
    // so the user can do requests without missing API key errors
    await CreateFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIKeys",
        documentData: {
            // is the API key active or not ?
            // since the user is a real OG who paid his dues, 
            // then he's allowed in my (your ;-) kingdom
            active: true,

            // the hashed key value
            hashedAPIKey,

            // the email address of the beautfil customer
            customerEmail,

            // the type of API subscription the user purchased
            subscriptionType: itemId,

            // the API credits of this fresh user.
            // The fresh user gets 5000 credits 
            // to begin his/her creative journey
            APICredits: 5000,
        },
    });

    /*
    await SendEmail({
        serverToken: "<PostmarkServerToken>",
        senderEmail: "<YOUR_PRIVATE_EMAIL>",
        receiverEmail: customerEmail,
        subject: "maslow-gpt-api-v2 Subscription !",
        text: `
Hello, Citizen of the future,

Here's your powerful API Key:

${apiKey}

Please keep this API key secret.

Thank You Sir. You can achieve anything you put your mind to.

The maslow-gpt-api-v2 corporation.
`
    });
    */

    return;
}
