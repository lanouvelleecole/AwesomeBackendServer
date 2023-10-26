// crée un endpoint de type POST, pour paiements,
// ceci permet aux users
// de souscrire à notre API

import { _checkoutEndpoint } from "./pieces/_checkoutEndpoint/_checkoutEndpoint.js";

// reachable via http://localhost:<apiPort>/checkout
export function checkoutEndpoint(app, stripe) {
  app.post("/checkout", async (req, res) => {
    // démarre le checkout (paiement via CB, via url de stripe)
    try {
      // debugger;

      await _checkoutEndpoint(stripe, req, res);

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
