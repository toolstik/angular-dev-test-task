import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City, takeUntilDestroyed, WeatherHourlyItem } from '@bp/weather-forecast/services';
import { combineLatest, map, ReplaySubject } from 'rxjs';
import { WeatherTableData, WeatherTableDataItem } from '../weather-table/weather-table-data';

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

	private data$$ = new ReplaySubject<WeatherHourlyItem[] | null>();
	private city$$ = new ReplaySubject<City | null>();

	data$ = combineLatest([this.city$$, this.data$$]).pipe(
		takeUntilDestroyed(this),
		map(([city, data]) => {
			return {
				city: city?.name,
				data: data?.map(i => {
					return {
						date: new Date(i.dt * 1000),
						temperature: i.temp,
					}
				}).filter(i => i.date.getHours() % 3 === 0).slice(0, 8)
			} as WeatherTableData;
		})
	);

	columnText = (i: WeatherTableDataItem) => String(new Date(i.date).getHours());

}
