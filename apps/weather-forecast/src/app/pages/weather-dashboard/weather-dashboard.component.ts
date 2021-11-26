import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, WeatherMode, WeatherModeValue } from '@bp/weather-forecast/services';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { CityFacade } from '../../+state/features/city/city.facade';
import { WeatherFacade } from '../../+state/features/weather/weather.facade';
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
	modeControl = new FormControl(WeatherMode.DAILY);

	city$ = this.cityFacade.currentCity$;
	weather$ = this.weatherFacade.weather$;
	daily$ = this.weatherFacade.daily$;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private routerFacade: RouterFacade,
		private cityFacade: CityFacade,
		private weatherFacade: WeatherFacade,
	) {
		this.init();
	}

	private init() {
		this.routerFacade
			.selectQueryParams<QueryParams>()
			.pipe(
				takeUntilDestroyed(this),
				tap(params => {
					const { query, mode } = (params || {});

					this.cityFacade.loadCity(query);
					this.weatherFacade.loadByMode(mode || WeatherMode.DAILY);
					this.searchControl.setValue(query);
					this.modeControl.setValue(mode || WeatherMode.DAILY);
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

		this.modeControl.valueChanges
			.pipe(
				takeUntilDestroyed(this),
				distinctUntilChanged(),
				switchMap(mode => this.router.navigate([], {
					relativeTo: this.activatedRoute,
					queryParams: { mode },
					queryParamsHandling: 'merge'
				}))
			)
			.subscribe();
	}
}
