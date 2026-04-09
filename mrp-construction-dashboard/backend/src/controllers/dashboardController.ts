import { Request, Response, NextFunction } from 'express';
import Material from '../models/Material';

export const getKPIs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find();
    const totalRequired = materials.reduce((sum, m) => sum + m.requiredQuantity, 0);
    const totalAvailable = materials.reduce((sum, m) => sum + m.availableQuantity, 0);
    const totalOrdered = materials.reduce((sum, m) => sum + m.orderedQuantity, 0);
    const totalShortage = materials.reduce(
      (sum, m) => sum + Math.max(0, m.requiredQuantity - m.availableQuantity),
      0
    );
    res.json({
      success: true,
      data: {
        totalRequired,
        totalAvailable,
        totalOrdered,
        totalShortage,
        materialCount: materials.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDemandVsAvailability = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find({}, 'name requiredQuantity availableQuantity unit');
    const data = materials.map((m) => ({
      name: m.name,
      required: m.requiredQuantity,
      available: m.availableQuantity,
      unit: m.unit,
    }));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getConsumption = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find({}, 'name requiredQuantity availableQuantity');
    const totalRequired = materials.reduce((sum, m) => sum + m.requiredQuantity, 0);
    const totalAvailable = materials.reduce((sum, m) => sum + m.availableQuantity, 0);
    const used = totalRequired - totalAvailable;
    const remaining = totalAvailable;
    const usedPercent = totalRequired > 0 ? Math.round((used / totalRequired) * 100) : 0;
    const remainingPercent = 100 - usedPercent;
    res.json({
      success: true,
      data: [
        { name: 'Used', value: usedPercent, quantity: used },
        { name: 'Remaining', value: remainingPercent, quantity: remaining },
      ],
    });
  } catch (error) {
    next(error);
  }
};

export const getCostAnalysis = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find({}, 'name unitCost requiredQuantity');
    const data = materials.map((m) => ({
      name: m.name,
      unitCost: m.unitCost,
      totalCost: m.unitCost * m.requiredQuantity,
    }));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProcurementStatus = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find(
      {},
      'name orderedQuantity deliveredQuantity status deliveryDate supplier'
    );
    const data = materials.map((m) => ({
      name: m.name,
      ordered: m.orderedQuantity,
      delivered: m.deliveredQuantity,
      progress:
        m.orderedQuantity > 0 ? Math.round((m.deliveredQuantity / m.orderedQuantity) * 100) : 0,
      status: m.status,
      deliveryDate: m.deliveryDate,
      supplier: m.supplier,
    }));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
