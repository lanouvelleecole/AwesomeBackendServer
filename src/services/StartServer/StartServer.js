import { apiPort } from "../../../index.js";

// exécute l'appli express
export function startServer(app) {
  app.listen(apiPort, () => {
    console.log(`Running on http://localhost:${apiPort}`);
  });
}
