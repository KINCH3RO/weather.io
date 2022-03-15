import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import httpClient from 'react-http-client';
import { getEndPoint } from './utilities';
import { useEffect } from 'react/cjs/react.production.min';
const SearchBar = (props) => {
    let navigate = useNavigate();
    let timeout = null
    let interval = 750


    let search = ({ keyCode, target }) => {
        if (keyCode === 13) {
            navigate("/app/result?city=" + target.value)
            return
        }
        clearTimeout(timeout)


    }


    let keyUp = ({ target }) => {
        timeout = setTimeout(() => {
            props.onInput(target.value)
        }, interval)

    }







    return (
        <div className="mx-auto text-gray-600 max-w-max  relative ">
            <input onBlur={props.onBlur} onKeyUp={keyUp} onFocus={props.onFocus} onKeyDown={search} className="border-2 focus:border-orange-400 border-gray-300 text-xl h-16 w-[700px]
            bg-white  px-5  rounded-lg  focus:outline-none"
                type="search" name="search" placeholder="Search cities , US state code, Country code" />
            <button type="submit" className="text-orange-400 absolute h-full -ml-12">
                <span className="material-icons-sharp  text-4xl">
                    search
                </span>
            </button>

        </div>
    )
}

const RecentSearch = (props) => {
    let data = props.searchData;
    if (props.hide) {
        return null
    }
    if (data.length <= 0) {
        return null
    }
    return (

        <div className='max-h-56 mx-auto bg-white text-left overflow-y-auto mt-4 border-2 w-[700px] border-gray-300 rounded-lg px-5 text-lg'>

            {
                data.map((x, index) => {
                    return (
                        <div key={'value-' + index}  >
                            <Link to={'/app/result?city=' + x.city}>
                                <div className='py-3 hover:text-orange-400 cursor-pointer'>{x.city}, <span className='text-gray-500'>{x.country}</span> </div>
                            </Link>
                        </div>

                    )
                })
            }


        </div>
    )
}
export default class SeachPage extends Component {

    constructor(props) {
        super(props)
        let data = JSON.parse(localStorage.getItem('RECENT'))

        this.state = {
            data: data ?? [],
            inputFocused: false

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {

        this.setState({
            inputFocused: true
        })

    }

    handleBlur() {
        this.setState({
            inputFocused: true
        })
    }

    handleChange(inputValue) {

        if (!inputValue || inputValue.length <= 0) {

            let data = JSON.parse(localStorage.getItem('RECENT'))
            this.setState({
                data: data ?? []
            })
            return
        }

        httpClient.get(`${getEndPoint()}/api/getCountries/${inputValue}`).then(data => {
            this.setState({
                data: data.data
            })
        }).catch(err => {
            this.setState({
                data: []
            })
        })

        // this.setState({
        //     data: data
        // })

    }

   

    render() {
        return (
            <div>


                <div className='h-screen w-screen text-center flex flex-col justify-center text-gray-900'>
                    <div>
                        <div className='mb-6 text-6xl text-center mx-auto font-medium'>Weather.io</div>
                        <div className='mb-4 max-w-lg text-xl text-center mx-auto text-gray-600'> Wind stats,Temp Stats, Weather forcast and more</div>
                        <div className='mb-4 ' >
                            <SearchBar onBlur={this.handleBlur} onFocus={this.handleFocus} onInput={this.handleChange} />
                        </div>
                        <RecentSearch hide={!this.state.inputFocused} searchData={this.state.data} />
                    </div>

                </div>
            </div>)

    }
}
