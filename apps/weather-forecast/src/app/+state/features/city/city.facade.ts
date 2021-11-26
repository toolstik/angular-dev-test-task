import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CityActions } from './city.actions';
import { CitySelectors } from './city.selectors';


@Injectable()
export class CityFacade {

	readonly currentCity$ = this.store.pipe(select(CitySelectors.current));

	constructor(private readonly store: Store) { }

	loadCity(query: string) {
		this.store.dispatch(CityActions.LOAD_REQUEST({ query: query ?? '' }));
	}

}
