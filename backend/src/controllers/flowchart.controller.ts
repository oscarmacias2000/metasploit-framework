// backend/src/controllers/flowchart.controller.ts
import { Request, Response } from 'express';
import { FlowchartService } from '../services/flowchart.service';

export class FlowchartController {
  private service: FlowchartService;

  constructor() {
    this.service = new FlowchartService();
  }

  public getFlowchart = (req: Request, res: Response): void => {
    try {
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  public getSteps = (req: Request, res: Response): void => {
    try {
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        data: data.steps
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  public goToStep = (req: Request, res: Response): void => {
    try {
      const stepId = parseInt(req.params.id);
      this.service.goToStep(stepId);
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  public nextStep = (req: Request, res: Response): void => {
    try {
      this.service.nextStep();
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  public previousStep = (req: Request, res: Response): void => {
    try {
      this.service.previousStep();
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  public getStatus = (req: Request, res: Response): void => {
    try {
      const data = this.service.getCurrentState();
      res.json({
        success: true,
        currentStep: data.currentStep,
        totalSteps: data.steps.length,
        progress: ((data.currentStep + 1) / data.steps.length) * 100
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };
}