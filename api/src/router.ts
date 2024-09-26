import express from "express";
import { Response } from "express";
import repoControllers from "./repos/repos.controllers";
import langsControllers from "./langs/langs.controllers";
import statusControllers from "./status/status.controllers";
import repoLangControllers from "./repoLang/repoLang.controllers";

const router = express.Router();

router.use('/repos', repoControllers);
router.use('/langs', langsControllers);
router.use('/status', statusControllers);
router.use('/repoLang', repoLangControllers);

router.get('/', (_, res: Response ) => {
  res.send("Hello world !");
})

export default router;