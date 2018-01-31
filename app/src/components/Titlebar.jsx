import React, {Component} from 'react'
import {render} from 'react-dom'

import {} from '../style/global.scss'

export default class Titlebar extends Component {
    render() {
        return (
            <div className='titlebar'>
                <div className='titlebar__button close'><img src='src/img/close.png' /></div>
                <div className='titlebar__button restore'><img src='src/img/window-restore.png' /></div>
                <div className='titlebar__button minimize'><img src='src/img/window-minimize.png' /></div>
            </div>
        )
    }
}