import express from 'express'
const router = express.Router();
import { getLeagues } from '../controllers/leagueController.js';

router.route('/').get(getLeagues);


export default router