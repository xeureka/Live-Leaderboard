import { addScore, fetchTopPlayers, fetchOnePlayer } from '../controllers/game.controller';
import express from 'express';

const router = express.Router();

router.post('/addscore', addScore);
router.get('/topplayers', fetchTopPlayers);
router.post('/me', fetchOnePlayer);

export default router;
