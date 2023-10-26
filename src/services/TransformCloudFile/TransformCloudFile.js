import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import cloudinary from "cloudinary";


/**
 * This function is used to make Cloudinary transforms on an uploaded file
 * Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline
 * 
 * @param assetType - video, image, etc...
 * @param apiKey - API key used for authentication
 * @param transformations - A string of transformations to apply to the file
 * @param deliveryType - upload, etc...
 * @param onSuccess - A callback function that handles successful transformations
 * @param onError - A callback function that handles any errors that occur during transformations
 * @param publicId - l'id de fichier cloud
 * @param print - log or no
 * @param version - la version de fichier (optionnel)
 * @param fileExtension - l'extension du fichier uploadé (mp4, png, mp3, etc... extension sans point)
 * 
 * Crée une url de transform pour cet asset cloud.
 * 
 * Une url de format 
 * 
 * https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id_full_path>.<extension>
 * 
 * + d'infos ici:
 * 
 * https://cloudinary.com/documentation/transformation_reference#l_text
 * 
 * https://cloudinary.com/documentation/image_transformations#transformation_url_syntax
 * 
 * https://cloudinary.com/documentation/image_transformations
 * 
 * https://cloudinary.com/documentation/video_manipulation_and_delivery
 * 
 */
export async function TransformCloudFile({
    cloudName,
    publicId,
    apiKey,
    assetType,
    transformations,
    deliveryType = 'upload',
    onSuccess,
    onError,
    print = true,
    version,
    fileExtension
}) {
    try {
        // debugger;

        /* Array of Object transformations
        let result = await cloudinary.v2.url(publicId, {
            //type: deliveryType,
            resource_type: assetType,
            transformation: transformations,
        });
        */

        const versionOrNone = version ? '/' + version : "";

        let result = `https://res.cloudinary.com/${cloudName}/${assetType}/${deliveryType}/${transformations}${versionOrNone}/${publicId}.${fileExtension}`;

        RunIfPossible({ func: onSuccess, args: result });

        return result
    } catch (error) {
        RunIfPossible({ func: onError, args: error });

        return null
    }
}


