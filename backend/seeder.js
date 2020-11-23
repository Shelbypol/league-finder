import mongoose from 'mongoose'
import dotenv from 'dotenv'
import leagues from './data/leagues.js'
import League from "./models/leagueModel.js";
import connectDB from './config/db.js'

dotenv.config();

connectDB();

// IMPORT DATA
const importData = async () => {
    try {
        await League.deleteMany();

        const sampleLeagues = leagues.map(league => {
            return { ...league }
        });

        await League.insertMany(sampleLeagues);

        console.log('Data Imported!'.green);
        process.exit()

    }catch(error){
        console.log(`${error}`.red);
        process.exit(1)
    }
};

// DESTROY DATA
const destroyData = async () => {
    try {
        await League.deleteMany();

        console.log('Data Destroyed!'.red);
        process.exit()

    }catch(error){
        console.log(`${error}`.red);
        process.exit(1)
    }
};

//call it with 'node backend/seeder' or 'node backend/seeder -d' in terminal
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}