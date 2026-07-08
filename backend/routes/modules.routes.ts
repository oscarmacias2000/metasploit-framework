import { Router } from "express";
import {ModulesController} from "../src/controllers/modules.controller";

const router = Router();
const controller = new ModulesController();

router.get('/modules', controller.getModules);
router.get('/:id', controller.getModule);
router.post('/:id/execute', controller.executeModule);

export default router;