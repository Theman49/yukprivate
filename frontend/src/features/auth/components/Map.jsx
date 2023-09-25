import React, { useEffect, forwardRef } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

const SetMap = (myAPIKey, defaultValue) => {
    var map = new maplibregl.Map({
        container: 'map',
        style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${myAPIKey}`,
        center: defaultValue,
        zoom: 10
    });
    map.addControl(new maplibregl.NavigationControl());
    MarkerClick(map);
    AutoComplete(myAPIKey, map);
}

const searchGeocoder = (searchCoordinates, name, map) => {
    var marker = new maplibregl.Marker()
    map.setCenter(searchCoordinates)
    map.setZoom(12)

    const markerImage = "https://api.geoapify.com/v1/icon/?type=material&color=red&icon=cloud&iconType=awesome&apiKey=4fcbde16d9e149299630f468233bed42"
    marker.setLngLat(searchCoordinates)
        .setPopup(new maplibregl.Popup().setHTML(`<h1>${name}</h1>`)) // add popup
        .addTo(map);

    marker.togglePopup();
}

const AutoComplete = (myAPIKey, map) => {
    const autocompleteInput = new autocomplete.GeocoderAutocomplete(
        document.getElementById("autocomplete"), 
        myAPIKey, 
        { /* Geocoder options */ });

    autocompleteInput.on('select', (location) => {
        // check selected location here 
        console.log(location)
        const name = location.properties.address_line1 + " " + location.properties.address_line2
        const searchCoordinates = [location.properties.lon, location.properties.lat]
        searchGeocoder(searchCoordinates, name, map)

    });

    autocompleteInput.on('suggestions', (suggestions) => {
        // process suggestions here
        console.log(suggestions)
    });
}

const MarkerClick = (map) => {
    let myLocation = document.getElementById('location')
    var markerClick = new maplibregl.Marker()
    map.on('click', function(e) {
        // console.log('A click event has occurred at ' + e.lngLat);
        const longLat = []
        longLat[0] = e.lngLat.lng
        longLat[1] = e.lngLat.lat

        markerClick.setLngLat(longLat).setPopup(new maplibregl.Popup().setHTML(`<h1>My Location</h1>`)).addTo(map);
        markerClick.togglePopup();

        myLocation.value = longLat;
    });
}

const Map = forwardRef(({defaultValue=[110.336524, -7.0008457]}, ref) => {
    useEffect((defaultValue) => {
        const myAPIKey = "4fcbde16d9e149299630f468233bed42";

        const script = document.createElement('script');
        script.src = "https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js";

        const script2 = document.createElement('script');
        script2.src = "https://unpkg.com/@geoapify/geocoder-autocomplete@^1/dist/index.min.js";
        script2.onload = () => SetMap(myAPIKey, defaultValue);

        document.body.appendChild(script)
        document.body.appendChild(script2)

        return () => {
            document.body.removeChild(script)
            document.body.removeChild(script2)
        }
    },[]);

    return (
        <Box pos="relative">
            <Helmet>
                <link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />
                <link rel="stylesheet" href="https://unpkg.com/@geoapify/geocoder-autocomplete@^1/styles/minimal.css" />
            </Helmet>
            <Box id="map" h="250px" w="full" bg="brand.500">
            </Box>

            <Box
                pos="absolute"
                top={5}
                left={5}
                w="75%"
            >
                {/* <Box id="autocomplete" className="autocompolete-container" pos="relative" w="100%" h="30px"></Box> */}

                <div id="autocomplete" className="autocompolete-container"></div>
            </Box>

            <Input type="text" id="location" mt={4} ref={ref} defaultValue={defaultValue}></Input>
        </Box>
    );
});

export default Map;