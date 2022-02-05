import React, { Component } from 'react';
import loadingPageStyle from './loadingPage.css'

export default class LoadingPage extends Component {
    render() {
        return <div className='h-screen flex  flex-1 justify-center'>
            <div class="sk-chase my-auto">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>;
    }
}
