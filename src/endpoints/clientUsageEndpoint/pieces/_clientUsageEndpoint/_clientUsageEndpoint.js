import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";

export async function _clientUsageEndpoint(req, res, stripe) {
  const customerId = req.params.customer;

  if (!customerId) {
    res.status(400).send("The request URL misses the stripe customerId");

    return;
  }

  // récupère les données client liées a ce client d'API
  const customer = await GetFirestoreDocument({
    documentId: customerId,
    collectionName: "APICustomers",
  });

  // si ce client d'API n'existe pas dans notre base de données client,
  if (!customer) {
    // ...alors l'aventure s'arrête ici
    res
      .status(400)
      .send(
        "This stripe customerId is invalid/unknown. Please add a valid stripe customerId to the request url."
      );

    return;
  }

  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
  });

  res.send(invoice);
}
