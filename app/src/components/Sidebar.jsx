import React, {Component} from 'react'
import {render} from 'react-dom'

import {} from '../style/global.scss'

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <h1 className='sidebar__title'>DroneComplete</h1>
                <ul className='nav'>
                    <li className='nav__item selected'><i className='fa fa-plane' />Flight Planner</li>
                    <li className='nav__item'><i className='fa fa-share-alt' />Model Generator</li>
                    <li className='nav__item'><i className='fa fa-cube' />Model Viewer</li>
                </ul>
                <div className='sidebar__footer'>
                    <div className='sidebar__settings'><i className='fa fa-gears' /></div>
                    <h3 className='sidebar__credits'>&copy; Dan Foad 2018</h3>
                </div>
            </div>
        )
    }
}