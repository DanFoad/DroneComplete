import React, {Component} from 'react'
import {render} from 'react-dom'

import {} from '../style/global.scss'

import AppActions from '../actions/AppActions'

export default class ViewerBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='viewerbar'>
                <button className="viewerbar__button"><img src="src/img/top.png" alt=""/></button>
                <button className="viewerbar__button"><img src="src/img/bottom.png" alt=""/></button>
                <button className="viewerbar__button"><img src="src/img/front.png" alt=""/></button>
                <button className="viewerbar__button"><img src="src/img/back.png" alt=""/></button>
                <button className="viewerbar__button"><img src="src/img/left.png" alt=""/></button>
                <button className="viewerbar__button"><img src="src/img/right.png" alt=""/></button>
            </div>
        )
    }
}