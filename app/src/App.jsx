import React, {Component} from 'react'
import {render} from 'react-dom'

import {} from './style/global.scss'

import Titlebar from './components/Titlebar.jsx'
import Sidebar from './components/Sidebar.jsx'
import FlightPlanner from './components/FlightPlanner.jsx'


export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 0
        }
    }

    getCurrentPage() {
        var page = this.state.page;

        switch(page) {
            case 0:
                return <FlightPlanner />
            default:
                return <div></div>
        }
    }

    render() {
        return (
            <div className='main'>
                <Titlebar />
                <div className='contents'>
                    <Sidebar />
                    <div className='page'>
                        { this.getCurrentPage() }
                    </div>
                </div>
            </div>
        )
    }
}