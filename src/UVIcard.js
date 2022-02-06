import React, { Component } from 'react';
import { UnixToDate, UVIriskPipe } from './utilities';
export default class UVIcard extends Component {
    render() {
        return (
            <div className='flex px-7 py-3 rounded-xl bg-gray-900 text-white '>
                <div className='my-auto mr-5 text-orange-400'>
                    <span className='material-icons'>
                        {this.props.icon}
                    </span>
                </div>


                <div className='flex flex-col text-center  min-w-[85px]'>
                    <div className='font-medium text-xl'> {this.props.UVI + ' UVI'} </div>
                    <div className='text-sm font-medium text-gray-300'>{UVIriskPipe(this.props.UVI) +' Risk'}</div>
                </div>
            </div>
        );
    }
}
