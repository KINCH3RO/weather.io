import React, { useEffect, useState } from 'react';
import AirCard from './AirCard';
import WeatherCard from './WeatherCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import httpClient from 'react-http-client';
import LoadingPage from './loadingPage';
import WindCard from './WindCard';
import WeatherTrackCard from './WeatherTrackCard';
import MoonCard from './MoonCard';
import SunCard from './SunCard';
import TomorrowCard from './TomorrowCard';
import TemperatureGraph from './TemperatureGraph';
import UVIcard from './UVIcard';
import { UnixToDate } from './utilities';




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



const ResultPage = () => {
    let maxItemsInGraph =12
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

    let xValues = weatherData.hourly.map((x,index)=>{
        if(index <maxItemsInGraph){
            return UnixToDate(x.dt).getHours().toString().padStart(2, '0') + ':' + UnixToDate(x.dt).getMinutes().toString().padStart(2, '0')
        }
    })

    let yValues = weatherData.hourly.map((x,index)=>{
        if(index <maxItemsInGraph){
            return parseInt(x.temp)}
        
    })

    xValues = xValues.filter(x=>x!=undefined)
    yValues = yValues.filter(x=>x!=undefined)


    return (
        <div className='max-w-[1280px] mx-auto px-10 py-5 flex-1'>

            <div className='mb-6'>
                <Header cityName={cityName} countryName="Morocco" />
            </div>


            <div className='Content flex flex-shrink gap-6  mb-3'>
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

            <div>
                <WeatherTrackCard title="What's the Weather Today?" type="current" maxItems={14} weatherData={weatherData.hourly}></WeatherTrackCard>
            </div>

            <div className='flex my-4 gap-6 '>
                <div className='max-h-96 flex-1 bg-gray-100 rounded-md p-5 '>
                    <TemperatureGraph title="Today's Temperature Graph" label="Temperature" x={xValues} y={yValues} />
                </div>

                <div className='flex gap-2 flex-col '>
                    <MoonCard title="Moonrise" time={weatherData.daily[0].moonrise} icon="dark_mode" filled="true" />
                    <SunCard title="Sunrise" time={weatherData.daily[0].sunrise} icon="light_mode" filled="true" />
                    <MoonCard title="Moonset" time={weatherData.daily[0].moonset} icon="dark_mode" />
                    <SunCard title="Sunset" time={weatherData.daily[0].sunset} icon="light_mode" />
                    <UVIcard icon="light_mode" UVI={4.5} />
                </div>





                <div className=' h-auto'>
                    <div className='h-full'>
                        <TomorrowCard cityName="Beni Mellal" weatherData={weatherData.daily[1]} />
                    </div>
                </div>





            </div>

            <div>
                <WeatherTrackCard title="What's the Weather Tomorrow?" type="tomorrow" weatherData={weatherData.hourly}></WeatherTrackCard>
            </div>

            <div>
                <WeatherTrackCard title="What's the Weather Next 7 days?" type="daily" weatherData={weatherData.daily}></WeatherTrackCard>
            </div>




        </div>



    )

}

export default ResultPage