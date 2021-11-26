import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { CityActions } from '../city/city.actions';
import { WeatherActions } from './weather.actions';
import { WeatherSelectors } from './weather.selectors';


@Injectable()
export class WeatherEffects {
	cityLoaded$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CityActions.LOAD_SUCCESS),
			switchMap(({ city }) => {
				if (!city) {
					return of(WeatherActions.CLEAR_DATA())
				}

				return of(WeatherActions.CITY_LOAD_REQUEST({ city }));
			}),
		)
	);

	loadByCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherActions.CITY_LOAD_REQUEST),
			withLatestFrom(this.store.pipe(select(WeatherSelectors.state))),
			switchMap(([{ city }, state]) => {
				if (!city) {
					return of(WeatherActions.CLEAR_DATA())
				}

				// same city, do nothing
				if (city.name === state.city?.name) {
					return of();
				}

				const { mode } = state;
				const { lat, lon } = city;

				return this.weatherService.getWeather(lat, lon, mode)
					.pipe(
						map(weather => WeatherActions.LOAD_SUCCESS({ city, mode, weather })),
						catchError(error => of(WeatherActions.LOAD_FAILURE({ error })))
					);
			}),
		)
	);

	loadByMode$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherActions.MODE_LOAD_REQUEST),
			withLatestFrom(this.store.pipe(select(WeatherSelectors.state))),
			switchMap(([{ mode }, state]) => {

				// that mode data already exists, do nothing
				if (state.weather?.[mode]) {
					console.log('mode exists', mode)
					return of();
				}

				const { city } = state;

				// city is not defined yet, do nothing
				if (!city) {
					console.log('no city', mode)
					return of();
				}

				const { lat, lon } = city;

				return this.weatherService.getWeather(lat, lon, state.mode)
					.pipe(
						map(weather => WeatherActions.LOAD_SUCCESS({ city, mode, weather })),
						catchError(error => of(WeatherActions.LOAD_FAILURE({ error })))
					);
			}),
		)
	);

	constructor(
		private readonly store: Store,
		private readonly actions$: Actions,
		private weatherService: WeatherForecastApiService,
	) { }
}
