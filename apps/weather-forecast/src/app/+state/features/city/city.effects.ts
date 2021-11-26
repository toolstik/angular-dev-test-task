import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectQuery } from '../../router.facade';
import { CityActions } from './city.actions';


@Injectable()
export class CityEffects {

	routerNavigated$ = createEffect(() => this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		withLatestFrom(this.store.select(selectQuery)),
		map(([, query]) => query),
		distinctUntilChanged(),
		map(query => CityActions.LOAD_REQUEST({ query: query || '' }))
	));

	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CityActions.LOAD_REQUEST),
			switchMap(action => {
				if (!action.query) {
					return of(CityActions.LOAD_SUCCESS({ city: null }));
				}

				return this.weatherService.getCities(action.query).pipe(
					map(city => CityActions.LOAD_SUCCESS({ city })),
					catchError(error => {
						return error.error?.cod === '404'
							? of(CityActions.LOAD_SUCCESS({ city: null }))
							: of(CityActions.LOAD_FAILURE({ error }))
					}
					),
				);
			}),

		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store: Store,
		private weatherService: WeatherForecastApiService,
	) { }
}
