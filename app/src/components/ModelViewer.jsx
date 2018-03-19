import React, {Component} from 'react'
import {render} from 'react-dom'
import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'
import MTLLoader from 'three-mtl-loader'

OBJLoader(THREE)

import {} from '../style/global.scss'

import ViewerBar from './ViewerBar.jsx'

export default class ModelViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pos: {
                x: 0,
                y: 1.3,
                z: 50,
            },
            dragging: false,
            rotating: false,
            dragStart: {
                x: 0, 
                y: 0,
            },
            rotationStart: {
                x: 0,
                z: 0,
            },
            rot: {
                x: 0,
                y: 0,
                z: 0,
            },
            details: {
                vertices: 0,
                faces: 0,
                materials: 0,
            }
        }

        this.animate = this.animate.bind(this)
        this.setFace = this.setFace.bind(this)
    }

    componentDidMount() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 1000)

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
        this.renderer.setClearColor(0xFFFFFF)
        this.canvas.appendChild(this.renderer.domElement)

        
        var mtlLoader = new MTLLoader();
        mtlLoader.setPath('src/odm_texturing/')
        mtlLoader.load('odm_textured_model.mtl', (materials) => {
            materials.preload()
            var materialCount = Object.keys(materials.materials).length
            this.setState({ details: {...this.state.details, materials: materialCount } })

        })
        /*   var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(materials)
            objLoader.setPath('src/odm_texturing/')
            objLoader.load('odm_textured_model.obj', (obj) => {
                console.log(obj)
                this.model = obj
                this.scene.add(this.model)
    
                var Light = new THREE.AmbientLight(0x45Ab76)
                Light.position.set(new THREE.Vector3(10, 10, 10))
                var Light2 = new THREE.PointLight(0xFFFFFF)
                Light2.position.set(new THREE.Vector3(10, 10, 10))
                this.scene.add(Light)
                this.scene.add(Light2)
    
                this.setupListeners()
    
                this.animate()
            })
        })*/

        var loader = new THREE.OBJLoader()
        loader.load('src/img/odm_textured_model.obj', (obj) => {
            this.model = obj
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    var geo = new THREE.Geometry().fromBufferGeometry(child.geometry)
                    this.setState({ details: { ...this.state.details, vertices: geo.vertices.length, faces: geo.faces.length } })
                    child.material = new THREE.MeshNormalMaterial()
                }
            })
            this.scene.add(this.model)

            var Light = new THREE.AmbientLight(0x45Ab76)
            Light.position.set(new THREE.Vector3(10, 10, 10))
            var Light2 = new THREE.PointLight(0xFFFFFF)
            Light2.position.set(new THREE.Vector3(10, 10, 10))
            this.scene.add(Light)
            this.scene.add(Light2)

            this.setupListeners()

            this.animate()
        })
    }

    setupListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.which == 1) {
                this.setState({
                    dragging: true,
                    dragStart: {
                        x: e.pageX,
                        y: e.pageY,
                    }
                })
            } else if (e.which == 3) {
                this.setState({
                    rotating: true,
                    rotationStart: {
                        x: e.pageX,
                        y: e.pageY,
                    }
                })
            }
        })
        this.canvas.addEventListener('mouseup', (e) => {
            if (e.which == 1) {
                this.setState({dragging: false})
            } else if (e.which == 3) {
                this.setState({rotating: false})
            }
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.state.dragging) {
                this.setState({
                    pos: {
                        x: this.state.pos.x += (this.state.dragStart.x - e.pageX) / 10,
                        y: this.state.pos.y += (e.pageY - this.state.dragStart.y) / 10,
                        z: this.state.pos.z,
                    },
                    dragStart: {
                        x: e.pageX,
                        y: e.pageY,
                    }
                })
            }
            if (this.state.rotating) {
                this.setState({
                    rot: {
                        x: this.state.rot.x += ((e.pageY - this.state.dragStart.y) / 1000) * Math.PI / 180,
                        y: this.state.rot.y,
                        z: this.state.rot.z += ((this.state.dragStart.x - e.pageX) / 1000) * Math.PI / 180,
                    }
                })
            }
        })
        this.canvas.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.setState({
                    pos: { ...this.state.pos, z: this.state.pos.z + 10 }
                })
            } else {
                this.setState({
                    pos: { ...this.state.pos, z: this.state.pos.z - 10 }
                })
            }
        })
    }

    animate() {
        requestAnimationFrame(this.animate)

        this.model.rotation.x = this.state.rot.x
        this.model.rotation.y = this.state.rot.y
        this.model.rotation.z = this.state.rot.z

        this.camera.position.x = this.state.pos.x
        this.camera.position.y = this.state.pos.y
        this.camera.position.z = this.state.pos.z

        this.renderer.render(this.scene, this.camera)
    }

    setFace(face) {
        switch (face) {
            case 'top':
                this.setState({ rot: { x: Math.PI / 2, y: 0, z: 0 } })
                break
            case 'bottom':
                this.setState({ rot: { x: -Math.PI / 2, y: 0, z: 0 } })
                break
            case 'front':
                this.setState({ rot: { x: 0, y: 0, z: 0 } })
                break
            case 'back':
                this.setState({ rot: { x: 0, y: Math.PI, z: 0 } })
                break
            case 'left':
                this.setState({ rot: { x: 0, y: Math.PI / 2, z: 0 } })
                break
            case 'right':
                this.setState({ rot: { x: 0, y: -Math.PI / 2, z: 0 } })
                break
        }
    }

    render() {

        return (
            <div className='modelviewer'>
                <ViewerBar callback={ this.setFace }/>
                <div ref={canvas => this.canvas = canvas} className='viewercanvas'></div>
                <div className='viewer__details'>
                    <h3>Information</h3>
                    <p>Material Count<span>{ this.state.details.materials }</span></p>
                    <p>Vertex Count<span>{ this.state.details.vertices }</span></p>
                    <p>Face Count<span>{ this.state.details.faces }</span></p>
                </div>
            </div>
        )
    }
}