import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router();
import { getLeagues } from "../controllers/leagueController";

router.route('/').get(getLeagues);




export default router