import axios from 'axios';
import {
  Material,
  KPIData,
  DemandAvailabilityData,
  ConsumptionData,
  CostAnalysisData,
  ProcurementData,
  ApiResponse,
} from '../types';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

export const materialsApi = {
  getAll: () => api.get<ApiResponse<Material[]>>('/materials'),
  create: (data: Partial<Material>) => api.post<ApiResponse<Material>>('/materials', data),
  update: (id: string, data: Partial<Material>) =>
    api.put<ApiResponse<Material>>(`/materials/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/materials/${id}`),
};

export const dashboardApi = {
  getKPIs: () => api.get<ApiResponse<KPIData>>('/dashboard/kpis'),
  getDemandVsAvailability: () =>
    api.get<ApiResponse<DemandAvailabilityData[]>>('/dashboard/demand-vs-availability'),
  getConsumption: () => api.get<ApiResponse<ConsumptionData[]>>('/dashboard/consumption'),
  getCostAnalysis: () => api.get<ApiResponse<CostAnalysisData[]>>('/dashboard/cost-analysis'),
  getProcurementStatus: () =>
    api.get<ApiResponse<ProcurementData[]>>('/dashboard/procurement-status'),
};
