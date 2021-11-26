import { WeatherData } from '@bp/weather-forecast/services';
import { createReducer, on } from '@ngrx/store';
import { WeatherActions } from './weather.actions';
import { initialState } from './weather.state';

export const weatherReducer = createReducer(
	initialState,
	on(
		WeatherActions.CITY_LOAD_REQUEST,
		WeatherActions.MODE_LOAD_REQUEST,
		(state) => ({ ...state, loading: true, error: null })
	),
	on(WeatherActions.LOAD_SUCCESS, (state, { city, mode, weather }) => {

		if (state.city?.name !== city?.name) {
			return {
				...state,
				city,
				mode,
				weather,
				loading: false,
				error: null,
			}
		}

		const newWeather = {
			...(state.weather || {}),
			[mode]: weather?.[mode],
		} as WeatherData;

		return {
			...state,
			mode,
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
);

