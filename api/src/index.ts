import "reflect-metadata";
import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import { dataSource } from "./db";

dotenv.config();

const app = express();
app.use(express.json());  // MDW pour lire les fichiers json

app.use('/api', router);

const PORT = process.env.PORT ;

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Server is listenning on http://localhost:${PORT}/api`);
})