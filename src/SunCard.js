import React, { Component } from 'react';
import { UnixToDate } from './utilities';

export default class SunCard extends Component {
    render() {
        return (
            <div className='flex px-7 py-3 rounded-xl bg-gray-200 text-gray-900   '>
                <div className='my-auto mr-5 text-orange-500'>
                    <span className={this.props.filled ? 'material-icons' : 'material-icons-outlined'}>
                        {this.props.icon}
                    </span>
                </div>

                <div className='flex flex-col text-center min-w-[85px]'>
                    <div className='font-medium text-xl'>{UnixToDate(this.props.time).getHours().toString().padStart(2, '0') + ':' + UnixToDate(this.props.time).getMinutes().toString().padStart(2, '0')}</div>
                    <div className='text-sm font-medium text-gray-700'>{this.props.title}</div>
                </div>
            </div>
        );
    }
}
