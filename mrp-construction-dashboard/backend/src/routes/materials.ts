import { Router } from 'express';
import {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from '../controllers/materialController';

const router = Router();

router.get('/', getAllMaterials);
router.post('/', createMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;
