import { _translate_txtEndpoint } from "./pieces/_translate_txtEndpoint/_translate_txtEndpoint.js";

// crée un endpoint nommé translate_txt
// reachable via http://localhost:<apiPort>/translate_txt
export function translate_txtEndpoint(app, stripe) {
  app.post("/translate_txt", async (req, res) => {
    try {
      // debugger;

      await _translate_txtEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the translate_txt endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
