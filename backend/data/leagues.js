import mongoose from "mongoose";

const leagues = [
    {
        name: 'The Wyld Stallions',
        location: {
            address: '107 Shavano Park',
            city: 'Shavano Park',
            state: 'Texas',
            postalCode: '78231',
            country: 'United States'
        },
        price: 4500
    },
    {
        name: 'Team Zoidberg',
        location: {
            address: '8355 Royal Turf Cir',
            city: 'Boerne',
            state: 'Texas',
            postalCode: '78015',
            country: 'United States'
        },
        price: 6000
    },
    {
        name: 'The Zoomers',
        location: {
            address: '13330 Kyle Seale Pkwy Lane',
            city: 'San Antonio',
            state: 'Texas',
            postalCode: '78249',
            country: 'United States'
        },
        price: 1500
    },
    {
        name: 'North Horseburg Little League',
        location: {
            address: '13380 Pecan Glade',
            city: 'San Antonio',
            state: 'Texas',
            postalCode: '78249',
            country: 'United States'
        },
        price: 3500
    },
    {
        name: 'The Duloc Ogres',
        location: {
            address: '7558 Bluestone Rd',
            city: 'San Antonio',
            state: 'Texas',
            postalCode: '78249',
            country: 'United States'
        },
        price: 4500
    },

];

export default leagues

