import { HealthStatusInput } from "./models/validations/health-status-schema";
import { HorseRepository } from "./horse.repository";

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
    return await this.repo.createHorse(horse);
  };

  updateHorse = async (id: string, horse: any) => {
    return await this.repo.updateHorse(id, horse);
  };

  deleteHorse = async (id: string) => {
    await this.repo.deleteHorse(id);
  };

  healthCheck = async (id: string, healthStatusInput: HealthStatusInput) => {
    return await this.repo.healthCheck(id, healthStatusInput);
  };
}
