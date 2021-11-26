import { createReducer, on } from '@ngrx/store';
import { CityActions } from './city.actions';
import { initialState } from './city.state';

export const cityReducer = createReducer(
	initialState,
	on(CityActions.LOAD_REQUEST, (state) => ({ ...state, loading: true, error: null })),
	on(CityActions.LOAD_SUCCESS, (state, { city }) => {
		return {
			...state,
			current: city,
			loading: false,
			error: null,
		};
	}),
	on(CityActions.LOAD_FAILURE, (state, { error }) => {
		return {
			...state,
			current: null,
			loading: false,
			error,
		};
	}),
);

