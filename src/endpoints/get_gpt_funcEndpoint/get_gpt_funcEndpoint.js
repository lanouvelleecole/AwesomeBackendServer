import { _get_gpt_funcEndpoint } from "./pieces/_get_gpt_funcEndpoint/_get_gpt_funcEndpoint.js";

// crée un endpoint nommé get_gpt_func
// reachable via http://localhost:<apiPort>/get_gpt_func
export function get_gpt_funcEndpoint(app, stripe) {
  app.post("/get_gpt_func", async (req, res) => {
    try {
      // debugger;

      await _get_gpt_funcEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_gpt_func endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
