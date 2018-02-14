import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'

import {} from './style/global.scss'

import AppActions from './actions/AppActions'

import Titlebar from './components/Titlebar.jsx'
import Sidebar from './components/Sidebar.jsx'
import FlightPlanner from './components/FlightPlanner.jsx'
import ModelGenerator from './components/ModelGenerator.jsx'
import ModelViewer from './components/ModelViewer.jsx'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: props.page,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page,
        })
    }

    getCurrentPage() {
        var page = this.state.page;

        switch(page) {
            case 0:
                return <FlightPlanner />
            case 1:
                return <ModelGenerator />
            case 2:
                return <ModelViewer />
            default:
                return <div></div>
        }
    }

    render() {
        return (
            <div className='main'>
                <Titlebar />
                <div className='contents'>
                    <Sidebar />
                    <div className='page'>
                        { this.getCurrentPage() }
                    </div>
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
export default connect(mapStateToProps)(App)