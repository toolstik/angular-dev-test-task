import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherTableDailyComponent } from "./weather-table-daily.component";


@NgModule({
	imports: [
		CommonModule,
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
