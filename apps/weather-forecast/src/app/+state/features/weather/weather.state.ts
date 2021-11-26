import { City, WeatherData, WeatherModeValue } from '@bp/weather-forecast/services';

export interface WeatherState {
	city: City |null,
	mode: WeatherModeValue,
	weather: WeatherData | null;
	loading: boolean;
	error?: string | null;
}

export const initialState: WeatherState = {
	city: null,
	mode: 'daily',
	weather: null,
	loading: false,
	error: null,
}
