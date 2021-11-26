import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherTableComponentModule } from "../weather-table/weather-table.module";
import { WeatherTableDailyComponent } from "./weather-table-daily.component";


@NgModule({
	imports: [
		CommonModule,

		WeatherTableComponentModule,
	],
	declarations: [
		WeatherTableDailyComponent
	],
	exports: [
		WeatherTableDailyComponent
	]
})
export class WeatherTableDailyComponentModule {

}
