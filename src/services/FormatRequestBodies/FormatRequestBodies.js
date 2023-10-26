import bodyParser from "body-parser";

// To handle webhooks safely,
// we need to verify the webhook signature to guarantee that it actually came from Stripe.
// The webhook requires the request body,
// as a raw buffer,
// which we can format with some express middleware.
export function FormatRequestBodies(app, express) {
  app.use(
    express.json({
      verify: (req, res, buffer) => (req["rawBody"] = buffer),
    })
  );
  app.use(express.urlencoded({ extended: true }));
}
