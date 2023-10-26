import { randomBytes } from "crypto";
import { createHash } from "crypto";
import { GetFirestoreDocument } from "../FirestoreCRUD/FirebaseCRUD.js";

// Génère une clé API
export async function generateAPIKey() {
  const apiKey = randomBytes(16).toString("hex");
  const hashedAPIKey = hashAPIKey(apiKey);

  // récupère le stripe customerId de ce client
  const customerIdData = await GetFirestoreDocument({
    documentId: hashedAPIKey,
    collectionName: "APIKeys",
  });

  // Ensure API key is unique
  if (customerIdData) {
    return generateAPIKey();
  } else {
    return { hashedAPIKey, apiKey };
  }
}

// Hash the API key
export function hashAPIKey(apiKey) {
  const hashedAPIKey = createHash("sha256").update(apiKey).digest("hex");

  return hashedAPIKey;
}
