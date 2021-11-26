import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WeatherModeValue } from '@bp/weather-forecast/services';
import { WeatherSelectors } from './weather.selectors';
import { WeatherActions } from './weather.actions';


@Injectable()
export class WeatherFacade {

	readonly state$ = this.store.pipe(select(WeatherSelectors.state));

	constructor(private readonly store: Store) { }

	loadByMode(mode: WeatherModeValue) {
		this.store.dispatch(WeatherActions.MODE_LOAD_REQUEST({ mode }));
	}

}
