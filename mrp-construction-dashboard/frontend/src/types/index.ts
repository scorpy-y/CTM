export interface Material {
  _id: string;
  name: string;
  category: string;
  requiredQuantity: number;
  availableQuantity: number;
  orderedQuantity: number;
  deliveredQuantity: number;
  unitCost: number;
  unit: string;
  supplier: string;
  deliveryDate: string;
  status: 'Pending' | 'Partial' | 'Complete';
  createdAt: string;
  updatedAt: string;
}

export interface KPIData {
  totalRequired: number;
  totalAvailable: number;
  totalOrdered: number;
  totalShortage: number;
  materialCount: number;
}

export interface DemandAvailabilityData {
  name: string;
  required: number;
  available: number;
  unit: string;
}

export interface ConsumptionData {
  name: string;
  value: number;
  quantity: number;
}

export interface CostAnalysisData {
  name: string;
  unitCost: number;
  totalCost: number;
}

export interface ProcurementData {
  name: string;
  ordered: number;
  delivered: number;
  progress: number;
  status: 'Pending' | 'Partial' | 'Complete';
  deliveryDate: string;
  supplier: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}
