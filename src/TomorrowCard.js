import React, { Component } from 'react';
import { weatherPipe } from './utilities';

export default class TomorrowCard extends Component {
  render() {
    return (
    <div className='w-48 shadow-xl h-full flex flex-col justify-between bg-gradient-to-b from-[#DFF296] to to-[#D2E8DC] rounded-2xl p-5'>
        <div className='flex flex-col text-gray-900'>
            <div className='text-xs font-medium mb-3'>Tomorrow</div>
            <div className='text-2xl font-medium'>{this.props.cityName}</div>
        </div>

        <div className='flex flex-col'>
            <div className='text-2xl font-medium mb-3'>{weatherPipe(this.props.weatherData.temp.max)}</div>
            <div className='text-xs font-medium ' >{this.props.weatherData.weather[0].description}</div>
        </div>

    </div>);
  }
}
