import axios from "axios";

export default {

  // Gets all locations
  getLocations: (searchTerm) => {
      //console.log(`\n====== This will eventually be a genpop database call or Yelp searh ======\n\n${searchTerm}`)
      //change for yelp
      console.log(searchTerm);
      const searchRequest = {
        term: searchTerm,
        limit: 10,
        location: "Richmond, Virginia"
      };
   return axios.post("/api/locations/yelp", searchRequest);
    
  //  return axios.get(queryURL+apiKey+formQ+searchTerm.subject+startSyntax+searchTerm.start+endSyntax+searchTerm.end);
  },
  // Gets all Locations with the given username
  getSaved: (username) => {
    console.log(`User signed in as \n${username}`)
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
  }
};
