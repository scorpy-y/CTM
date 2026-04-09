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
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
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
