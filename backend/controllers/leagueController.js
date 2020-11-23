import asyncHandler from 'express-async-handler'
import League from '../models/leagueModel.js'


// @desc    Fetch all Leagues
// @route   GET /api/leagues
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
    const leagues = await League.find({});
    res.json(leagues)
});

// @desc    CREATE a league
// @route   POST /api/league
// @access  Public
const createLeague = asyncHandler(async (req, res) => {
    const league = new League({
        name: req.body.name,
        location: {
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country
        },
        price: req.body.price
    });

    const createdLeague = await league.save();
    res.status(201).json(createdLeague)
});


export { getLeagues, createLeague }