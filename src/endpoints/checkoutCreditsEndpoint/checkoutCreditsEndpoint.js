

import { _checkoutCreditsEndpoint } from "./pieces/_checkoutCreditsEndpoint/_checkoutCreditsEndpoint.js";

// reachable via http://localhost:<apiPort>/checkout
export function checkoutCreditsEndpoint(app, stripe, qtyCredits) {
  app.post(`/checkout${qtyCredits}`, async (req, res) => {
    // démarre le checkout (paiement via CB, via url de stripe)
    try {
      // debugger;

      await _checkoutCreditsEndpoint(stripe, req, res, qtyCredits);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occured while trying to create a checkout URL: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
