import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'

import {} from '../style/global.scss'

import AppActions from '../actions/AppActions'

export default class GeneratorView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: props.images
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images
        })
    }

    showImages() {
        var items = []

        for (var i = 0; i < this.state.images.length; i++) {
            items.push(
                <div className='generator__item' key={i}>
                    <p className='generator__filename'>{ this.state.images[i].replace('_thumb.jpeg', '.jpeg') }</p>
                    <img src={ './src/img/thumbs/' + this.state.images[i] } />
                    <div className='generator__progress'></div>
                </div>
            )
        }

        return (
            <div className='generator__items'>
                { items }
            </div>
        )
    }

    render() {
        return this.showImages()
    }
}