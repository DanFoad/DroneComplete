import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'

import {} from '../style/global.scss'

import AppActions from '../actions/AppActions'

class FlightPlanner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: this.props.width,
            maxWidth: 1000,
            height: this.props.height,
            maxHeight: 1000,
            unit: this.props.unit,
        }

        this.toggleUnitSwitch = this.toggleUnitSwitch.bind(this)
    }

    componentDidMount() {
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        this.ctx = this.canvas.getContext('2d')
        
        var ctx = this.ctx
        var h = this.canvas.height
        var w = this.canvas.width
        var shift = 120

        // Cube
        ctx.fillStyle = '#444444'
        ctx.font = '256px FontAwesome'
        ctx.textAlign = 'center'
        ctx.fillText('', w/2 + 8, h/1.05 - shift)

        ctx.strokeStyle = '#2E7D32'

        // Upper ellipse
        ctx.beginPath()
        ctx.ellipse(w/2, h/3.2 - shift, w/3, w/14, 0, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()

        // Middle ellipse
        ctx.beginPath()
        ctx.ellipse(w/2, h/2 - shift, w/4, w/15, 0, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()

        // Lower ellipse
        ctx.beginPath()
        ctx.ellipse(w/2, h/1.5 - shift, w/6, w/20, 0, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()

        // Parallelogram around middle ellipse
        ctx.strokeStyle = '#1B5E20'
        ctx.beginPath()
        var poly = [
            (w/2 - w/4 - 38),(h/2 + w/15 - shift),
            (w/2 - w/4 + 36),(h/2 - w/15 - shift),
            (w/2 + w/4 + 38),(h/2 - w/15 - shift),
            (w/2 + w/4 - 36),(h/2 + w/15 - shift)
        ]
        ctx.moveTo(poly[0], poly[1])
        for (var i = 0; i < poly.length; i+=2) ctx.lineTo(poly[i], poly[i+1])
        ctx.lineTo(poly[0], poly[1])
        ctx.stroke()
        ctx.closePath()

        // Arrows

        // Set 1: Nadir
        ctx.beginPath()
        ctx.fillStyle = '#1B5E20'
        ctx.lineWidth = 6
        ctx.moveTo(poly[0] + 48, poly[1])
        ctx.lineTo(poly[0] + 48, poly[1] + 64)
        ctx.stroke()
        ctx.moveTo(poly[0] + 40, poly[1] + 64)
        ctx.lineTo(poly[0] + 56, poly[1] + 64)
        ctx.lineTo(poly[0] + 48, poly[1] + 76)
        ctx.fill()
        ctx.closePath()

        // Set 2: Oblique
        ctx.beginPath()
        ctx.strokeStyle = '#2E7D32'
        ctx.fillStyle = '#2E7D32'
        ctx.moveTo(w/2 + w/4, h/2 - shift)
        ctx.lineTo(w/2 + w/4 - 64, h/2 - shift + 64)
        ctx.stroke()
        ctx.moveTo(w/2 + w/4 - 56, h/2 - shift + 65)
        ctx.lineTo(w/2 + w/4 - 68, h/2 - shift + 59)
        ctx.lineTo(w/2 + w/4 - 70, h/2 - shift + 72)
        ctx.fill()
        ctx.closePath()

        // Set 3: Oblique
        ctx.beginPath()
        ctx.moveTo(w/2 + w/6, h/1.5 - shift)
        ctx.lineTo(w/2 + w/6 - 84, h/1.5 - shift + 44)
        ctx.stroke()
        ctx.moveTo(w/2 + w/6 - 78, h/1.5 - shift + 50)
        ctx.lineTo(w/2 + w/6 - 88, h/1.5 - shift + 39)
        ctx.lineTo(w/2 + w/6 - 96, h/1.5 - shift + 52)
        ctx.fill()
        ctx.closePath()

        // Set 4: Oblique
        ctx.beginPath()
        ctx.moveTo(w/2 + w/3, h/3.2 - shift)
        ctx.lineTo(w/2 + w/3 - 44, h/3.2 - shift + 84)
        ctx.stroke()
        ctx.moveTo(w/2 + w/3 - 36, h/3.2 - shift + 85)
        ctx.lineTo(w/2 + w/3 - 50, h/3.2 - shift + 81)
        ctx.lineTo(w/2 + w/3 - 48, h/3.2 - shift + 92)
        ctx.fill()
        ctx.closePath()

        // Text Titles
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 16px Roboto'
        ctx.textAlign = 'center'
        ctx.fillText('Set 1: Nadir', poly[0] + 48, poly[1] + shift)
        ctx.textAlign = 'left'
        ctx.fillText('Set 2: Oblique', w/2 + w/4 + 16, h/2 + 16 - shift)
        ctx.fillText('Set 3: Oblique', w/2 + w/6 + 16, h/1.5 + 16 - shift)
        ctx.fillText('Set 4: Oblique', w/2 + w/3 + 16, h/3.2 + 16 - shift)

        // Dotted Lines
        ctx.beginPath()
        ctx.strokeStyle = '#888888'
        ctx.lineWidth = 1
        ctx.setLineDash([5, 15])
        ctx.moveTo(w/2 - w/3, h/3.2 - shift)
        ctx.lineTo(w/2 - 128, h/1.05 - shift - 148)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(w/2 + w/3, h/3.2 - shift)
        ctx.lineTo(w/2 + 128, h/1.05 - shift - 148)
        ctx.stroke()
        ctx.closePath()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            width: nextProps.width,
            height: nextProps.height,
            unit: nextProps.unit,
        })
    }

    setWidth(value) {
        if (value <= this.state.maxWidth && value >= 0)
            AppActions.setFlightPlannerWidth(value)
    }

    setHeight(value) {
        if (value <= this.state.maxHeight && value >= 0)
            AppActions.setFlightPlannerHeight(value)
    }

    
    getUnitSwitch() {
        if (this.state.unit == 'metres') {
            return 'switch checked'
        } else {
            return 'switch'
        }
    }

    toggleUnitSwitch() {
        if (this.state.unit == 'metres') {
            AppActions.setFlightPlannerUnit('feet')
        } else {
            AppActions.setFlightPlannerUnit('metres')
        }
    }

    render() {
        return (
            <div className='flightplanner'>
                <div className='dimensions'>
                    <h2 className='dimensions__title'>Subject Dimensions</h2>
                    <div className='dimensions__input'>
                        <h3>Width</h3>
                        <input type='number' value={ this.state.width } min='0' max='1000' onChange={ (evt) => { this.setWidth(evt.target.value) } } />
                        <div className='dimensions__stepper dimensions__stepper--up' onClick={ () => { this.setWidth(this.state.width + 1) } }>
                            <i className='fa fa-caret-up' />
                        </div>
                        <div className='dimensions__stepper dimensions__stepper--down' onClick={ () => { this.setWidth(this.state.width - 1) } }>
                            <i className='fa fa-caret-down' />
                        </div>
                    </div>

                    <div className='dimensions__input'>
                        <h3>Height</h3>
                        <input type='number' value={ this.state.height } min='0' max='1000' onChange={ (evt) => { this.setHeight(evt.target.value) } } />
                        <div className='dimensions__stepper dimensions__stepper--up' onClick={ () => { this.setHeight(this.state.height + 1) } }>
                            <i className='fa fa-caret-up' />
                        </div>
                        <div className='dimensions__stepper dimensions__stepper--down' onClick={ () => { this.setHeight(this.state.height - 1) } }>
                            <i className='fa fa-caret-down' />
                        </div>
                    </div>

                    <div className='dimensions__switch'>
                        <span className='switch__label'>feet</span>
                        <div className={ this.getUnitSwitch() } onClick={this.toggleUnitSwitch}>
                            <span className='switch__slider' />
                        </div>
                        <span className='switch__label'>metres</span>
                    </div>
                </div>
                <div className='planner'>
                    <canvas ref={canvas => {this.canvas = canvas}} id='planner__canvas'></canvas>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        width: state.flightplanner.width,
        height: state.flightplanner.height,
        unit: state.flightplanner.unit,
    }
}
export default connect(mapStateToProps)(FlightPlanner)