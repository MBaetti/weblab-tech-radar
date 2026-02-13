import { Router } from 'express';
import {
    createTechnology,
    getTechnologies,
    getTechnologyById,
    updateTechnology,
    deleteTechnology,
} from '../controllers/controller';

const router = Router();

router.get('/', getTechnologies);
router.get('/:id', getTechnologyById);
router.post('/', createTechnology);
router.put('/:id', updateTechnology);
router.delete('/:id', deleteTechnology);

export default router;