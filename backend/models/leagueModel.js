import mongoose from 'mongoose'

const leagueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode:{ type: String, required: true },
            country: { type: String, required: true }
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },

}, {
    timestamps: true
});

const League = mongoose.model('League', leagueSchema);

export default League