import { Request, Response, NextFunction } from 'express';
import Material from '../models/Material';

export const getAllMaterials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json({ success: true, data: materials, count: materials.length });
  } catch (error) {
    next(error);
  }
};

export const createMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const material = new Material(req.body);
    const saved = await material.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const updateMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Whitelist allowed fields to prevent NoSQL injection via operator keys
    const allowedFields = [
      'name', 'category', 'requiredQuantity', 'availableQuantity',
      'orderedQuantity', 'deliveredQuantity', 'unitCost', 'unit',
      'supplier', 'deliveryDate', 'status',
    ] as const;
    type AllowedField = typeof allowedFields[number];
    const sanitized = allowedFields.reduce<Partial<Record<AllowedField, unknown>>>(
      (acc, key) => {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          acc[key] = req.body[key];
        }
        return acc;
      },
      {}
    );
    const material = await Material.findByIdAndUpdate(req.params.id, sanitized, {
      new: true,
      runValidators: true,
    });
    if (!material) {
      res.status(404).json({ success: false, message: 'Material not found' });
      return;
    }
    res.json({ success: true, data: material });
  } catch (error) {
    next(error);
  }
};

export const deleteMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      res.status(404).json({ success: false, message: 'Material not found' });
      return;
    }
    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    next(error);
  }
};
