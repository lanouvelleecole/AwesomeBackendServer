import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { UpdateAPIUsage } from "../UpdateAPIUsage/UpdateAPIUsage.js";

export async function _get_api_client_infoEndpoint(req, res, stripe) {

  // la clé API présente dans l'URL de requête
  const { apiKey } = req.query;

  // si la clé API n'a pas été fournie dans l'URL de requête
  // l'aventure s'arrête ici. code 400, pas de clé API dispo
  if (!apiKey) {
    // retourne un bon vieux 4xx au client
    res
      .status(400)
      .send(
        "No API key was given, in the request url. Please subscribe to the API, copy the API key I will give you, and add this API key as a 'apiKey' query parameter, in the request url."
      );

    return;
  }

  // encode la clé API fournie par le client,
  // afin de la comparer a celle stockée dans
  // la base de données des clients de notre API
  const hashedAPIKey = hashAPIKey(apiKey);

  // get the API client data, from his Hashed API Key
  const APIClientData = await GetFirestoreDocument({
    documentId: hashedAPIKey,
    collectionName: "APIKeys",
  });



  // si cette clé API n'existe pas dans notre base de données client,
  if (!APIClientData) {
    // ...alors l'aventure s'arrête ici
    res
      .status(403)
      .send(
        "This API key is invalid/unknown. Please add a valid API key to the request url."
      );

    return;
  }

  // autrement, si cette clé API est valide...
  else {
    // avec l'aide des données de requête
    // fournies par le client,
    // fais le boulot que requiert cette API
    // le service que tu souihaites procurer au client
    // ca ce passe ici
    //const outputData = await DoTheAPIWork(req);

    // Incrémente/Modifie les données d'utilsaton d'API
    // sur stripe/firebase/etc..., selon besoins.
    // implémente ta logique custom.
    // puis fournit un objet record
    // qui contient des données d'usage d'API,
    // que tu souhaites fournir au client
    //const record = await UpdateAPIUsage();

    // retourne les données, le graal,
    // le caviar kush, ze précieux,
    // pour le client.
    // accompagnées des données d'utilisation d'API
    res
      .status(200)
      .send({ answer: APIClientData, usage: null });

    return;
  }
}
