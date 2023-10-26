import { _compile_arduino_sketchEndpoint } from "./pieces/_compile_arduino_sketchEndpoint/_compile_arduino_sketchEndpoint.js";
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// !!! Remove this if your request doesn't upload data to the server
//const upload = SetupMulter();

// Create an endpoint named compile_arduino_sketch
// reachable via http://localhost:<apiPort>/compile_arduino_sketch
export function compile_arduino_sketchEndpoint(app, stripe) {
  // !!! REMOVE the 'upload.single("photo"),' portion
  // from your code, if your request doesn't upload data to the server
  app.post("/compile_arduino_sketch", async (req, res) => {
    try {


      await _compile_arduino_sketchEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the compile_arduino_sketch endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
