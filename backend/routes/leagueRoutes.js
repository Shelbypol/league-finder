import express from 'express'
const router = express.Router();
import { getLeagues, createLeague, getLeagueById } from '../controllers/leagueController.js';

router.route('/').get(getLeagues).post(createLeague);


export default router