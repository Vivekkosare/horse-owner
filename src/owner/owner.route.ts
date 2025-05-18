import { Router } from "express";
import { OwnerController } from "./owner.controller";

const router = Router();
const ownerController = new OwnerController();

router.get("/owners", ownerController.getOwners);
router.get("/owners/:id", ownerController.getOwnerById);
router.post("/owners", ownerController.createOwner);
router.put("/owners/:id", ownerController.updateOwner);
router.delete("/owners/:id", ownerController.deleteOwner);

export default router;
