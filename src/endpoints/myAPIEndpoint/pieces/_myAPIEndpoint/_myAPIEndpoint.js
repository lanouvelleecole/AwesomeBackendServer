
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { UpdateAPIUsage } from "../UpdateAPIUsage/UpdateAPIUsage.js";

export async function _myAPIEndpoint(req, res) {
  // some hypothetical condition that needs to be true prior to doing anything
  const condition = true;

  // si cette condition est OK
  if (condition) {
    // Incrémente/Modifie les données d'utilsaton d'API
    // sur stripe/firebase/etc..., selon besoins.
    // implémente ta logique custom.
    // puis fournit un objet record
    // qui contient des données d'usage d'API,
    // que tu souhaites fournir au client
    const record = await UpdateAPIUsage(req);

    // avec l'aide des données de requête
    // fournies par le client,
    // fais le boulot que requiert cette API
    // le service que tu souhaites procurer au client
    // ca ce passe ici
    const outputData = await DoTheAPIWork(req);

    // retourne les données, le graal,
    // le caviar kush, ze précieux,
    // pour le client.
    // accompagnées des données d'utilisation d'API
    res.status(200).send({ data: outputData, usage: record });

    return;

  }

  // autrement, stop the adventure here...
  else {
    res
      .status(403)
      .send(
        "The required condition is not met. Sorry buddy"
      );

    return;
  }
}
