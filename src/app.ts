import express from "express";
import horseRoutes from "./features/horse/horse.route";
import ownerRoutes from "./features/owner/owner.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", horseRoutes);
app.use("/api/v1", ownerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
