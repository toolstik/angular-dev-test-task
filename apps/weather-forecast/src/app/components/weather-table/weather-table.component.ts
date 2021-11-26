import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { WeatherTableData, WeatherTableDataItem } from './weather-table-data';

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTableComponent implements OnInit {

	data$$ = new ReplaySubject<WeatherTableData | null>(1);

	headers$ = this.data$$.pipe(map(data => {
		return data?.data?.map(this.columnText);
	}));

	cells$ = this.data$$.pipe(map(data => {
		return data?.data?.map(i => i.temperature);
	}));

	@Input() set data(value: WeatherTableData | null) {
		this.data$$.next(value);
	}

	@Input() columnText: (item: WeatherTableDataItem) => string = i => i?.date?.toISOString();

	ngOnInit(): void {
		return;
	}

}
