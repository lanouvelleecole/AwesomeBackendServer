import 'dotenv/config'

import express from "express";
import stripe from "stripe";

import { FormatRequestBodies } from "./src/services/FormatRequestBodies/FormatRequestBodies.js";
import { myAPIEndpoint } from "./src/endpoints/myAPIEndpoint/myAPIEndpoint.js";
import { checkoutEndpoint } from "./src/endpoints/checkoutEndpoint/checkoutEndpoint.js";
import { webhookEndpoint } from "./src/endpoints/webhookEndpoint/webhookEndpoint.js";
import { clientUsageEndpoint } from "./src/endpoints/clientUsageEndpoint/clientUsageEndpoint.js";

import { startServer } from "./src/services/StartServer/StartServer.js";


/* PLOP_INJECT_IMPORT */
import { AppStrings } from "./src/stringRepos/AppStrings/AppStrings.js";
import { InitCloudinary } from './src/services/UploadFileToCloudinary/InitCloudinary.js';
import { Constants } from './src/AppConstants/Constants.js';

/**
 * OYé OYé CITOYENS !!
 *
 * Cette humble API nommée maslow-gpt-api,
 * à été construite avec l'aide de:
 *
 * https://www.youtube.com/watch?v=MbqSMgMAzxU
 *
 */

// le port sur lequel notre API fonctionne
export const apiPort = 8080;

// permet de créer des endpoints
// pour notre sainte API
export const app = express();


// le secret key du compte stripe, dispo sections
// developers du dashboard stripe
// https://dashboard.stripe.com/test/apikeys
const stripe_secret_key = "<STRIPE_SECRET_KEY>";

// initialse l'instance de stripe,
// nécessaire pour pouvoir effectuer des requetes payantes
const stripeInstance = new stripe(stripe_secret_key);

// init de strings intl
AppStrings();

// serve des fichiers html, for ze world
app.use(express.static('public'));

/** 
 * Uncomment this code if you want to use Cloudinary 
 *
InitCloudinary({
  cloud_name: Constants.cloudinary_cloud_name,
  api_key: Constants.cloudinary_api_key,
  api_secret: Constants.cloudinary_api_secret
});
*/

/**
 * Uncomment this code if you want to monetize your server
 * 
 * To handle webhooks safely,
 * we need to verify the webhook signature to guarantee that it actually came from Stripe.
 * 
 * The webhook requires the request body,
 * as a raw buffer,
 * which we can format with some express middleware.
FormatRequestBodies(app, express);
*/


/** 
 * THIS SANDWICH CONTAINS ALL THE API ENDPOINTS 
 * YOU HAVE CREATED SO FAR. 
 * 
 * THIS IS TOP BREAD 
 **/

/* PLOP_INJECT_ENDPOINT_INIT */

/** 
 * THIS SANDWICH CONTAINS ALL THE API ENDPOINTS 
 * YOU HAVE CREATED SO FAR. 
 * 
 * THIS IS BOTTOM BREAD 
 **/

/** 
 * THIS SANDWICH CONTAINS ALL THE API ENDPOINTS 
 * RELATED TO API MONETIZATION. 
 * 
 * Uncomment the 
 * 
 * checkoutEndpoint, 
 * webhookEndpoint,
 * clientUsageEndpoint
 * 
 * endpoints if you want to monetize your server
 * 
 * THIS IS TOP BREAD 
 **/

// crée un endpoint de type POST, pour paiements Stripe,
// ceci permet aux users
// de souscrire à notre API, puis de recevoir 
// un email de confirmation via le webhookEndpoint
// reachable via http://localhost:<apiPort>/checkout
//checkoutEndpoint(app, stripeInstance);

// un webhook est un endpoint dans notre API,
// qui recoit des données venant de stripe,
// quand shit is going down (important events and such)
// pour tester le webhook, suis ces instructions:
// https://stripe.com/docs/stripe-cli
// ce webhook sert, entre autres,
// a recupérer les données d'abonnés tout juste abonnés.
// ici s'implémente de quoi fournir à l'user sa clé API
// (via email/phone)
//webhookEndpoint(app, stripeInstance);

// un endpoint qui permet de savoir
// combien le client à utilisé l'API
// GET http://localhost:<apiPort>/usage/cus_ID
//clientUsageEndpoint(app, stripeInstance);

/** 
 * THIS SANDWICH CONTAINS ALL THE API ENDPOINTS 
 * RELATED TO API MONETIZATION. 
 * 
 * THIS IS BOTTOM BREAD 
 **/

// this is a dummy GET API endpoint for testing purposes.
// crée un endpoint nommé myAPI (GET)
// reachable via GET http://localhost:<apiPort>/myAPI
// delete or comment this myAPIEndpoint(app, stripeInstance); line when in production 
myAPIEndpoint(app, stripeInstance);

// exécute l'appli express
startServer(app);
