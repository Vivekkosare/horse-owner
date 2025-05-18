import { Router } from "express";
import { OwnerController } from "./owner.controller";
import authorize from "../middlewares/rbac";
import type { Role } from "../middlewares/rbac";

const router = Router();
const ownerController = new OwnerController();

// Define the roles for owner management
const adminRole: Role[] = ["admin"];
const vetRole: Role[] = ["vet"];
const adminVetRole: Role[] = [...adminRole, ...vetRole];

// Define the routes for owner management with authorization
router.get("/owners", authorize(adminVetRole), ownerController.getOwners);
router.get(
  "/owners/:id",
  authorize(adminVetRole),
  ownerController.getOwnerById
);
router.post("/owners", authorize(adminRole), ownerController.createOwner);
router.put("/owners/:id", authorize(adminRole), ownerController.updateOwner);
router.delete("/owners/:id", authorize(adminRole), ownerController.deleteOwner);

export default router;
