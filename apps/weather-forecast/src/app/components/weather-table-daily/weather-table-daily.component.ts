import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';

type WeatherData = {
	city: string,
	data: {
		date: Date,
		temperature: number,
	}[]
}

const TEST_DATA: WeatherData = {
	city: 'London',
	data: [
		{
			date: new Date(),
			temperature: 15,
		},
		{
			date: new Date(),
			temperature: 13,
		},
		{
			date: new Date(),
			temperature: 14,
		},
		{
			date: new Date(),
			temperature: 20,
		},
		{
			date: new Date(),
			temperature: 16,
		},
		{
			date: new Date(),
			temperature: 5,
		},
		{
			date: new Date(),
			temperature: -2,
		},
	]
}

@Component({
	selector: 'bp-weather-table-daily',
	templateUrl: './weather-table-daily.component.html',
	styleUrls: ['./weather-table-daily.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTableDailyComponent implements OnInit {

	@Input() set data(value: WeatherData) {
		this.data$$.next(value);
	}

	private data$$ = new Subject<WeatherData>();

	data$ = this.data$$.asObservable();

	ngOnInit(): void {

		setTimeout(() => {
			this.data = TEST_DATA;
		}, 3000);

	}

}
