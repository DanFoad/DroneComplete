import React, {Component} from 'react'
import {render} from 'react-dom'
import * as THREE from 'three'

import {} from '../style/global.scss'

import ViewerBar from './ViewerBar.jsx'

export default class ModelViewer extends Component {
    constructor(props) {
        super(props)

        this.animate = this.animate.bind(this)
    }

    componentDidMount() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 1000)

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
        this.renderer.setClearColor(0xFFFFFF)
        this.canvas.appendChild(this.renderer.domElement)

        var geometry = new THREE.BoxBufferGeometry(3, 3, 3)
        var edges = new THREE.EdgesGeometry(geometry)
        this.cube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x444444}))
        this.scene.add(this.cube)

        this.camera.position.z = 5

        this.animate()
    }

    animate() {
        requestAnimationFrame(this.animate)

        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div className='modelviewer'>
                <ViewerBar />
                <div ref={canvas => this.canvas = canvas} className='viewercanvas'></div>
            </div>
        )
    }
}