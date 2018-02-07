import AppConstants from '../AppConstants'

export default (state = {}, payload) => {
    switch (payload.type) {
        case (AppConstants.FLIGHTPLANNER_SET_WIDTH): {
            const flightplanner = { ...state.flightplanner }
            flightplanner.width = payload.width

            return {
                ...state,
                flightplanner,
            }
        }

        case (AppConstants.FLIGHTPLANNER_SET_HEIGHT): {
            const flightplanner = { ...state.flightplanner }
            flightplanner.height = payload.height

            return {
                ...state,
                flightplanner,
            }
        }

        case (AppConstants.FLIGHTPLANNER_SET_UNIT): {
            const flightplanner = { ...state.flightplanner }
            flightplanner.unit = payload.unit

            return {
                ...state,
                flightplanner,
            }
        }

        default: {
            return state
        }
    }
}