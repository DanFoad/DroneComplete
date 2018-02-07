import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'

import {} from '../style/global.scss'

import AppActions from '../actions/AppActions'

class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.getNavItems = this.getNavItems.bind(this)
    }

    selectPage(page) {
        AppActions.setPage(page)
    }

    getNavItems() {
        const classNames = []

        for (var i = 0; i < 3; i++) {
            classNames[i] = 'nav__item'
            if (i == this.props.page) classNames[i] += ' selected'
        }

        const items = [
            (<li className={classNames[0]} key='0' onClick={ () => { this.selectPage(0) } } ><i className='fa fa-plane' />Flight Planner</li>),
            (<li className={classNames[1]} key='1' onClick={ () => { this.selectPage(1) } } ><i className='fa fa-share-alt' />Model Generator</li>),
            (<li className={classNames[2]} key='2' onClick={ () => { this.selectPage(2) } } ><i className='fa fa-cube' />Model Viewer</li>),
        ]

        return (
            <ul className='nav'>
                { items }
            </ul>
        )
    }

    render() {
        return (
            <div className='sidebar'>
                <h1 className='sidebar__title'>DroneComplete</h1>
                { this.getNavItems() }
                <div className='sidebar__footer'>
                    <div className='sidebar__settings'><i className='fa fa-gears' /></div>
                    <h3 className='sidebar__credits'>Dan Foad BEng Project</h3>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        page: state.page,
    }
}
export default connect(mapStateToProps)(Sidebar)