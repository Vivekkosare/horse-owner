import { Router } from "express";
import { HorseController } from "./horse.controller";
import authorize from "../middlewares/rbac";
import type { Role } from "../middlewares/rbac";

//define the roles
const adminRole: Role[] = ["admin"];
const vetRole: Role[] = ["vet"];
const adminVetRole: Role[] = [...adminRole, ...vetRole];

const router = Router();
const horseController = new HorseController();

// Define the routes for horse management with authorization
router.get("/horses", authorize(adminVetRole), horseController.getAllHorses);
router.post("/horses", authorize(adminRole), horseController.createHorse);
router.put("/horses/:id", authorize(adminRole), horseController.updateHorse);
router.delete("/horses/:id", authorize(adminRole), horseController.deleteHorse);
router.patch(
  "/horses/:id/health",
  authorize(adminVetRole),
  horseController.healthCheck
);

export default router;
