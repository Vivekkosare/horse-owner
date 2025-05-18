import { Schema, z } from "zod";

export const HealthStatusSchema = z.object({
  healthStatus: z.enum(["Healthy", "Injured", "Recovering", "Unknown"], {
    errorMap: () => ({
      message: "Health status must be Healthy, Injured, Recovering or Unknown",
    }),
  }),
});

export type HealthStatusInput = z.infer<typeof HealthStatusSchema>;
