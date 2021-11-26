import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from './features/features';

const selectRouter = createFeatureSelector<RouterReducerState>(Features.ROUTER);

const {
	selectQueryParams,
} = getSelectors(selectRouter);

@Injectable()
export class RouterFacade {

	private queryParams$ = this.store.pipe(select(selectQueryParams));

	constructor(private readonly store: Store) { }

	selectQueryParams<T extends Params>() {
		return this.queryParams$ as Observable<T>;
	}
}
