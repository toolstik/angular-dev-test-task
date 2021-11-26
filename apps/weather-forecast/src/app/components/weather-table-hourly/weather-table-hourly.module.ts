import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherTableHourlyComponent } from "./weather-table-hourly.component";


@NgModule({
	imports: [
		CommonModule,
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
