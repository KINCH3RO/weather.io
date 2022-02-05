import React, { Component, useEffect, useState } from 'react';
import AirCard from './AirCard';
import WeatherCard from './WeatherCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import httpClient from 'react-http-client';
import LoadingPage from './loadingPage';
import WindCard from './WindCard';
import WeatherTrackCard from './WeatherTrackCard';


const SearchBar = (props) => {

    let navigate = useNavigate();

    let search = ({ keyCode, target }) => {
        if (keyCode === 13) {
            navigate("/app/result?city=" + target.value,)
        }
    }

    return (
        <div className="pt-2 relative mx-auto text-gray-600 my-auto">
            <input onKeyDown={search} className="border-2 focus:border-orange-400 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" />
            <button type="submit" className="absolute right-0 top-0 mt-4 mr-4  text-orange-400">
                <span class="material-icons-sharp my-auto">
                    search
                </span>
            </button>
        </div>
    )
}
const Header = (props) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='text-2xl my-auto'>
                <span className='font-medium'>{props.cityName}, <span className='font-normal'>{props.countryName}</span> </span>
            </div>

            <div >
                <SearchBar />
            </div>
        </div>

    )
}



let ResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState(null)

    let cityName = searchParams.get('city')
    useEffect(() => {

        if (!cityName) {
            return
        }
        httpClient.get(`http://localhost:4200/oneCallWeatherByName?cityName=${cityName}`).then(data => {
            setWeatherData(data)
        })

        return () => {
            setWeatherData(null)
        }

    }, [cityName])



    if (!weatherData) {
        return <LoadingPage></LoadingPage>
    }


    return (
        <div className='px-10 py-5 flex-1'>

            <div className='mb-6'>
                <Header cityName={cityName} countryName="Morocco" />
            </div>


            <div className='Content flex gap-6 justify-between mb-3'>
                <WeatherCard
                    temp={weatherData.current.temp}
                    minTemp={weatherData.daily[0].temp.min}
                    pressure={weatherData.current.pressure}
                    visibility={weatherData.current.visibility}
                    humidity={weatherData.current.humidity}
                    description={weatherData.current.weather[0].description}

                ></WeatherCard>
                <AirCard
                    AQI={weatherData.air_pollution.list[0].main.aqi}
                    pollutants={weatherData.air_pollution.list[0].components}
                ></AirCard>
                <WindCard
                    windSpeed={weatherData.current.wind_speed}
                    windDirection={weatherData.current.wind_deg}
                ></WindCard>

            </div>

            <div className='flex'>

            </div>

            {/* <div>
                <WeatherTrackCard hourlyWeatherData={weatherData.hourly}></WeatherTrackCard>
            </div> */}
        </div>



    )

}

export default ResultPage