import { WeatherData, WeatherModeValue } from "@bp/weather-forecast/services";
import { defineActions } from "../../../utils/store-utils";

export const WeatherActionTypes = {
	LOAD_REQUEST: '[Weather] Load Request',
	LOAD_FAILURE: '[Weather] Load Failure',
	LOAD_SUCCESS: '[Weather] Load Success',
	CLEAR_DATA: '[Weather] Clear Data',
} as const;

export const WeatherActions = defineActions(WeatherActionTypes)<{
	LOAD_REQUEST: { mode: WeatherModeValue, lat: number; lon: number; },
	LOAD_SUCCESS: { weather: WeatherData | null; },
	LOAD_FAILURE: { error: string | null; },
	CLEAR_DATA: void,
}>();
