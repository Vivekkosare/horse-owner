export interface Horse {
  id: string;
  name: string;
  age: number;
  breed: string;
  healthStatus: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date | null;
}
