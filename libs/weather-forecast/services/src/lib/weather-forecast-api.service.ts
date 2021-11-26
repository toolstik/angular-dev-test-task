import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { City } from './models/city';
import { WeatherData } from "./models/weather-data";
import { WeatherModeValue } from "./models/weather-mode.enum";

@Injectable()
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';

	private readonly excludes = ['current', 'minutely', 'daily', 'hourly', 'alerts'];

	constructor(private http: HttpClient) { }

	getCities(query: string) {
		return this.http.get<City[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this._apiKey}`)
			.pipe(
				map(i => i[0])
			);
	}

	getWeather<T extends WeatherModeValue>(lat: number, lon: number, mode: T) {
		const exclude = this.excludes.filter(i => i !== mode).join(',');

		return this.http
			.get<WeatherData>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${this._apiKey}`);
	}

}
