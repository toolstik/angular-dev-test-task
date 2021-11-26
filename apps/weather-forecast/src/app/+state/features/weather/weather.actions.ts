import { City, WeatherData, WeatherModeValue } from "@bp/weather-forecast/services";
import { defineActions } from "../../../utils/store-utils";

export const WeatherActionTypes = {
	MODE_LOAD_REQUEST: '[Weather] Load Request By Mode',
	CITY_LOAD_REQUEST: '[Weather] Load Request By City',
	LOAD_FAILURE: '[Weather] Load Failure',
	LOAD_SUCCESS: '[Weather] Load Success',
	CLEAR_DATA: '[Weather] Clear Data',
} as const;

export const WeatherActions = defineActions(WeatherActionTypes)<{
	MODE_LOAD_REQUEST: { mode: WeatherModeValue },
	CITY_LOAD_REQUEST: { city: City },
	LOAD_SUCCESS: { city: City | null, mode: WeatherModeValue, weather: WeatherData | null; },
	LOAD_FAILURE: { error: string | null; },
	CLEAR_DATA: void,
}>();
