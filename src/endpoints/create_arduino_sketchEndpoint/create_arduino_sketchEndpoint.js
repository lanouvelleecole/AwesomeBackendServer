import { _create_arduino_sketchEndpoint } from "./pieces/_create_arduino_sketchEndpoint/_create_arduino_sketchEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named create_arduino_sketch
// reachable via http://localhost:<apiPort>/create_arduino_sketch
export function create_arduino_sketchEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // if you want to upload a file 
  app.post("/create_arduino_sketch", /*upload.single("photo"),*/ async (req, res) => {
    try {
      //debugger;

      await _create_arduino_sketchEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the create_arduino_sketch endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
