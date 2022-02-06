
import React, { Component } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { weatherPipe } from './utilities';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)



export default function TemperatureGraph(props) {


    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels:{
                    family:"'Montserrat', sans-serif;"
                }

            },
            title: {
                display: true,
                text: props.title,
                color: '#FFFFFF'
            },
        },

        scales: {
            x: {
                grid: { color: '#111827' },
                ticks: {
                    color: '#FFFFFF'
                }
            },
            y: {
                grid: { color: '#111827' },
                ticks: {
                    callback: (value, index, ticks) => {
                        return weatherPipe(value)
                    },
                    color: '#FFFFFF'
                }
            }
        }

    };

    let labels = props.x
    let data = {
        labels,
        datasets: [{
            tension: 0.4,

            label: props.label,
            data: props.y,
            backgroundColor: "#FB923C",
            borderColor: [
                "#FB923C",
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
            fill: false
        }]
    };

    return <Line options={options} data={data} />;

}

