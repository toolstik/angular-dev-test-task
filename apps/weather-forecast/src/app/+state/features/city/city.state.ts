import { City } from '@bp/weather-forecast/services';

export interface CityState {
	current: City | null;
	loading: boolean;
	error?: string | null;
}

export const initialState: CityState = {
	current: null,
	loading: false,
	error: null,
}
