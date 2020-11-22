import mongoose from "mongoose";

const leagues = [
    {
        name: 'League 1',
        location: {
            address: '123 Lane',
            city: 'San Antonio',
            postalCode: '78249',
            country: 'United States'
        },
        price: 1000
    },
    {
        name: 'League 2',
        location: {
            address: '456 Lane',
            city: 'San Antonio',
            postalCode: '78249',
            country: 'United States'
        },
        price: 2000
    },
    {
        name: 'League 3',
        location: {
            address: '789 Lane',
            city: 'San Antonio',
            postalCode: '78249',
            country: 'United States'
        },
        price: 3000
    },

];

export default leagues

