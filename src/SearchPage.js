import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";


const SearchBar = (props) => {
    let navigate = useNavigate();

    let search = ({ keyCode, target }) => {
        if (keyCode === 13) {
            navigate("/app/result?city="+target.value,)
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
export default class SearchPage extends Component {


    render() {

        return <SearchBar />
    }
}
