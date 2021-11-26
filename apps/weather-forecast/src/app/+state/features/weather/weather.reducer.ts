import { coordsEqual, WeatherData } from '@bp/weather-forecast/services';
import { createReducer, on } from '@ngrx/store';
import { WeatherActions } from './weather.actions';
import { initialState } from './weather.state';

export const weatherReducer = createReducer(
	initialState,
	on(
		WeatherActions.LOAD_REQUEST,
		(state) => ({ ...state, loading: true, error: null })
	),
	on(WeatherActions.LOAD_SUCCESS, (state, { weather }) => {

		if (!coordsEqual(weather, state.weather)) {
			return {
				...state,
				weather,
				loading: false,
				error: null,
			}
		}

		const newWeather = {
			...state.weather,
			...weather,
		} as WeatherData;

		return {
			...state,
			weather: newWeather,
			loading: false,
			error: null,
		};
	}),
	on(WeatherActions.LOAD_FAILURE, (state, { error }) => {
		return {
			...state,
			weather: null,
			loading: false,
			error,
		};
	}),
	on(WeatherActions.CLEAR_DATA, state => {
		return {
			...state,
			weather: null,
		};
	}),
);

