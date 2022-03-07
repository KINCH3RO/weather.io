import React, { Component } from 'react';
import Map from './map';
export default class MapPage extends Component {
  render() {
    return <div className='h-screen w-full relative '>
      <div className='absolute z-50'>
        <div className='p-5 bg-black/25 text-white min-w-max  rounded-xl m-4'> click on the map to view weather stats</div>
      </div>
      <Map></Map>
    </div>;
  }
}
