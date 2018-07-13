import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

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
            },
        }
    }

    mapRef = createRef()

    componentDidMount() {
        this.mapRef.current.leafletElement.locate()
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
    }

    render() {
        const findYouMarker = this.state.hasLocation ? (
            <Marker position={this.state.latlng}>
                <Popup>
                    <span>You are here</span>
                </Popup>
            </Marker>
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