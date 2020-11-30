export function geocode(search) {
    const baseUrl = 'https://api.mapbox.com';
    const endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN)
        .then(function(res) {
            return res.json();
        }).then(function(data) {
            return data.features[0].center;
        });
}

export function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const lon1 = coords1[0];
    const lat1 = coords1[1];

    const lon2 = coords2[0];
    const lat2 = coords2[1];

    const R = 6371; // km

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    d /= 1.6093;
    console.log('d: ' + d);
    return d;
}


//==================================================================================

// const sponsorRequirements = () => {
//     sponsorCoords();
//     leagues.map((league) => {
//         leagueCoords(league);
//         if ((distance <= sponsorRadius) && (!availableRadiusLeagues.includes(league.name))) {
//             availableRadiusLeagues.push(league)
//         }
//     });
//     finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));
//
//     console.log('final');
//     console.log(finalLeagues);
//     console.log('budget');
//     console.log(availableBudgetLeagues);
//     console.log('radius');
//     console.log(availableRadiusLeagues);
// };
//
// // SPONSOR COORDS
// const sponsorCoords = () => {
//     const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;
//     geocode(sponsorStringAddress).then(function (results) {
//         setSponsorLat(results[1]);
//         setSponsorLon(results[0]);
//     });
// };
//
// // LEAGUE COORDS
// const leagueCoords = (league) => {
//     let leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;
//     geocode(leagueStringAddress).then(function (results) {
//         setLeagueLat(results[1]);
//         setLeagueLon(results[0]);
//         const radius = (
//             getDistance(
//                 {latitude: sponsorLat, longitude: sponsorLon},
//                 {latitude: leagueLat, longitude: leagueLon}
//             ) / 1609);
//         setDistance(radius);
//         calcDistance(sponsorLat, sponsorLon, leagueLat, leagueLon)
//     });
// };
//
// // DISTANCE
// const calcDistance = (sponsorLat, sponsorLon, leagueLat, leagueLon) => {
//     console.log('sponsor lat before: ' + sponsorLat);
//     console.log('league lat before' + leagueLat);
//     const radius = (
//         getDistance(
//             {latitude: sponsorLat, longitude: sponsorLon},
//             {latitude: leagueLat, longitude: leagueLon}
//         ) / 1609);
//     console.log('radius: ' + radius);
//     setDistance(radius);
//     console.log('state dist after: ' + distance);
//     // console.log(distance)
// };

// =======================   SPONSOR DISTANCE/BUDGET CALC     ==========================

//
// =======================   copy of SPONSOR DISTANCE/BUDGET CALC     ==========================

// const sponsorRequirements = () => {
//     let sponsorLatVar = 0;
//     let sponsorLonVar = 0;
//     let leagueLatVar = 0;
//     let leagueLonVar = 0;
//     let leagueStringAddress = '';
//
//     const sponsorStringAddress = sponsorAddress + ',' + sponsorCity + ',' + sponsorState + ',' + sponsorPostal + ',' + sponsorCountry;
//
//     geocode(sponsorStringAddress).then(function (results) {
//         sponsorLatVar = results[1];
//         sponsorLonVar = results[0];
//
//         leagues.map(league => {
//
//             leagueStringAddress = league.location.address + ',' + league.location.city + ',' + league.location.state + ',' + league.location.postalCode + ',' + league.location.country;
//
//             geocode(leagueStringAddress).then(function (results) {
//                 leagueLatVar = results[1];
//                 leagueLonVar = results[0];
//
//                 const distance = (
//                     getDistance(
//                         {latitude: sponsorLatVar, longitude: sponsorLonVar},
//                         {latitude: leagueLatVar, longitude: leagueLonVar}
//                     ) / 1609);
//
//                 if((distance <= sponsorRadius) && (!availableRadiusLeagues.includes(league))) {
//                    availableRadiusLeagues.push(league);
//                 }
//                     finalLeagues.push(availableRadiusLeagues.filter(element => availableBudgetLeagues.includes(element)));
//             });
//         });
//     });
// };
