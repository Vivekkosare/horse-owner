import { messaging } from "firebase-admin";
import { OwnerSchema } from "./models/validations/owner-schema";
import { OwnerService } from "./owner.service";
import { Request, Response } from "express";
import { error } from "console";

export class OwnerController {
  private ownerService: OwnerService;

  constructor() {
    this.ownerService = new OwnerService();
  }

  getOwners = async (req: Request, res: Response) => {
    try {
      const name =
        typeof req.query.name === "string" ? req.query.name : undefined;
      const email =
        typeof req.query.email === "string" ? req.query.email : undefined;

      const owners = await this.ownerService.getOwners(name, email);
      res.status(200).json(owners);
    } catch (error) {
      console.log("An error occured while fetching owners: ", error);
      res.status(500).json({
        message: "Error fetching owners",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  getOwnerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || id === "") {
        res.status(400).json({ message: "Invalid Id" });
      }
      const owner = await this.ownerService.getOwnerById(id);
      res.status(200).json(owner);
    } catch (error) {
      console.log("An error occured while fetching owner by Id", error);
      res.status(500).json({
        message: "Error while fetching owner by id",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  createOwner = async (req: Request, res: Response) => {
    try {
      const parsedResult = OwnerSchema.safeParse(req.body);
      if (!parsedResult.success) {
        res.status(400).json({ errors: parsedResult.error.errors });
        return;
      }
      const owner = parsedResult.data;
      const newOwner = await this.ownerService.createOwner(owner);
      res.status(200).json(newOwner);
    } catch (error) {
      console.log("An error occured while adding owner: ", error);
      res.status(500).json({
        message: "Error while adding owner",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  updateOwner = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || id === "") {
        res.status(400).json({ message: "Invalid Id" });
        return;
      }
      const parsedResult = OwnerSchema.safeParse(req.body);
      if (!parsedResult.success) {
        res.status(400).json({ error: parsedResult.error.errors });
      }
      const owner = parsedResult.data;
      const updatedOwner = await this.ownerService.updateOwner(id, owner);
      res.status(200).json(updatedOwner);
    } catch (error) {
      console.log("An error occured while updating the owner: ", error);
      res.status(500).json({
        message: "Error while updating owner",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  deleteOwner = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || id === "") {
        res.status(400).json("Invalid Id");
      }
      res.status(204).json(await this.ownerService.deleteOwner(id));
    } catch (error) {
      console.log("An error occured while deleting owner :", error);
      res.status(500).json({
        message: "Error while deleting owner",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
