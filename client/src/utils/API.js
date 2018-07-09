import axios from "axios";

export default {

  // Gets all locations
  getLocations: (searchTerm) => {
      //console.log(`\n====== This will eventually be a genpop database call or Yelp searh ======\n\n${searchTerm}`)
      //change for yelp
   return axios.get("/api/locations/yelp", searchTerm);
    
  //  return axios.get(queryURL+apiKey+formQ+searchTerm.subject+startSyntax+searchTerm.start+endSyntax+searchTerm.end);
  },
  // Gets the Location with the given id
  getSaved: function() {
    return axios.get("/api/locations/");
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
