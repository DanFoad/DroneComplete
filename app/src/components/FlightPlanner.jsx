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