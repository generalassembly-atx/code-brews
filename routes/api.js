var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Invalid API endpoint');
});

// http://www.brewerydb.com/developers/docs-endpoint/beer_index
// BreweryDB requires at least one of the following attributes be set:
//  name, abv, ibu, srmId, availabilityId, styleId
router.get('/beers', function(req, res, next) {
  // Send over everything in the query string from Codepen, the only difference is
  //  we also need to send the 'key' access token
  const params = Object.assign({
    key: process.env.BREWERYDB_API_KEY
  }, req.query);

  axios.get(`${ process.env.BREWERYDB_API_BASE_URL }beers`, {
    params: params
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    res.status(500).send(error);
  });
});

// http://www.brewerydb.com/developers/docs-endpoint/beer_index
router.get('/beers/:beerId', function(req, res, next) {
  // Send over everything in the query string from Codepen, the only difference is
  //  we also need to send the 'key' access token
  const params = Object.assign({
    key: process.env.BREWERYDB_API_KEY
  }, req.query);

  axios.get(`${ process.env.BREWERYDB_API_BASE_URL }beer/${ req.params.beerId }`, {
    params: params
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    res.status(500).send(error);
  });
});

module.exports = router;
