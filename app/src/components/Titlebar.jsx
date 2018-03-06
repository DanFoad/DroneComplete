import React, {Component} from 'react'
import {render} from 'react-dom'
import {remote} from 'electron'

import {} from '../style/global.scss'

export default class Titlebar extends Component {

    minimise() {
        remote.getCurrentWindow().minimize()
    }

    maximise() {
        if (remote.getCurrentWindow().isMaximized())
            remote.getCurrentWindow().restore()
        else
        remote.getCurrentWindow().maximize()
    }

    close() {
        remote.getCurrentWindow().close()
    }

    render() {
        return (
            <div className='titlebar'>
                <div className='titlebar__button close' onClick={ this.close }><img src='src/img/close.png' /></div>
                <div className='titlebar__button restore' onClick={ this.maximise }><img src='src/img/window-restore.png' /></div>
                <div className='titlebar__button minimize' onClick={ this.minimise }><img src='src/img/window-minimize.png' /></div>
            </div>
        )
    }
}