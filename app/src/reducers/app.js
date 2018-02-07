import AppConstants from '../AppConstants'

export default (state = {}, payload) => {
    switch (payload.type) {
        case (AppConstants.APP_SET_PAGE): {
            return {
                ...state,
                page: payload.page,
            }
        }

        default: {
            return state
        }
    }
}