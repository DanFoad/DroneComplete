import React, {Component} from 'react'
import {render} from 'react-dom'
import {remote} from 'electron'

import {} from '../style/global.scss'

export default class Titlebar extends Component {

    minimize() {
        remote.BrowserWindow.getFocusedWindow().minimize()
    }

    maximise() {
        if (remote.BrowserWindow.isMaximized())
            remote.BrowserWindow.getFocusedWindow().restore()
        else
        remote.BrowserWindow.getFocusedWindow().maximize()
    }

    close() {
        remote.BrowserWindow.getFocusedWindow.close()
    }

    render() {
        return (
            <div className='titlebar'>
                <div className='titlebar__button close' onClick={ this.close }><img src='src/img/close.png' /></div>
                <div className='titlebar__button restore' onClick={ this.maximise }><img src='src/img/window-restore.png' /></div>
                <div className='titlebar__button minimize' onClick={ this.close }><img src='src/img/window-minimize.png' /></div>
            </div>
        )
    }
}