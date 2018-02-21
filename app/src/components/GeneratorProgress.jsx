import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'

import {} from '../style/global.scss'

import AppActions from '../actions/AppActions'

export default class GeneratorProgress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status: props.status
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        })
    }

    render() {
        return (
            <div className='generator__progress'>

            </div>
        )
    }
}