import admin from "firebase-admin";

// initialise cloud firestore avant utilisation
let db = InitFirestore();

// initialise cloud firestore avant utilisation
export function InitFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "maslow-2234d",
      private_key_id: "dd37c273b03a71bc0fd213870ff5651f6a57def5",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCk0xUX9ha6a1KM\n2tVt97LiZxdekHsOC4sH+esKL2pPXxiUTlP6VsE2to1VhFNkl/7R5dOaCx8l74Bm\nGxOYPifq7Wo9neQf0nIehFm6MoFYVdzPa7EsR/f488Tv6jUof+pJJpOpGHZ0E90E\n9zdmw0zfE57iEwt7ZNywWNg/3ehzfaeAB0vRGNVMDS/7bCfcOqkEa0rOYnP+TPEH\nkGeSv1zfUoooSKoLb+KI4X7+NkPcdyo0vXkDhVBXXc34kvpFKX13ElrOlGvQ7j6S\nb8RV1T0Blx2kE1gtSYqtIxi1VogXLHo8hS98SczyG194xmcUMnBfqGimKjMTgeCK\nS6i6bA/VAgMBAAECggEAD5wu172b9Rzb98YenOhu0zK99lv1o49j+VCUj5A3tSZa\n/r9qWapkvdNNOxJUuZFhoKxvvXDx4BcOOzKznja+HhRNJw0bQV5I0OtqT2WgIBHF\ntLP3gYDxaG0MiPJOsDQT0si/XFjvmFpsk3SnFRRIZVTc4Slk7CinHrZ+CJJyL5nJ\ny2tiTqN/Pv4RW244nHyEhadcPxYdv4l4qTLIqTingDO4h4GgFv40cJQB2Dydp7nc\nCWHfJB0IRdOjRx+4oFxrkYEYiQjdbhVgQawEu/uABaesDar2oehP3eS5SWaOkybx\nyc/khawUSkxSs6Rhm2Y4E6ZUufwqWqI5XzTvJhNlkwKBgQDaYrtaSkBxxa+r5Zkg\nn87t8lgDVD6gNHa45PVJxRD4X7f6VqnG1K11GgAR3kM8EahZPrRnGB/wHQ0J/cdZ\nt9Z+OHu2zCbLq7NG8Gj/ltwCT7WBEDf6NMQ9Ks+fcfl871FFQCYW+y3YBmZ5MhHq\nI3r61vQIqs6qgpDnOkqa5Y9EswKBgQDBNq6wJVRxv3Z2KIaQwGfsD/vJmZhGdqTK\n+wNcmvwy34CvUg7CoeiKXlRvEukkm7gpeC41xM+npGhohaq7HgJfhR4Et2huH9lY\n6fBzui+06SX1o4I19jMVZNNMPwE7yBlBZZYmlHSrSjpzTPpKpPT9lenjbE+iUzOO\nfb0qAFbtVwKBgF7lVEAxz7sgieuKQ3X3u3WOP0yDCQuYgJZrd2Ls7SjgfxObIP8z\nX4RpHeqlyFWL3rmZE89QnmA6X3Yd/sgvqFcEuE2AfMM4AxkqUpXtugCPHnHM2GYz\nE6r4tWu1nRH69DfBXkvSLeOXNGQpq7swW7owOa6ieleBkPHJVK3mXtEdAoGASzOh\nYmXlLDC9RtgXKBf7WuINujXSEvrywR5Z/J1GM/bR+2sQ26hw/gohCuptXBZP47Qn\nKD5mJHXVPXlpLlNL0SnauTM5rkMvMXA8ao65KszkPWtaru4Yi+cmZrLPJBmJ2u5T\nNsjpcBIAFgiMEqmJwXmsAxyREjkYBAnkqohfTRkCgYB6isZCR7KVCv8/m3twojCU\nGdsV3fwZzrlqF8KYWwO9ZPh1HoOF/M6xSOdQN05Hi2BX2/P9chhJortQTdaqiv1Q\nc1XhwntFV8LoAVrxvAoHLE1FYyYPLjsJHoN+vMuxqVfPpwVw1fUPogKHqhsL32vq\nTXZlN4edom0VBjkxFwBArA==\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-g2xgk@maslow-2234d.iam.gserviceaccount.com",
      client_id: "107680692987931963043",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g2xgk%40maslow-2234d.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
  });

  const db = admin.firestore();

  return db;
}

// Create a document
export async function CreateFirestoreDocument({
  collectionName,
  documentData,
  documentId,
}) {
  try {
    if (!documentId) {
      console.log(`You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      console.log(`You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.set(documentData);
    console.log("Document created with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);

    return null;
  }
}

// Read a document by ID
export async function GetFirestoreDocument({ collectionName, documentId }) {
  try {
    if (!documentId) {
      console.log(`You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      console.log(`You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      console.log("Document data:", docSnapshot.data());

      return docSnapshot.data();
    } else {
      console.log("Document not found");

      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);

    return null;
  }
}

// Update a document by ID
export async function UpdateFirestoreDocument({
  collectionName,
  documentId,
  updateData,
}) {
  try {
    if (!documentId) {
      console.log(`You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      console.log(`You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.update(updateData);
    console.log("Document updated:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error updating document:", error);

    return null;
  }
}

// Delete a document by ID
export async function DeleteFirestoreDocument({ collectionName, documentId }) {
  try {
    if (!documentId) {
      console.log(`You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      console.log(`You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.delete();
    console.log("Document deleted:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error deleting document:", error);

    return null;
  }
}
