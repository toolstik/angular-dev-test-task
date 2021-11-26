import { WeatherData } from '@bp/weather-forecast/services';

export interface WeatherState {
	weather: WeatherData | null;
	loading: boolean;
	error?: string | null;
}

export const initialState: WeatherState = {
	weather: null,
	loading: false,
	error: null,
}
