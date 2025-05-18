import { Router } from "express";
import { HorseController } from "./horse.controller";

const router = Router();
const horseController = new HorseController();

router.get("/horses", horseController.getAllHorses);
router.post("/horses", horseController.createHorse);
router.put("/horses/:id", horseController.updateHorse);
router.delete("/horses/:id", horseController.deleteHorse);
router.patch("/horses/:id/health", horseController.healthCheck);

export default router;
