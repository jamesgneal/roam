import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import './Map.css';
import Fa from 'mdbreact';

const CartoDB_Positron = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
const CartoDB_PositronAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

class RoamMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLocation: false,
            locations: [],
            //Layout of markerlocations is super critical. Coordinates NEED to be saved
            //in a format of {latlng: {lat: ####, lng: ####}}
            markerLocations: [],
            latlng: {
                lat: 37.5407,
                lng: -77.4360,
            }
        }
    }

    mapRef = createRef()

    componentDidMount() {
        this.mapRef.current.leafletElement.locate()
    }

    componentDidUpdate(prevProps) {
        if (this.props.userLocations !== prevProps.userLocations) {
            console.log("props updated!\n", this.props.userLocations)
            //want to set value of prettyLocationsArray 
            let prettyLocationsArray = [];
            //This mapping function needs to match the layout of markerLocations in state, 
            //or else shit breaks. Like instantly.
            this.props.userLocations.map(location => {
                let tempLocation = {
                    latlng: {
                        lat: 0,
                        lng: 0
                    },
                    name: location.name
                };
                tempLocation.latlng.lat = location.location.lat
                tempLocation.latlng.lng = location.location.long
                //So this part f**king works. State loads the markers successfully, as latlng coordinates.
                prettyLocationsArray.push(tempLocation);
            })
            console.log("Pretty Locations", prettyLocationsArray)
            //again, state is set successfully, from this point
            this.setState({ markerLocations: prettyLocationsArray })
        }
        if (this.props.yelpLocations !== prevProps.yelpLocations) {
            console.log("Yelp props updated!\n", this.props.yelpLocations)
            //want to set value of prettyLocationsArray 
            let prettyYelpArray = [];
            //This mapping function needs to match the layout of markerLocations in state, 
            //or else shit breaks. Like instantly.
            this.props.yelpLocations.map(location => {
                let yelpLocation = {
                    latlng: {
                        lat: 0,
                        lng: 0
                    },
                    name: location.name
                };
                yelpLocation.latlng.lat = location.coordinates.latitude
                yelpLocation.latlng.lng = location.coordinates.longitude
                //So this part f**king works. State loads the markers successfully, as latlng coordinates.
                prettyYelpArray.push(yelpLocation);
            })
            console.log("Pretty Yelp Locations", prettyYelpArray)
            //again, state is set successfully, from this point
            this.setState({ markerLocations: prettyYelpArray })
        }
    }

    /* addMarker = (e) => {
        const markers = this.state.markerLocations
        markers.push(e.latlng)
        this.setState({ markerLocations: markers })
    } */

    /*     renderMarkers(locationArray) {
            console.log("Location Array\n", locationArray)
            locationArray.map(location => {
                <Marker position={location.coordinates}>
                    <Popup>
                        <span>location.url</span>
                    </Popup>
                </Marker>
            })
        } */

    //handleClick = () => {
    //want an array of locations to drop pins
    //}

    handleLocationFound = e => {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
        })
        this.props.passLoc(e.latlng);
    }

    render() {
        const findYouMarker = this.state.hasLocation ? (
            <CircleMarker center={this.state.latlng} radius={10} id="circle-marker">
                <Popup>
                    <span>You are here</span>
                </Popup>
            </CircleMarker>
        ) : null
        return (
            <div>
                <Map
                    center={this.state.latlng}
                    length={4}
                    onClick={this.handleClick}
                    onLocationfound={this.handleLocationFound}
                    ref={this.mapRef}
                    className="leaflet-container"
                    zoom={11}>
                    <TileLayer
                        attribution={CartoDB_PositronAttr}
                        url={CartoDB_Positron}
                    />
                    {findYouMarker}
                    {/* {this.state.markerLocations.length ? ( */}
                    {this.state.markerLocations.map((location, index) => 
                        //console.log(location);
                        <Marker key={`marker-${index}`} position={location.latlng}>
                            <Popup>
                                <span>{location.name}</span>
                            </Popup>
                        </Marker>
                    )}
                    {/* ) : null} */}
                    {/* findYouMarker */}
                </Map>
            </div>
        );
    }
}

export default RoamMap;