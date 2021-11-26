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
	temp: number;
}

export type WeatherData = { lat: number; lon: number } & Pattern<Record<WeatherModeValue, unknown[]>, {
	hourly: WeatherHourlyItem[],
	daily: WeatherDailyItem[],
}>

export function coordsEqual<
	X extends { lat: number, lon: number },
	Y extends { lat: number, lon: number } = X
>(x: X | null, y: Y | null) {
	return x?.lat === y?.lat && x?.lon === y?.lon;
}
