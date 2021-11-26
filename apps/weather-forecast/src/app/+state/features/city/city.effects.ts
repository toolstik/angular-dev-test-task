import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { CityActions } from './city.actions';


@Injectable()
export class CityEffects {
	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CityActions.LOAD_REQUEST),
			switchMap(action => {
				if (!action.query) {
					return of(CityActions.LOAD_SUCCESS({ city: null }));
				}

				return this.weatherService.getCities(action.query).pipe(
					map(city => CityActions.LOAD_SUCCESS({ city })),
					catchError(error => error.cod === 404
						? of(CityActions.LOAD_SUCCESS({ city: null }))
						: of(CityActions.LOAD_FAILURE({ error }))
					),
				);
			}),

		)
	);

	constructor(
		private readonly actions$: Actions,
		private weatherService: WeatherForecastApiService,
	) { }
}
