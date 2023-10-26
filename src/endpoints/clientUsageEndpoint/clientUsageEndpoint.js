import { _clientUsageEndpoint } from "./pieces/_clientUsageEndpoint/_clientUsageEndpoint.js";

export function clientUsageEndpoint(app, stripe) {
  app.get("/usage/:customer", async (req, res) => {
    try {
      // debugger;

      await _clientUsageEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to get the API usage for this client: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
