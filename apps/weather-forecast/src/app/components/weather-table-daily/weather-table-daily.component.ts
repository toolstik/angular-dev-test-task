import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City, takeUntilDestroyed, WeatherDailyItem } from '@bp/weather-forecast/services';
import { combineLatest, map, ReplaySubject } from 'rxjs';

type WeatherDataLocal = {
	city: string,
	data: {
		date: Date,
		temperature: number,
	}[]
}

@Component({
	selector: 'bp-weather-table-daily',
	templateUrl: './weather-table-daily.component.html',
	styleUrls: ['./weather-table-daily.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTableDailyComponent {

	@Input() set data(value: WeatherDailyItem[] | null) {
		console.log('set data', value);
		this.data$$.next(value);
	}

	@Input() set city(value: City | null) {
		console.log('set city', value);
		this.city$$.next(value);
	}

	private data$$ = new ReplaySubject<WeatherDailyItem[] | null>(1);
	private city$$ = new ReplaySubject<City | null>(1);

	data$ = combineLatest([this.city$$, this.data$$]).pipe(
		takeUntilDestroyed(this),
		map(([city, data]) => {
			console.log('combine', city, data);

			return {
				city: city?.name,
				data: data?.map(i => {
					return {
						date: new Date(i.dt * 1000),
						temperature: i.temp.day,
					}
				})
			} as WeatherDataLocal;
		})
	);

}
