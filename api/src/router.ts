import express from "express";
import { Response } from "express";
import repoControllers from "./repos/repos.controllers";
import langsController from "./langs/langs.controllers";

const router = express.Router();

router.use('/repos', repoControllers);
router.use('/langs', langsController);

router.get('/', (_, res: Response ) => {
  res.send("Hello world !");
})

export default router;