import { error } from "console";
import { HorseService } from "../services/horse.service";
import { Request, RequestHandler, Response } from "express";
import { HorseSchema } from "../models/horse-schema";

export class HorseController {
  constructor(private service = new HorseService()) {}

  getAllHorses = async (req: Request, res: Response) => {
    try {
      const age = typeof req.query.age === "string" ? req.query.age : undefined;
      const breed =
        typeof req.query.breed === "string" ? req.query.breed : undefined;
      const healthStatus =
        typeof req.query.healthStatus === "string"
          ? req.query.healthStatus
          : undefined;

      const horses = await this.service.getAllHorses(age, breed, healthStatus);
      res.status(200).json(horses);
    } catch (error) {
      console.error("Error fetching horses:", error);

      res.status(500).json({
        message: "Error fetching horses",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  createHorse: RequestHandler = async (req: Request, res: Response) => {
    try {
      const parsedResult = HorseSchema.safeParse(req.body);
      if (!parsedResult.success) {
        res.status(400).json({ errors: parsedResult.error.errors });
      }
      const horse = parsedResult.data;
      const newHorse = await this.service.createHorse(horse);
      res.status(200).json(newHorse);
    } catch (error) {
      console.error("An error occurred while creating the horse:", error);

      res.status(500).json({
        message: "Error while creating horse",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  updateHorse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || id === "") {
        res.status(400).json({ message: "Horse Id is required" });
      }
      const parsedResult = HorseSchema.safeParse(req.body);
      if (!parsedResult.success) {
        res.status(400).json({ errors: parsedResult.error.errors });
      }
      const horse = parsedResult.data;

      const updatedHorse = await this.service.updateHorse(id, horse);
      res.status(200).json(updatedHorse);
    } catch (error) {
      console.error("An error occurred while updating the horse:", error);
      res.status(500).json({
        message: "Error updating horse",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  deleteHorse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || id === "") {
        res.status(400).json({ message: "Horse Id is required" });
      }
      res.status(204).json(await this.service.deleteHorse(id));
    } catch (error) {
      console.error("An error occurred while deleting the horse:", error);
      res.status(500).json({
        message: "Error deleting horse",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
