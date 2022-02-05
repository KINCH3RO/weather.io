import React, { Component } from 'react';
import { metricPipe, percentagePipe, weatherPipe } from './utilities';

let weatherStyle = {


}

function MiniCard(props) {
    return (

        <div className={"card  w-24 py-3 rounded-3xl text-center " + props.className}>
            <div className='text-xs font-normal mb-2 '>{props.statName}</div>
            <div className='font-medium'>{props.value}</div>
        </div>


    )
}

export default class WeatherCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div style={weatherStyle} className='w-[400px]  flex flex-col rounded-2xl p-5 bg-gradient-to-b from-[#BEE6E5] to-[#EFDAC6]' >
            <div className='flex mb-5'>
                <div className="iconContainer rounded-full bg-white  w-8 h-8 flex justify-center my-auto mr-6">
                    <span className="material-icons-outlined text-orange-400 text-lg my-auto font-thin">
                        cloud
                    </span>
                </div>

                <div className='text-gray-900 '>
                    <div className='font-semibold mb-1'> Weather </div>
                    <div className='font-medium text-xs'> what's the weather </div>
                </div>
            </div>

            <div className='weather flex flex-row mb-2'>
                <div className='text-gray-900 text-3xl font-semibold mr-4'>{weatherPipe(this.props.temp)}</div>
                <div className='bg-white rounded-lg text-xs px-2 font-medium py-1 h-6 my-auto shadow-sm'>{weatherPipe(this.props.minTemp)}</div>
            </div>

            <div className="desc font-medium  mb-4">{this.props.description}</div>

            <div className=" flex justify-between">
                <MiniCard className="bg-gray-900 text-white" statName="Humidity" value={percentagePipe( this.props.humidity)} />
                <MiniCard className="bg-[#CCE16A] text-gray-900" statName="Pressure" value={this.props.pressure +" hpa"} />
                <MiniCard className="text-gray-900 bg-white" statName="Visibility" value={metricPipe(this.props.visibility)} />
            </div>

        </div>);
    }
}
