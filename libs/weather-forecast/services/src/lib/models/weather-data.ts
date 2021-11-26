import { Pattern } from "../utils/pattern.type";
import { WeatherModeValue } from "./weather-mode.enum";

export type WeatherDailyItem = {
	dt: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
	}
}

export type WeatherHourlyItem = {
	dt: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
	}
}

export type WeatherData = Pattern<Record<WeatherModeValue, unknown[]>, {
	hourly: WeatherHourlyItem[],
	daily: WeatherDailyItem[],
}>
