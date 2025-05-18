import { Owner } from "./models/owner";
import { OwnerRepository } from "./owner.repository";

export class OwnerService {
  constructor(private ownerRepo = new OwnerRepository()) {}

  createOwner = async (owner: any) => {
    return await this.ownerRepo.createOwner(owner);
  };

  getOwners = async (name?: string, email?: string) => {
    return await this.ownerRepo.getOwners(name, email);
  };

  getOwnerById = async (id: string) => {
    return await this.ownerRepo.getOwnerById(id);
  };

  updateOwner = async (id: string, owner: any) => {
    return await this.ownerRepo.updateOwner(id, owner);
  };

  deleteOwner = async (id: string) => {
    return await this.ownerRepo.deleteOwner(id);
  };
}
