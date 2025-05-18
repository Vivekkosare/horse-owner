import { error } from "console";
import { db } from "../../config/firebase";
import { Owner } from "./models/owner";

const ownersCollection = db.collection("owners");

export class OwnerRepository {
  async createOwner(owner: Owner): Promise<Owner> {
    //check and throw error if owner already exists
    const existingOwner = await ownersCollection
      .where("name", "==", owner.name)
      .where("email", "==", owner.email)
      .get();
    if (!existingOwner.empty) {
      throw new Error("Owner already exists");
    }

    //create a new document reference with random id
    const newOwnerRef = ownersCollection.doc();
    //copy data into new owner object
    const newOwner = {
      ...owner,
      createdAt: new Date(),
      id: newOwnerRef.id,
    };

    //save in db
    await newOwnerRef.set(newOwner);
    return newOwner;
  }

  async getOwners(name?: string, email?: string): Promise<Owner[]> {
    let query = ownersCollection as FirebaseFirestore.Query;
    if (name) {
      query = query
        .where("name", ">=", name)
        .where("name", "<=", name + "\uf8ff");
    }
    if (email) {
      query = query
        .where("email", ">=", email)
        .where("email", "<=", email + "\uf8ff");
    }
    const ownersSnap = await query.get();
    const owners: Owner[] = ownersSnap.docs.map((doc) => {
      const owner = doc.data() as Owner;
      return { ...owner, id: doc.id };
    });
    return owners;
  }

  async getOwnerById(id: string): Promise<Owner> {
    const ownerRef = ownersCollection.doc(id);

    const ownerSnap = await ownerRef.get();
    if (!ownerSnap.exists) {
      throw new Error(`Owner does not exist with id: ${id}`);
    }
    const ownerData = ownerSnap.data() as Owner;
    return {
      ...ownerData,
      id: id,
    };
  }

  async updateOwner(id: string, owner: Owner): Promise<Owner> {
    const ownerRef = ownersCollection.doc(id);

    const ownerSnap = await ownerRef.get();
    if (!ownerSnap.exists) {
      throw new Error("Owner does not exist");
    }

    //exclude fields id, createdAt that don't need update
    //copy owner into ownerData
    const { id: _, createdAt, ...ownerData } = owner;
    const updatedData = {
      ...ownerData,
      updatedAt: new Date(),
    };
    //save updated owner
    await ownerRef.update(updatedData);

    //fetch the updated document from db
    const updatedSnap = await ownerRef.get();
    const updatedOwner = updatedSnap.data() as Owner;
    return {
      ...updatedOwner,
      id: updatedSnap.id,
    };
  }

  async deleteOwner(id: string): Promise<void> {
    const ownerRef = ownersCollection.doc(id);
    const ownerSnap = await ownerRef.get();

    if (!ownerSnap.exists) {
      throw new Error("Owner does not exist");
    }
    await ownerRef.delete(ownerSnap);
  }
}
