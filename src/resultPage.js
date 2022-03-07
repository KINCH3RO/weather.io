import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import { CamelCasePipe, UnixToDate, addRecentSearch, getRecentSearch } from './utilities';
import LocationNotFound from './LocationNotFound';

function triggerScrollAnimation(scrollView, target, treshHold = 0, animation = 'animate__fadeInUp') {
    if (scrollView.scrollTop >= target.offsetTop - target.clientHeight - treshHold) {

        target.classList.add(animation)
    }
}

const SearchBar = (props) => {

    let navigate = useNavigate();

    let search = ({ keyCode, target }) => {
        if (keyCode === 13) {
            navigate("/app/result?city=" + target.value,)
        }
    }

    return (
        <div className="pt-2 relative mx-auto text-gray-600 my-auto">
            <input onKeyDown={search} className="border-2 w-60 focus:border-orange-400 hover:border-orange-400 
             focus:w-96 transition-[width]  border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" />
            <button type="submit" className="absolute right-0 top-0 mt-4 mr-4  text-orange-400">
                <span className="material-icons-sharp my-auto">
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
                <span className='font-medium'>{props.cityName}<span className='font-normal'>{' ,' + props.countryName}</span> </span>
            </div>

            <div >
                <SearchBar />
            </div>
        </div>

    )
}



const ResultPage = () => {
    let maxItemsInGraph = 12
    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState(null)
    const [countryName, setCountryName] = useState(null)

    let cityName = searchParams.get('city')
    let lat = searchParams.get('lat')
    let lon = searchParams.get('lon')

    useEffect(() => {

        if (!cityName && (!lat || !lon)) {
            setWeatherData('not found')
            return
        }

        let endpoint = null
        if (cityName) {
            endpoint = `http://localhost:4200/oneCallWeatherByName?cityName=${cityName}`
        } else {
            endpoint = `http://localhost:4200/oneCallWeatherByLoc?lat=${lat}&lon=${lon}`
        }
        httpClient.get(endpoint).then(data => {


            setWeatherData(data)
        }).catch(x => {
            setWeatherData('not found')
        })

        return () => {
            setWeatherData(null)
        }

    }, [cityName, lat, lon])

    useEffect(() => {
        if (weatherData) {
            httpClient.get(`https://restcountries.com/v2/alpha/${weatherData.countryId}`).then(data => {
                addRecentSearch(weatherData.locationName, data.name)
                setCountryName(data.name)
            }).catch(x => {
                setCountryName('')
            })
        }

        return () => {
            setCountryName(null)
        }
    }, [weatherData])


    useLayoutEffect(() => {

        let scrollView = document.querySelector('#myScrollView')
        let secondContent = document.querySelector('#content_2')
        let firstWtCard = document.querySelector("#wtCard_1")
        let secondWtCard = document.querySelector("#wtCard_2")
        if (scrollView) {

            scrollView.addEventListener('scroll', ({ target }) => {

                triggerScrollAnimation(scrollView, secondContent)
                triggerScrollAnimation(scrollView, firstWtCard, 0, 'animate__fadeIn')
                triggerScrollAnimation(scrollView, secondWtCard, 100, 'animate__fadeIn')

            })
        }


        return () => {
            if (scrollView) {

                scrollView.removeEventListener('scroll', ({ target }) => {

                    triggerScrollAnimation(scrollView, secondContent)
                    triggerScrollAnimation(scrollView, firstWtCard, 0, 'animate__fadeIn')
                    triggerScrollAnimation(scrollView, secondWtCard, 100, 'animate__fadeIn')

                })
            }

        }


    })


    if (!weatherData || countryName === null) {
        return <LoadingPage></LoadingPage>
    }

    if (weatherData === 'not found') {
        return <LocationNotFound />
    }

    let xValues = weatherData.hourly.map((x, index) => {
        if (index < maxItemsInGraph) {
            return UnixToDate(x.dt).getHours().toString().padStart(2, '0') + ':' + UnixToDate(x.dt).getMinutes().toString().padStart(2, '0')
        }
    })

    let yValues = weatherData.hourly.map((x, index) => {
        if (index < maxItemsInGraph) {
            return parseInt(x.temp)
        }

    })

    xValues = xValues.filter(x => x != undefined)
    yValues = yValues.filter(x => x != undefined)


    return (

        <div id="myScrollView" className='flex-1 h-screen overflow-y-scroll'>
            <div className='max-w-[1280px] ml-3 px-10 py-5 '>

                <div className='mb-6'>
                    <Header cityName={weatherData.locationName} countryName={countryName} />
                </div>


                <div className='Content flex flex-shrink gap-6  mb-3 animate__animated animate__fadeInUp'>
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

                <div className='animate__animated animate__fadeIn animate__delay-1s'>
                    <WeatherTrackCard title="What's the Weather Today?" type="current" maxItems={14} weatherData={weatherData.hourly}></WeatherTrackCard>
                </div>

                <div id="content_2" className='opacity-0 animate__animated flex my-4 gap-6 '>
                    <div className='h-auto flex-1 bg-gray-900 shadow-xl rounded-xl px-10 flex flex-col justify-center '>
                        <TemperatureGraph title="Today's Temperature Graph" label="Temperature" x={xValues} y={yValues} />
                    </div>

                    <div className='flex gap-2 flex-col '>
                        <MoonCard title="Moonrise" time={weatherData.daily[0].moonrise} icon="dark_mode" filled="true" />
                        <SunCard title="Sunrise" time={weatherData.daily[0].sunrise} icon="light_mode" filled="true" />
                        <MoonCard title="Moonset" time={weatherData.daily[0].moonset} icon="dark_mode" />
                        <SunCard title="Sunset" time={weatherData.daily[0].sunset} icon="light_mode" />
                        <UVIcard icon="light_mode" UVI={weatherData.current.uvi} />
                    </div>





                    <div className=' h-auto'>
                        <div className='h-full'>
                            <TomorrowCard cityName={weatherData.locationName} weatherData={weatherData.daily[1]} />
                        </div>
                    </div>





                </div>

                <div id="wtCard_1" className='opacity-0 animate__animated'>
                    <WeatherTrackCard title="What's the Weather Tomorrow?" type="tomorrow" weatherData={weatherData.hourly}></WeatherTrackCard>
                </div>

                <div id="wtCard_2" className='opacity-0 animate__animated'>
                    <WeatherTrackCard title="What's the Weather for Next 7 days?" type="daily" weatherData={weatherData.daily}></WeatherTrackCard>
                </div>




            </div></div>




    )

}

export default ResultPage