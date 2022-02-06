import React, { Component } from 'react';
import { getWindDirection, windSpeedmetricPipe, windStrengthPipe } from './utilities';

let weatherStyle = {


}

function WindDegree(props) {
    let percentage = (props.degree /360) *100
   
    return (<div className='w-full p-4   bg-white rounded-2xl flex flex-col'>
        <div className='flex justify-between text-xs font-normal'>
            <div>0°</div>
            <div className='text-lime-600 text-base'>{getWindDirection(props.degree)}</div>
            <div>360°</div>
        </div>

        <div className='w-full'>

            <div className='w-full h-1 bg-gray-300 rounded-2xl   '>
                <div style={{width:percentage+"%"}} className='bg-orange-400 h-full  rounded-2xl my-3 '></div>
            </div>
        </div>

    </div>)

}


export default class WindCard extends Component {
 
    render() {
        return (<div style={weatherStyle} className='w-[400px] shadow-xl  flex flex-col rounded-2xl p-5 bg-gradient-to-b from-[#4EA7E4] to-[#FFB074]' >
            <div className='flex mb-5'>
                <div className="iconContainer rounded-full bg-white  w-8 h-8 flex justify-center my-auto mr-6">
                    <span className="material-icons-outlined text-orange-400 text-lg my-auto font-thin">
                    north_east
                    </span>
                </div>

                <div className='text-white'>
                    <div className='font-semibold mb-1'> Wind </div>
                    <div className='font-medium text-xs'> Wind status </div>
                </div>
            </div>

            <div className='weather flex flex-row mb-2 '>
                <div className='text-white text-3xl font-semibold mr-4 '>{windSpeedmetricPipe(this.props.windSpeed)}</div>
                <div className='bg-white rounded-lg text-xs px-2 font-medium py-1 h-6 my-auto shadow-sm'>Speed</div>
            </div>

            <div className="desc font-medium mb-4 text-white">{windStrengthPipe(this.props.windSpeed)}</div>

            <div className=" flex justify-between">
                <WindDegree degree ={this.props.windDirection} />
            </div>

        </div>);
    }
}
