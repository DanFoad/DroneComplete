import React, {Component} from 'react'
import {render} from 'react-dom'

import {} from './style/global.scss'

import Titlebar from './components/Titlebar.jsx'
import Sidebar from './components/Sidebar.jsx'


export default class App extends Component {
    render() {
        return (
            <div className='main'>
                <Titlebar />
                <div className='contents'>
                    <Sidebar />
                </div>
            </div>
        )
    }
}