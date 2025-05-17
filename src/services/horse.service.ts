import { HorseRepository } from "../repositories/horse.repository";

export class HorseService {
  constructor(private repo = new HorseRepository()) {}

  getAllHorses = async (
    age?: number,
    breed?: string,
    healthStatus?: string
  ) => {
    const horses = await this.repo.getAllHorses(age, breed, healthStatus);
    return horses;
  };

  createHorse = async (horse: any) => {
    const newHorse = await this.repo.createHorse(horse);
    return newHorse;
  };

  updateHorse = async (id: string, horse: any) => {
    const updatedHorse = await this.repo.updateHorse(id, horse);
    return updatedHorse;
  };

  deleteHorse = async (id: string) => {
    await this.repo.deleteHorse(id);
  };
}
