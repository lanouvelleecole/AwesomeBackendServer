import { _translate_objEndpoint } from "./pieces/_translate_objEndpoint/_translate_objEndpoint.js";

// crée un endpoint nommé translate_obj
// reachable via http://localhost:<apiPort>/translate_obj
export function translate_objEndpoint(app, stripe) {
  app.post("/translate_obj", async (req, res) => {
    try {
      // debugger;

      await _translate_objEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the translate_obj endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
