import { Injectable } from '@angular/core';
import { coordsEqual, WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectMode } from '../../router.facade';
import { CityActions } from '../city/city.actions';
import { WeatherActions } from './weather.actions';
import { WeatherSelectors } from './weather.selectors';


@Injectable()
export class WeatherEffects {

	modeChanged$ = createEffect(() => this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		withLatestFrom(this.store.select(selectMode)),
		map(([, mode]) => mode),
		distinctUntilChanged(),
		withLatestFrom(this.store.pipe(select(WeatherSelectors.state))),
		switchMap(([mode, state]) => {
			const { weather } = state;
			if (!weather || weather[mode]) {
				return of();
			}

			const { lat, lon } = weather;

			if (!lat || !lon) {
				return of();
			}

			return of(WeatherActions.LOAD_REQUEST({ mode, lat, lon }))

		})
	));

	cityChanged$ = createEffect(() => this.actions$.pipe(
		ofType(CityActions.LOAD_SUCCESS),
		map(a => a.city),
		distinctUntilChanged(coordsEqual),
		withLatestFrom(this.store.select(selectMode), this.store.pipe(select(WeatherSelectors.state))),
		switchMap(([city, mode, state]) => {
			if (!city?.lon || !city?.lat) {
				return of(WeatherActions.LOAD_SUCCESS({ weather: null }));
			}

			const { weather } = state;
			const { lat, lon } = city;

			if (coordsEqual(city, weather)) {
				return of();
			}

			return of(WeatherActions.LOAD_REQUEST({ mode, lat, lon }));

		})
	));

	loadRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherActions.LOAD_REQUEST),
			switchMap(({ mode, lat, lon }) => {
				return this.weatherService.getWeather(lat, lon, mode)
					.pipe(
						map(weather => WeatherActions.LOAD_SUCCESS({ weather })),
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
