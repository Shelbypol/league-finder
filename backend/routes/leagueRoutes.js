import express from 'express'
const router = express.Router();
import { getLeagues, createLeague, updateLeague, deleteLeague } from '../controllers/leagueController.js';

router.route('/').get(getLeagues).post(createLeague);
router.route('/:id')
    .put(updateLeague)
    .delete(deleteLeague);

export default router