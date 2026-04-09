import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Grid, Typography, AppBar, Toolbar, Alert, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GiCrane } from 'react-icons/gi';
import KPICards from './KPICards';
import DemandChart from './DemandChart';
import ConsumptionChart from './ConsumptionChart';
import CostAnalysisChart from './CostAnalysisChart';
import ProcurementStatus from './ProcurementStatus';
import MaterialsTable from './MaterialsTable';
import { dashboardApi, materialsApi } from '../services/api';
import {
  KPIData,
  DemandAvailabilityData,
  ConsumptionData,
  CostAnalysisData,
  ProcurementData,
  Material,
} from '../types';

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [demand, setDemand] = useState<DemandAvailabilityData[]>([]);
  const [consumption, setConsumption] = useState<ConsumptionData[]>([]);
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysisData[]>([]);
  const [procurement, setProcurement] = useState<ProcurementData[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [kpiRes, demandRes, consumptionRes, costRes, procRes, matRes] = await Promise.all([
        dashboardApi.getKPIs(),
        dashboardApi.getDemandVsAvailability(),
        dashboardApi.getConsumption(),
        dashboardApi.getCostAnalysis(),
        dashboardApi.getProcurementStatus(),
        materialsApi.getAll(),
      ]);
      setKpis(kpiRes.data.data);
      setDemand(demandRes.data.data);
      setConsumption(consumptionRes.data.data);
      setCostAnalysis(costRes.data.data);
      setProcurement(procRes.data.data);
      setMaterials(matRes.data.data);
    } catch (err) {
      setError('Unable to connect to the API server. Showing demo data.');
      loadDemoData();
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDemoData = () => {
    setKpis({
      totalRequired: 280000,
      totalAvailable: 171000,
      totalOrdered: 90000,
      totalShortage: 109000,
      materialCount: 5,
    });
    setDemand([
      { name: 'Cement', required: 50000, available: 30000, unit: 'bags' },
      { name: 'Steel', required: 10000, available: 6000, unit: 'kg' },
      { name: 'Sand', required: 80000, available: 50000, unit: 'm³' },
      { name: 'Bricks', required: 100000, available: 60000, unit: 'units' },
      { name: 'Aggregate', required: 40000, available: 25000, unit: 'tons' },
    ]);
    setConsumption([
      { name: 'Used', value: 39, quantity: 109000 },
      { name: 'Remaining', value: 61, quantity: 171000 },
    ]);
    setCostAnalysis([
      { name: 'Cement', unitCost: 8.5, totalCost: 425000 },
      { name: 'Steel', unitCost: 75, totalCost: 750000 },
      { name: 'Sand', unitCost: 2.5, totalCost: 200000 },
      { name: 'Bricks', unitCost: 0.45, totalCost: 45000 },
      { name: 'Aggregate', unitCost: 12, totalCost: 480000 },
    ]);
    setProcurement([
      { name: 'Cement', ordered: 15000, delivered: 8000, progress: 53, status: 'Partial', deliveryDate: '2024-03-15', supplier: 'BuildRight Supplies' },
      { name: 'Steel', ordered: 3000, delivered: 1500, progress: 50, status: 'Partial', deliveryDate: '2024-03-20', supplier: 'MetalPro Industries' },
      { name: 'Sand', ordered: 25000, delivered: 25000, progress: 100, status: 'Complete', deliveryDate: '2024-03-10', supplier: 'Quarry Masters' },
      { name: 'Bricks', ordered: 35000, delivered: 15000, progress: 43, status: 'Pending', deliveryDate: '2024-04-01', supplier: 'RedClay Brickworks' },
      { name: 'Aggregate', ordered: 12000, delivered: 5000, progress: 42, status: 'Partial', deliveryDate: '2024-03-25', supplier: 'Quarry Masters' },
    ]);
    setMaterials([
      { _id: '1', name: 'Cement', category: 'Binding Material', requiredQuantity: 50000, availableQuantity: 30000, orderedQuantity: 15000, deliveredQuantity: 8000, unitCost: 8.5, unit: 'bags', supplier: 'BuildRight Supplies', deliveryDate: '2024-03-15', status: 'Partial', createdAt: '', updatedAt: '' },
      { _id: '2', name: 'Steel', category: 'Structural Material', requiredQuantity: 10000, availableQuantity: 6000, orderedQuantity: 3000, deliveredQuantity: 1500, unitCost: 75, unit: 'kg', supplier: 'MetalPro Industries', deliveryDate: '2024-03-20', status: 'Partial', createdAt: '', updatedAt: '' },
      { _id: '3', name: 'Sand', category: 'Aggregate', requiredQuantity: 80000, availableQuantity: 50000, orderedQuantity: 25000, deliveredQuantity: 25000, unitCost: 2.5, unit: 'm³', supplier: 'Quarry Masters', deliveryDate: '2024-03-10', status: 'Complete', createdAt: '', updatedAt: '' },
      { _id: '4', name: 'Bricks', category: 'Masonry', requiredQuantity: 100000, availableQuantity: 60000, orderedQuantity: 35000, deliveredQuantity: 15000, unitCost: 0.45, unit: 'units', supplier: 'RedClay Brickworks', deliveryDate: '2024-04-01', status: 'Pending', createdAt: '', updatedAt: '' },
      { _id: '5', name: 'Aggregate', category: 'Aggregate', requiredQuantity: 40000, availableQuantity: 25000, orderedQuantity: 12000, deliveredQuantity: 5000, unitCost: 12, unit: 'tons', supplier: 'Quarry Masters', deliveryDate: '2024-03-25', status: 'Partial', createdAt: '', updatedAt: '' },
    ]);
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <AppBar position="sticky" sx={{ backgroundColor: '#1976D2', boxShadow: 2 }}>
        <Toolbar>
          <GiCrane size={32} color="white" />
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={700} color="white" lineHeight={1.2}>
              Material Requirement Planning Dashboard
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">
              Construction Project Management System
            </Typography>
          </Box>
          <Tooltip title="Refresh Data">
            <IconButton color="inherit" onClick={fetchAll} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <KPICards data={kpis} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={7}>
            <DemandChart data={demand} loading={loading} />
          </Grid>
          <Grid item xs={12} md={5}>
            <ConsumptionChart data={consumption} loading={loading} />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={5}>
            <CostAnalysisChart data={costAnalysis} loading={loading} />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProcurementStatus data={procurement} loading={loading} />
          </Grid>
        </Grid>

        <MaterialsTable data={materials} loading={loading} />
      </Container>
    </Box>
  );
};

export default Dashboard;
