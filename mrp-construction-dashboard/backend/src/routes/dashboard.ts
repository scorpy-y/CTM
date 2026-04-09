import { Router } from 'express';
import {
  getKPIs,
  getDemandVsAvailability,
  getConsumption,
  getCostAnalysis,
  getProcurementStatus,
} from '../controllers/dashboardController';

const router = Router();

router.get('/kpis', getKPIs);
router.get('/demand-vs-availability', getDemandVsAvailability);
router.get('/consumption', getConsumption);
router.get('/cost-analysis', getCostAnalysis);
router.get('/procurement-status', getProcurementStatus);

export default router;
