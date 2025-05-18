import { z } from "zod";

export const HorseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age is required").max(30, "Age must be less than 30"),
  breed: z.string().min(1, "Breed is required"),
  healthStatus: z.enum(["Healthy", "Injured", "Recovering", "Unknown"], {
    errorMap: () => ({
      message: "Health status must be Healthy, Injured, Recovering or Unknown",
    }),
  }),
  owner: z.string().min(1, "Owner is required"),
});
