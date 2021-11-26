import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WeatherSelectors } from './weather.selectors';


@Injectable()
export class WeatherFacade {

	readonly weather$ = this.store.pipe(select(WeatherSelectors.weather));
	readonly daily$ = this.store.pipe(select(WeatherSelectors.daily));
	readonly hourly$ = this.store.pipe(select(WeatherSelectors.hourly));

	constructor(private readonly store: Store) { }

}
