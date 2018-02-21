import React, {Component} from 'react'
import {render} from 'react-dom'
import fs from 'fs'

import {} from '../style/global.scss'

import GeneratorProgress from './GeneratorProgress.jsx'
import GeneratorView from './GeneratorView.jsx'

export default class ModelGenerator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status: 'STATUS_LOAD',
            images: []
        }

        this.loadImages()
    }

    loadImages() {
        fs.readdir('./app/src/img/input', (err, files) => {
            files.forEach(file => {
                this.setState({ images: [ ...this.state.images, file ] })
            })
            this.setState({ status: 'STATUS_LOADED' })
        })
    }

    getGeneratorStatus() {
        if (this.state.status == 'STATUS_LOAD') {
            return (<p>Loading images...</p>)
        } else {
            return (<p>Images loaded</p>)
        }
    }

    render() {
        return (
            <div className='modelgenerator'>
                <div className='generator__status'>
                    <GeneratorProgress status={ this.state.status } />
                    { this.getGeneratorStatus() }
                </div>
                <GeneratorView images={ this.state.images } />
            </div>
        )
    }
}