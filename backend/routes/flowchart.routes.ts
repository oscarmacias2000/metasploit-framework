import { Router } from "express";
import { FlowchartController } from "../src/controllers/flowchart.controller";

const router = Router();
const controller = new FlowchartController();

router.get('/', controller.getFlowchart);
router.get('/steps', controller.getSteps);
router.post('/step/:id', controller.goToStep)
router.post('/next', controller.nextStep);
router.post('/previous', controller.previousStep);
router.get('/status', controller.getStatus);

export default router;