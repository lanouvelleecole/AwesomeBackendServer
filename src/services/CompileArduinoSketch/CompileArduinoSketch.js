

// Import the required modules
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to compile the Arduino source code
/**
 * Compiles given Arduino (.ino) source code to .hex string.
 *
 * @param {String} code_string - The .ino source code that needs to be compiled.
 * @param {String} sketchName - The sketch's file/folder name
 * @param {String} inputFolder - The folder that will contain the .ino source code.
 * @param {String} outputFolder - The folder that will contain the compiled. files.
 * @param {Function} onSuccess - Callback that takes the generated .hex source code string as an argument.
 * @param {Function} onError - Callback that takes any eventual error during compilation as an argument.
 */
export async function CompileArduinoSketch({
    code_string,
    sketchName,
    inputsFolder,
    outputsFolder,
    onSuccess,
    onError
}) {
    try {

        // Create input and output directories
        fs.mkdirSync(inputsFolder, { recursive: true });



        fs.mkdirSync(outputsFolder, { recursive: true });



        const inputFolder = path.join(inputsFolder, sketchName);
        const outputFolder = path.join(outputsFolder, sketchName);

        // Run sketch new command with arduino-cli to create sketch folder
        const newSketchCommand = `arduino-cli sketch new ${inputFolder}`;
        exec(newSketchCommand, async (err) => {


            if (err) {
                onError(err);  // Handle the error in sketch creation
            } else {
                // Create a temporary .ino file with the provided source code in the sketch folder
                const inoFilePath = `${inputFolder}/${sketchName}.ino`;
                fs.writeFileSync(inoFilePath, code_string);



                // Define the Fully Qualified Board Name (FQBN) for your specific Arduino board
                const fqbn = 'arduino:avr:uno';

                // Run compile command with arduino-cli to compile the sketch
                const compileCommand = `arduino-cli compile --fqbn ${fqbn} --output-dir ${outputFolder} ${inoFilePath}`;
                exec(compileCommand, async (err, stdout) => {


                    if (err) {
                        onError(err); // Handle compilation errors
                    } else {
                        // Compiled .hex file path
                        const hexFilePath = `${outputFolder}/${sketchName}.ino.hex`;
                        const hexBootFilePath = `${outputFolder}/${sketchName}.ino.with_bootloader.hex`;

                        try {
                            // Read the compiled .hex file data
                            const hexFileData = fs.readFileSync(hexFilePath, 'utf8');
                            const hexBootFileData = fs.readFileSync(hexBootFilePath, 'utf8');


                            // Delete the input and output directories
                            fs.rmdirSync(inputFolder, { recursive: true, force: true }); // Delete the source code folder
                            fs.rmdirSync(outputFolder, { recursive: true, force: true }); // Delete the output files folder



                            // Call onSuccess callback with the .hex file data
                            onSuccess({
                                hex: hexFileData,
                                hex_with_bootloader: hexBootFileData
                            });
                        } catch (err) {
                            onError(err); // Handle file read/delete error
                        }
                    }
                });
            }
        });
    } catch (err) {


        // Handle any error that occurs while writing to the temporary .ino file or creating directories
        onError(err);
    }
}
