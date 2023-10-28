import admin from "firebase-admin";

// initialise cloud firestore avant utilisation
let db = InitFirestore();

// initialise cloud firestore avant utilisation
export function InitFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert({
      /* Your Firestore admin data belongs here */
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
