/* eslint-disable no-case-declarations */
// un webhook est un endpoint dans notre API,
// qui recoit des données venant de stripe,
// quand shit is going down (important events and such)
// pour tester le webhook, suis ces instructions:

import { _webhookEndpoint } from "./pieces/_webhookEndpoint/_webhookEndpoint.js";

// https://stripe.com/docs/stripe-cli
export function webhookEndpoint(app, stripe) {
  app.post("/webhook", async (req, res) => {
    try {
      await _webhookEndpoint(req, res, stripe);
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to set up the Stripe webhook mechanism: " +
            JSON.stringify(error, null, 2)
        );
    }
  });
}
