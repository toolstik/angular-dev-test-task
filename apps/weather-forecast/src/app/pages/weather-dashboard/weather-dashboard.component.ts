import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, WeatherModeValue } from '@bp/weather-forecast/services';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { CityFacade } from '../../+state/features/city/city.facade';
import { RouterFacade } from '../../+state/router.facade';

type QueryParams = {
	query: string;
	mode: WeatherModeValue
};

@Component({
	selector: 'bp-weather-dashboard',
	templateUrl: './weather-dashboard.component.html',
	styleUrls: ['./weather-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent {

	searchControl = new FormControl();

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private routerFacade: RouterFacade,
		private cityFacade: CityFacade
	) {
		this.init();
	}

	private init() {
		this.routerFacade
			.selectQueryParams<QueryParams>()
			.pipe(
				takeUntilDestroyed(this),
				tap(params => {
					console.log('params', params);
					this.cityFacade.loadCity(params.query);
					this.searchControl.setValue(params.query);
				})
			)
			.subscribe();

		this.searchControl.valueChanges
			.pipe(
				takeUntilDestroyed(this),
				debounceTime(600),
				distinctUntilChanged(),
				switchMap(query => this.router.navigate([], {
					relativeTo: this.activatedRoute,
					queryParams: { query },
					queryParamsHandling: 'merge'
				}))
			)
			.subscribe();
	}
}
