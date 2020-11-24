import express from 'express'
const router = express.Router();
import { getLeagues, createLeague, updateLeague } from '../controllers/leagueController.js';

router.route('/').get(getLeagues).post(createLeague);
router.route('/:id')
    .put(updateLeague);

export default router