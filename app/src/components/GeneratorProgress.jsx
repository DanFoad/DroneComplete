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

    isCurrent(index) {
        return index == this.state.status
    }

    isComplete(index) {
        if (index <= this.state.status)
            return ' complete'
        else
            return '';
    }

    displayProgressBar() {
        var sections = [
            'Loading Images', 'Resizing Images', 'Extracting Focal Lengths', 'Extracting HAHOG Features',
            'Matching Image Pairs', 'Merging Features', 'Reconstructing Scene', 'Meshing',
            'Computing Depthmaps', 'Cleaning Depthmaps', 'Complete',
        ]

        var bar = []

        sections.forEach((el, index) => {
            bar.push(
                <div className={'progress__section' + this.isComplete(index)} key={ index }>
                    { index + 1 }
                    { this.isCurrent(index) ? (<div className='progress__section--state'>{ el }</div>) : '' }
                </div>
            )
            
            if (index !== sections.length - 1)
                bar.push(<div className={'progress__bar' + this.isComplete(index + 1)} key={ 'bar' + index }></div>)
        })

        return (<div className='generator__progress'> { bar } </div>)
    }

    render() {
        return this.displayProgressBar()
    }
}