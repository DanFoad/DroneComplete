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
            status: 'STATUS_FOCAL',
            statusIndex: 2,
            images: []
        }

        this.loadImages()
    }

    loadImages() {
        var i = 0
        fs.readdir('./app/src/img/thumbs', (err, files) => {
            files.forEach(file => {
                var image = { path: file, percentage: 0 }
                if (i < 12)
                    image.percentage = 100
                else if (i == 12)
                    image.percentage = 50
                
                i++
                
                this.setState({ images: [ ...this.state.images, image ] })
            })
        })
    }

    getGeneratorStatus() {
        switch (this.state.status) {
            case 'STATUS_LOAD':
                return (<p>Loading images from path...</p>)
            case 'STATUS_RESIZE':
                return (<p>Resizing images for usage...</p>)
            case 'STATUS_FOCAL':
                return (<p>Extracting focal lengths for images...</p>)
            case 'STATUS_HAHOG':
                return (<p>Generating HAHOG (feature point detection) features...</p>)
            case 'STATUS_MATCH':
                return (<p>Matching image pairs...</p>)
            case 'STATUS_MERGE':
                return (<p>Merging the features of connected pairs...</p>)
            case 'STATUS_RECONSTRUCT':
                return (<p>Reconstructing the scene from connected imagery...</p>)
            case 'STATUS_MESHING':
                return (<p>Generating object mesh from scene...</p>)
            case 'STATUS_COMPDEPTH':
                return (<p>Computing depthmaps of mesh...</p>)
            case 'STATUS_CLEANDEPTH':
                return (<p>Cleaning up depthmaps of mesh...</p>)
            case 'STATUS_DONE':
                return (<p>Process Complete</p>)
        }
    }

    render() {
        return (
            <div className='modelgenerator'>
                <div className='generator__status'>
                    <GeneratorProgress status={ this.state.statusIndex } />
                    { this.getGeneratorStatus() }
                </div>
                <GeneratorView images={ this.state.images } />
            </div>
        )
    }
}