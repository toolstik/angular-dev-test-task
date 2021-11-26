import { City } from "@bp/weather-forecast/services";
import { defineActions } from "../../../utils/store-utils";

export const CityActionTypes = {
	LOAD_REQUEST: '[City] Load Request',
	LOAD_FAILURE: '[City] Load Failure',
	LOAD_SUCCESS: '[City] Load Success'
} as const;

export const CityActions = defineActions(CityActionTypes)<{
	LOAD_REQUEST: { query: string },
	LOAD_SUCCESS: { city: City | null; },
	LOAD_FAILURE: { error: string | null; },
}>();
