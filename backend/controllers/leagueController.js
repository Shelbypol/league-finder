import asyncHandler from 'express-async-handler'
import League from "../models/leagueModel";


// @desc    Fetch all Leagues
// @route   GET /api/leagues
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
    const leagues = await League.find({});
    res.json(leagues)
});


export { getLeagues }