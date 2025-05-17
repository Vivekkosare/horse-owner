import { db } from "../config/firebase";
import { Horse } from "../models/horse";

const horsesCollection = db.collection("horses");

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
      query = query.where("breed", "==", breed);
    }
    if (healthStatus) {
      query = query.where("healthStatus", "==", healthStatus);
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
    const newHorseRef = horsesCollection.doc();
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
}
