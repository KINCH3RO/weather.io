import React, { Component } from 'react';
import logo from './logo.png'

import { Link } from 'react-router-dom';

function SideBarButton(props) {
    let linkValue=`/app/${props.link}`
    return (
        <Link to={linkValue}>

            <button className='text-gray-500 mx-auto rounded-xl w-10 h-10 flex flex-col justify-center transition-colors
        hover:bg-orange-400 hover:text-white hover:shadow hover:shadow-orange-400 '>
                <span class="material-icons-sharp my-auto">
                    {props.iconName}
                </span>
            </button>
        </Link>


    )
}

export default class SideBar extends Component {
    render() {
        return <div className='h-full left-0 pt-8 px-3 mr-2'>
            <div className='logo'>
                <img src={logo} className="w-10 mb-2 mx-auto h-10 object-cover" alt="" srcset="" />
                <span className='text-xs mx-auto font-medium text-gray-900'>Weather.io</span>
            </div>

            <div className="sep w-full h-1 border-b border-gray-400 my-4"></div>

            <div className="actionButtons flex flex-col py-2 gap-4 ">
                <SideBarButton link="search" iconName="search" />
                <SideBarButton iconName="travel_explore" />
                <SideBarButton iconName="settings" />

            </div>


        </div>;
    }
}
