import axios from "axios";

export default {

  // Gets all locations
  getLocations: (searchTerm, searchLoc) => {
    //console.log(`\n====== This will eventually be a genpop database call or Yelp searh ======\n\n${searchTerm}`)
    //change for yelp
    console.log(searchTerm);
    const searchRequest = {
      term: searchTerm,
      // limit: 10,
      latitude: searchLoc[0],
      longitude: searchLoc[1]
    };
 return axios.post("/api/locations/yelp", searchRequest);
  },

  // Gets all Locations with the given id
  getSaved: username => {
    const searchUser = {
      user: username
    }
    return axios.post("/api/locations/user", searchUser);
  },

  // Deletes the Location with the given id
  deleteLocations: function(id) {
    return axios.delete("/api/locations/" + id);
  },

  // Saves an Location to the database
  saveLocation: function(locationData) {
    return axios.post("/api/locations", locationData);
  },

  // Relocates user in new city for searches
  getNewCity: newCity => {
    const citySearch = {
        city: newCity
    }
    return axios.post("/api/locations/city", citySearch);
  },

  // On app load, use current latlng to find current city name
  getRevCity: newLatLng => {
    const latLngSearch = {
        location: newLatLng
    }
    return axios.post("/api/locations/latlng", latLngSearch);
  }
};
