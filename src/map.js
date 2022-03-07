import React, {  useLayoutEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';

function setLastLocation(value) {
    localStorage.setItem("LOCATION", JSON.stringify(value))
}
function getLastLocation() {
    let value = localStorage.getItem("LOCATION")
    console.log(value)
    if (value) {
       
        return JSON.parse(value)
    }
    return null
}
export default function Map() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2luMTIzIiwiYSI6ImNrcGlnb2NuajBlZ3kybm9mb3RvNTg1YmwifQ.hX-14BZKBN64-CRkHkMy1A'
    let map = null
    let navigate = useNavigate()
    let startingPosition = getLastLocation() ? [getLastLocation().lng, getLastLocation().lat] :  [-74.5, 40];

    useLayoutEffect(() => {
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center:startingPosition, // starting position [lng, lat]
            zoom: 9 // starting zoom,

        });

        map.on('click', ({ lngLat }) => {
    
            setLastLocation(lngLat)
            navigate(`/app/result?lon=${lngLat.lng}&lat=${lngLat.lat}`)
        })
        
        return ()=>{
          
            map.off('click', ({ lngLat }) => {
    
                setLastLocation(lngLat)
                navigate(`/app/result?lon=${lngLat.lng}&lat=${lngLat.lat}`)
            })
        }
    }, [])


    return <div id="map" className='h-full w-full'>

    </div>;
}
