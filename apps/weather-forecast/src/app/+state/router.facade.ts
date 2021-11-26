import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { WeatherMode, WeatherModeValue } from '@bp/weather-forecast/services';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from './features/features';

const selectRouter = createFeatureSelector<RouterReducerState>(Features.ROUTER);

export const {
	selectCurrentRoute,   // select the current route
	selectQueryParams,    // select the current route query params
	selectQueryParam,     // factory function to select a query param
	selectRouteParams,    // select the current route params
	selectRouteParam,     // factory function to select a route param
	selectRouteData,      // select the current route data
	selectUrl,            // select the current url
} = getSelectors(selectRouter);

export const selectQuery = createSelector(selectQueryParam('query'), i => i);
export const selectMode = createSelector(selectQueryParam('mode'), i => i as WeatherModeValue || WeatherMode.DAILY)

@Injectable()
export class RouterFacade {

	private queryParams$ = this.store.pipe(select(selectQueryParams));
	readonly state$ = this.store.pipe(select(selectRouter));
	readonly mode$ = this.store.pipe(select(selectMode));
	readonly query$ = this.store.pipe(select(selectQuery));

	constructor(private readonly store: Store) { }

	selectQueryParams<T extends Params>() {
		return this.queryParams$ as Observable<T>;
	}
}
