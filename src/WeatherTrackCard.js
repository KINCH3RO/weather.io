import React, { Component } from 'react';
import { percentagePipe, UnixToDate, weatherPipe, windSpeedmetricPipe } from './utilities';

function Stat(props) {
    return (
        <div className='flex justify-between  text-gray-900 my-1 mx-2 '>
            <div className='mr-5'>
                <span className="material-icons-outlined">
                    {props.icon}
                </span>
            </div>
            <div className='font-medium mb-2 w-20 text-right'>{props.value}</div>

        </div>
    )
}

function HeaderButton(props) {

    return (
        <button className='text-gray-500 mx-2 rounded-xl w-10 h-10 flex flex-col justify-center transition-colors
        hover:bg-orange-400 hover:text-white hover:shadow hover:shadow-orange-400 '>
            <span className="material-icons-sharp my-auto">
                {props.iconName}
            </span>
        </button>
    )
}

function Header(props) {
    return (
        <div className='flex justify-between' >
            <div className='font-medium text-xl'>{props.title}</div>
            {/* <div className='flex'>
                <HeaderButton iconName="schedule" />
            </div> */}

        </div>)
}
function MiniCard(props) {
    return (

        <div className='flex flex-col px-3 py-2   w-44 border-r border-gray-200'>
            <div className=' p-2 rounded-full border  mx-auto mb-2'>
                <img className='h-12 w-12 ' src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" srcSet="" />
            </div>

            <div className='text-center mb-4'>{props.description}</div>


            <Stat value={windSpeedmetricPipe(props.windSpeed)} icon="air" />
            <Stat value={percentagePipe(props.clouds)} icon="cloud" />
            <Stat value={weatherPipe(props.temp)} icon="thermostat" />
            <Stat value={percentagePipe(props.humidity)} icon="water_drop" />

            <div className='text-gray-500 font-medium text-sm text-center'>
                {props.type === "daily" ? UnixToDate(props.time).toDateString() : UnixToDate(props.time).getHours().toString().padStart(2, '0') + ':' + UnixToDate(props.time).getMinutes().toString().padStart(2, '0')}
            </div>


        </div>)
}
export default class WeatherTrackCard extends Component {
    render() {
        return (
            <div className=' p-5 flex flex-col '>
                <div className='mb-4'>
                    <Header title={this.props.title} />
                </div>


                <div className='flex max-w-6xl  overflow-x-scroll pb-3 mx-auto'>

                    {this.props.weatherData.map((weatherData, index) => {
                        let maxItems = this.props.maxItems || 48;

                        let jsx = <MiniCard key={'card-' + index}
                            type={this.props.type}
                            icon={weatherData.weather[0].icon}
                            description={weatherData.weather[0].description}
                            windSpeed={weatherData.wind_speed}
                            clouds={weatherData.clouds}
                            temp={this.props.type === "daily" ? weatherData.temp.max : weatherData.temp}
                            humidity={weatherData.humidity}
                            time={weatherData.dt} />

                        if (this.props.type === "tomorrow" && index < maxItems) {
                            let currentDate = new Date()

                            if (UnixToDate(weatherData.dt).getDay() == currentDate.getDay() + 1) {
                                return jsx
                            }
                        }
                        else {

                            if (index < maxItems) {
                                return jsx
                            }

                        }






                    })}


                </div>

            </div>);
    }
}
