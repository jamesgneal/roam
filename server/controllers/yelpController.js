const db = require("../database/models");
const yelp = require("yelp-fusion");
const apiKey =
  "diAbxadZ_x4ddstAPTyf-nHrw5kOhKM9Mh16l6cBS8TUqUJUX_Y3AE6ah4-_es8ZSQzTlyXc6X2TFT02kMYiuxTsHOiG9zuegMujxxhC4PPQTlUO1lQ--d-odHA3W3Yx";

// Defining methods for the locationController
module.exports = {
  findNew: function(req, res) {
    // console.log(`'nThis is the req that hits the server:\n${prettyReq}`);
    // const searchRequest = {
    //   term: req.body,
    //   limit: 10,
    //   location: "Richmond, Virginia"
    // };
    const prettySearch = JSON.stringify(req.body, null, 4);
    console.log(`\nThis is the searchRequest prepared by the client and passed to the server:\n${prettySearch}`);

    const yelpClient = yelp.client(apiKey);

    yelpClient
      .search(req.body)
      .then(response => {
        //const prettyJson = JSON.stringify(response.jsonBody.businesses, null, 4);
        //console.log(prettyJson);
        res.json(response);
      })
      .catch(e => {
        console.log(e);
      });
  },
  findAll: function(req, res) {
    db.Location.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Location.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Location.create(req.body)
      .then(dbModel => {
        console.log(
          `\n====== response from the database of the dbModel\n\n${dbModel}`
        );
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Location.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Location.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
