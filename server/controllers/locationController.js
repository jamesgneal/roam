const axios = require("axios");
const db = require("../database/models");
const yelp = require("yelp-fusion");
const apiKeyYelp =
  "diAbxadZ_x4ddstAPTyf-nHrw5kOhKM9Mh16l6cBS8TUqUJUX_Y3AE6ah4-_es8ZSQzTlyXc6X2TFT02kMYiuxTsHOiG9zuegMujxxhC4PPQTlUO1lQ--d-odHA3W3Yx";
const apiKeyMapQuest = "NWl7WfG1SosoJvAPwuiaWvRaf3oWmYKO";

// Defining methods for the locationController
module.exports = {
  findNew: function(req, res) {
    const yelpClient = yelp.client(apiKeyYelp);
    yelpClient
      .search(req.body)
      .then(response => {
        res.json(response);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getNewCity: (req, res) => {
    axios.post(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKeyMapQuest}&inFormat=json&outFormat=json&json={"location":{"street":"${req.body.city}"},"options":{"thumbMaps":false,"maxResults":"1"}}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },

  getRevCity: (req, res) => {
    axios.post(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKeyMapQuest}&location=${req.body.location.lat}%2C${req.body.location.lng}&outFormat=json&thumbMaps=false`)
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },


  findAll: function(req, res) {
    db.Location.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUsername: function(req, res) {
    db.Location.find(req.body)
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
