import app from './app'
import flightplanner from './flightplanner'

const reducers = [
    app,
    flightplanner,
];

export default (state, action) => {
    return reducers.reduce((currentState, reducer) => {
        return reducer(currentState, action);
    }, state);
};
