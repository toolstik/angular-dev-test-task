import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City, takeUntilDestroyed, WeatherHourlyItem } from '@bp/weather-forecast/services';
import { combineLatest, map, Subject } from 'rxjs';

type WeatherDataLocal = {
	city: string,
	data: {
		date: Date,
		temperature: number,
	}[]
}

@Component({
	selector: 'bp-weather-table-hourly',
	templateUrl: './weather-table-hourly.component.html',
	styleUrls: ['./weather-table-hourly.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTableHourlyComponent {

	@Input() set data(value: WeatherHourlyItem[] | null) {
		this.data$$.next(value);
	}

	@Input() set city(value: City | null) {
		this.city$$.next(value);
	}

	private data$$ = new Subject<WeatherHourlyItem[] | null>();
	private city$$ = new Subject<City | null>();

	data$ = combineLatest([this.city$$, this.data$$]).pipe(
		takeUntilDestroyed(this),
		map(([city, data]) => {
			console.log('hourly', city, data);
			return {
				city: city?.name,
				data: data?.map(i => {
					return {
						date: new Date(i.dt * 1000),
						temperature: i.temp,
					}
				})
			} as WeatherDataLocal;
		})
	);

}
