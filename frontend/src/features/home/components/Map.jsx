import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Input } from '@chakra-ui/react';

const SetMap = (myAPIKey, coordinates) => {
    var map = new maplibregl.Map({
        container: 'map',
        style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${myAPIKey}`,
    });
    map.setCenter(coordinates)
    map.setZoom(15)
    var marker = new maplibregl.Marker()
    marker.setLngLat(coordinates).setPopup(new maplibregl.Popup().setHTML(`<h1>Tentor Location</h1>`)).addTo(map);
    marker.togglePopup();
}
const Map = ({coordinates}) => {
    useEffect(() => {
        const myAPIKey = "4fcbde16d9e149299630f468233bed42";

        const script = document.createElement('script');
        script.src = "https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js";
        script.onload = () => SetMap(myAPIKey, coordinates);

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    },[]);

    return (
        <Box>
            <Helmet>
                <link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />
            </Helmet>
            <Box id="map" h="250px" w="full" bg="brand.500"></Box>
        </Box>
    );
};

export default Map;