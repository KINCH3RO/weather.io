import React, { Component } from 'react';
import loadingPageStyle from './loadingPage.css'

export default class LoadingPage extends Component {
    render() {
        return <div className='h-screen flex  flex-1 justify-center'>
            <div className="sk-chase my-auto">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>;
    }
}
