import { _get_gpt_outputEndpoint } from "./pieces/_get_gpt_outputEndpoint/_get_gpt_outputEndpoint.js";

// crée un endpoint nommé get_gpt_output
// reachable via http://localhost:<apiPort>/get_gpt_output
export function get_gpt_outputEndpoint(app, stripe) {
  app.post("/get_gpt_output", async (req, res) => {
    try {
      // debugger;

      await _get_gpt_outputEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_gpt_output endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
