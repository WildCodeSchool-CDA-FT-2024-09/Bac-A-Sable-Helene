import express from 'express';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());  // MDW pour lire les fichiers json

app.use('/api', router);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server is listenning on http://localhost:${PORT}/api`);
})