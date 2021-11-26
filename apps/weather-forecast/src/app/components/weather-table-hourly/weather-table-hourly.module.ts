import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherTableComponentModule } from "../weather-table/weather-table.module";
import { WeatherTableHourlyComponent } from "./weather-table-hourly.component";


@NgModule({
	imports: [
		CommonModule,

		WeatherTableComponentModule,
	],
	declarations: [
		WeatherTableHourlyComponent
	],
	exports: [
		WeatherTableHourlyComponent
	]
})
export class WeatherTableHourlyComponentModule {

}
