const db = require('../model.js');

const tripController = {};

// functionality to get all user trips from database
tripController.getTrips = (req, res, next) => {
  const tripQuery = `
    SELECT tripId, startDate, endDate, city FROM trips WHERE userId = $1
  `
  // to update value functionality to access current user (through cookies/ sessions)
  const value = ['1'];
  try {
    db.query(tripQuery, value)
      .then(data => {
        // console.log('data from tripController ',data.rows);
        res.locals.trips = data.rows;
        return next();
      })
  }
  catch (err) {
    return next({
      log: 'tripController.getTrips - error getting user trips',
      status: 500,
      message: { err: 'tripController.getTrips - error getting user trips'
      }
    })
  }
}

// functionality to pull one trip from database
tripController.getTripDetails = (req, res, next) => {
    const tripQuery = `
      SELECT startDate, endDate, city FROM trips WHERE tripId = $1
    `
    // to update value functionality to access current trip (through cookies/ sessions)
    const value = [req.query.tripId];
    // console.log(req.query)
    try {
      db.query(tripQuery, value)
        .then(data => {
        //   console.log('data from tripController ', data.rows);
          res.locals.trip = data.rows;
          return next();
        })
    }
    catch (err) {
      return next({
        log: 'tripController.getTripDetails - error getting user trip',
        status: 500,
        message: { err: 'tripController.getTripDetails - error getting user trip'
        }
      })
    }
  }

module.exports = tripController;