import store from '../store.js'

import AppConstants from '../AppConstants'

const init = () => {

}

const setPage = (page) => {
    store.dispatch({
        type: AppConstants.APP_SET_PAGE,
        page
    })
}

const setFlightPlannerWidth = (width) => {
    store.dispatch({
        type: AppConstants.FLIGHTPLANNER_SET_WIDTH,
        width
    })
}

const setFlightPlannerHeight = (height) => {
    store.dispatch({
        type: AppConstants.FLIGHTPLANNER_SET_HEIGHT,
        height
    })
}

const setFlightPlannerUnit = (unit) => {
    store.dispatch({
        type: AppConstants.FLIGHTPLANNER_SET_UNIT,
        unit
    })
}

export default {
    init,
    setPage,

    // Flight Planner Actions
    setFlightPlannerWidth,
    setFlightPlannerHeight,
    setFlightPlannerUnit,
}