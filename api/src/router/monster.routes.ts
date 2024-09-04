import { Router } from 'express';
import { MonsterController } from '../controllers/monsters.controller';

const router = Router();

router.get('/', MonsterController.findAll);

export default router;
