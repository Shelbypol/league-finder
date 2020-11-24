import asyncHandler from 'express-async-handler'
import League from '../models/leagueModel.js'

// @desc    Fetch all Leagues
// @route   GET /api/leagues
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
    const leagues = await League.find({});
    res.json(leagues)
});

// @desc    Fetch single league
// @route   GET /api/leagues/:id
// @access  Public
const getLeagueById = asyncHandler(async (req, res) => {
    const league = await League.findById(req.params.id);

    if (league) {
        res.json(league)
    }else{
        res.status(404);
        throw new Error('League not found')
    }
});

// @desc    CREATE a league
// @route   POST /api/leagues
// @access  Public
const createLeague = asyncHandler(async (req, res) => {
    const product = new League({
        name: 'Name',
        price: 0,
        location: {
            address: 'Address',
            city: 'City',
            state: 'State',
            postalCode: 'Zip code',
            country: 'United States'
        }
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
});

// @desc    UPDATE league
// @route   PUT /api/leagues/:id
// @access  Public
const updateLeague = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        location: {
            address,
            city,
            postalCode,
            country,
        }
    } = req.body;

    const league = await League.findById(req.params.id);

    if(league){
        league.name = name;
        league.price = price;
        league.location.address = address;
        league.location.city = city;
        league.location.postalCode = postalCode;
        league.location.country = country;

        const updatedLeague = await league.save();
        res.json(updatedLeague)

    } else {
        res.status(404);
        throw new Error('League not found')
    }

});


export { getLeagues, getLeagueById, createLeague, updateLeague }