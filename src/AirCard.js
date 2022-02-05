import React, { Component } from 'react';
import { getMainPollutant } from './utilities';

let weatherStyle = {


}

function AirQuality(props) {
    let percentage = (props.AQI /5) *100
  
    return (<div className='w-full p-5   bg-white rounded-2xl flex flex-col'>
        <div className='flex justify-between text-xs font-normal'>
            <div>Good</div>
           <div>Moderate</div>
            <div>Poor</div>
        </div>

        <div className='w-full'>

            <div className='w-full h-1 bg-gray-300 rounded-2xl   '>
                <div style={{width:percentage+"%"}} className='bg-orange-400 h-full  rounded-2xl my-3 '></div>
            </div>
        </div>

    </div>)

}

export default class AirCard extends Component {


    render() {
        let mainPollutant = getMainPollutant(this.props.pollutants)
       

        return (<div style={weatherStyle} className='w-[400px]  flex flex-col rounded-2xl p-5 bg-gradient-to-b from-[#4DA6E4] to-[#83DCDF]' >
            <div className='flex mb-5'>
                <div className="iconContainer rounded-full bg-white  w-8 h-8 flex justify-center my-auto mr-6">
                    <span className="material-icons-round text-orange-400 text-lg my-auto">
                        air
                    </span>
                </div>

                <div className='text-white '>
                    <div className='font-semibold mb-1'> Air Quality </div>
                    <div className='font-medium text-xs'> {'Main Poluttion : ' + mainPollutant.pollutant} </div>
                </div>
            </div>

            <div className='weather flex flex-row mb-12 text-white'>
                <div className=' text-3xl font-semibold mr-4'>{Math.ceil(mainPollutant.concentration) +' μg/m3'}</div>
                <div className='bg-[#CCE16A] text-gray-900 rounded-lg text-xs px-2 font-medium py-1 h-6 my-auto shadow-sm'>Concentration</div>
            </div>



            <div className=" flex justify-between">
                <AirQuality AQI ={this.props.AQI} />
            </div>

        </div>);
    }
}
