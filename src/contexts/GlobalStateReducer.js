// Nico Vermaas - 2 jul 2021
// This is the reducer for the global state provider.

// possible actions
export const SET_STATUS_ASTEROIDS = 'SET_STATUS_ASTEROIDS'
export const SET_FETCHED_ASTEROIDS = 'SET_FETCHED_ASTEROIDS'

export const SET_STATUS_EXOPLANETS = 'SET_STATUS_EXOPLANETS'
export const SET_FETCHED_EXOPLANETS = 'SET_FETCHED_EXOPLANETS'
export const SET_FILTERED_EXOPLANETS = 'SET_FILTERED_EXOPLANETS'
export const SET_SELECTED_EXOPLANET = 'SET_SELECTED_EXOPLANET'

export const SET_STATUS_UCAC4 = 'SET_STATUS_UCAC4'
export const SET_FETCHED_UCAC4 = 'SET_FETCHED_UCAC4'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_RELOAD = 'ALADIN_RELOAD'

export const SHOW_PLANETLIST = 'SHOW_PLANETLIST'

// HIPS page
export const SET_SELECTED_SURVEY = 'SET_SELECTED_SURVEY'
export const SET_SELECTED_CATALOG = 'SET_SELECTED_CATALOG'
export const SET_MAGNITUDE_LIMIT = 6

export const initialState = {
        status_asteroids   : "unfetched",
        fetched_asteroids  : undefined,

        status_exoplanets  : "unfetched",
        fetched_exoplanets : undefined,
        filtered_exoplanets: undefined,
        selected_exoplanet : undefined,

        status_ucac4       : "unfetched",
        fetched_ucac4      : undefined,

        aladin_ra: "82.0",
        aladin_dec: "7.0",
        aladin_fov: "2",

        show_planetlist  : false,

        selected_survey  : 'DSS colored',
        selected_catalog : 'tycho2',
        magnitude_limit  : "10",

        status_ucuc4 : "unfetched",
}

export const reducer = (state, action) => {
    switch (action.type) {

        case SET_STATUS_ASTEROIDS:
            return {
                ...state,
                status_asteroids: action.status_asteroids
            };

        case SET_FETCHED_ASTEROIDS:
            return {
                ...state,
                fetched_asteroids: action.fetched_asteroids
            };

        case SET_STATUS_EXOPLANETS:
            return {
                ...state,
                status_exoplanets: action.status_exoplanets
            };

        case SET_FETCHED_EXOPLANETS:
            return {
                ...state,
                fetched_exoplanets: action.fetched_exoplanets
            };

        case SET_FILTERED_EXOPLANETS:
            return {
                ...state,
                filtered_exoplanets: action.filtered_exoplanets
            };

        case SET_SELECTED_EXOPLANET:
            //alert(action.selected_exoplanet)
            return {
                ...state,
                selected_exoplanet: action.selected_exoplanet
            };

        case SET_STATUS_UCAC4:
            return {
                ...state,
                status_ucuc4: action.status_ucuc4
            };

        case SET_FETCHED_UCAC4:
            return {
                ...state,
                fetched_ucac4: action.fetched_ucac4
            };

        case ALADIN_RA:

            return {
                ...state,
                aladin_ra: action.aladin_ra
            };

        case ALADIN_DEC:
            return {
                ...state,
                aladin_dec: action.aladin_dec
            };

        case ALADIN_FOV:
            return {
                ...state,
                aladin_fov: action.aladin_fov
            };

        case ALADIN_RELOAD:

            return {
                ...state,
                aladin_reload: action.aladin_reload
            };

        case SHOW_PLANETLIST:

            return {
                ...state,
                show_planetlist: action.show_planetlist
            };

        case SET_SELECTED_SURVEY:
            return {
                ...state,
                selected_survey: action.selected_survey
            };

        case SET_SELECTED_CATALOG:
            return {
                ...state,
                selected_catalog: action.selected_catalog
            };

        case SET_MAGNITUDE_LIMIT:
            return {
                ...state,
                magnitude_limit: action.magnitude_limit
            };
        default:
            return state;
    }
};