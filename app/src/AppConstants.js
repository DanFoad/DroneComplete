import keymirror from 'keymirror'

var actions = keymirror({
    APP_SET_PAGE: null,
    
    FLIGHTPLANNER_SET_WIDTH: null,
    FLIGHTPLANNER_SET_HEIGHT: null,
    FLIGHTPLANNER_SET_UNIT: null,
})
var consts = {
    
}
export default { ...actions, ...consts }