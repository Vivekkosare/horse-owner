import { db } from "../../config/firebase";
import { Horse } from "./models/horse";
import { HealthStatusInput } from "./models/validations/health-status-schema";

const horsesCollection = db.collection("horses");
const ownersCollection = db.collection("owners");

export class HorseRepository {
  async getAllHorses(
    age?: number,
    breed?: string,
    healthStatus?: string
  ): Promise<Horse[]> {
    // Get all horses from the database
    let query = horsesCollection as FirebaseFirestore.Query;
    if (age) {
      query = query.where("age", "==", age);
    }
    if (breed) {
      query = query
        .where("breed", ">=", breed)
        .where("breed", "<=", breed + "\uf8ff");
    }
    if (healthStatus) {
      query = query
        .where("healthStatus", ">=", healthStatus)
        .where("healthStatus", "<=", healthStatus + "\uf8ff");
    }

    const snapshot = await query.get();
    const horses: Horse[] = snapshot.docs.map((doc) => {
      const horse = doc.data() as Horse;
      return {
        ...horse,
        id: doc.id,
      };
    });
    return horses;
  }

  async createHorse(horse: Horse): Promise<Horse> {
    // Check if the owner exists in the owners collection for this horse
    const owner = await ownersCollection.doc(horse.owner).get();
    if (!owner.exists) {
      throw new Error("Owner not found for this horse");
    }

    //check if horse already exists with same properties?
    const existingHorse = await horsesCollection
      .where("name", "==", horse.name)
      .where("age", "==", horse.age)
      .where("breed", "==", horse.breed)
      .where("owner", "==", horse.owner)
      .get();

    //throw error if exists
    if (!existingHorse.empty) {
      throw new Error("Horse already exists");
    }
    //create a document with random id
    const newHorseRef = horsesCollection.doc();
    //copy data into new horse object
    const newHorse = {
      ...horse,
      id: newHorseRef.id,
      createdAt: new Date(),
      updatedAt: null,
    };
    await newHorseRef.set(newHorse);
    return newHorse;
  }

  async updateHorse(id: string, horse: Horse): Promise<Horse> {
    // Create a reference to the horse document in the database based on id
    const horseRef = horsesCollection.doc(id);

    // Check if the horse exists in the database
    const horseSnap = await horseRef.get();
    if (!horseSnap.exists) {
      throw new Error("Horse not found");
    }

    const ownerSnap = await ownersCollection.doc(horse.owner).get();
    if (!ownerSnap.exists) {
      throw new Error("Owner not found for this horse");
    }

    // Exclude the 'id' property from the update object
    // and store the rest of the data from the horse object into horseData
    const { id: _, ...horseData } = horse;

    horseData.updatedAt = new Date();

    // Call update on the existing horse reference (horseRef)
    // with the horseData object
    await horseRef.update(horseData);

    // Create a new updatedHorse object by mapping horse data and
    // assigning the id
    const updatedHorse = {
      ...horse,
      id: id,
    };

    return updatedHorse;
  }

  async deleteHorse(id: string): Promise<void> {
    const horseRef = horsesCollection.doc(id);
    const horse = await horseRef.get();
    if (!horse.exists) {
      throw new Error("Horse not found");
    }
    await horseRef.delete();
  }

  async healthCheck(
    id: string,
    healthStatusInput: HealthStatusInput
  ): Promise<Horse> {
    const horseRef = horsesCollection.doc(id);

    //get horse snap and check if it exists
    const horseSnap = await horseRef.get();
    if (!horseSnap) {
      throw new Error("Horse not found");
    }

    //When found, patch update the healthStatus and updatedAt field
    await horseRef.update({
      healthStatus: healthStatusInput.healthStatus,
      updatedAt: new Date(),
    });

    //get updated horse and return as response
    const updatedHorseSnap = await horseRef.get();
    const updatedHorse = updatedHorseSnap.data() as Horse;
    return { ...updatedHorse, id: updatedHorseSnap.id };
  }
}
