import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
    let navigate = useNavigate();

    let search = ({ keyCode, target }) => {
        if (keyCode === 13) {
            navigate("/app/result?city=" + target.value,)
        }
    }

    return (
        <div className="  mx-auto text-gray-600 max-w-max  ">
            <input onKeyDown={search} className="border-2 focus:border-orange-400 border-gray-300 text-xl h-20 w-[700px]

            bg-white  px-5  rounded-lg  focus:outline-none"
                type="search" name="search" placeholder="Search cities , US state code, Country code" />
            <button type="submit" className=" -ml-12  my-auto text-orange-400">
                <span className="material-icons-sharp  text-4xl">
                    search
                </span>
            </button>

        </div>
    )
}
export default class LocationNotFound extends Component {
    render() {
        return (
            <div className='h-screen w-screen text-center flex flex-col justify-center text-gray-900'>
                <div>
                    <div className='text-9xl mb-5'>{'>.<'} </div>
                    <div className='text-5xl font-light mb-4'>Woops Location Not found</div>
                    <div className='mb-4'><SearchBar /></div>
                    <div className='text-2xl'>Try Again?</div>

                </div>

            </div>);
    }
}
