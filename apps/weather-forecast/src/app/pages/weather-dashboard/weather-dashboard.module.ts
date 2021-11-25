import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WeatherModeSelectComponentModule } from "../../components/weather-mode-select/weather-mode-select.module";
import { WeatherTableDailyComponentModule } from "../../components/weather-table-daily/weather-table-daily.module";
import { WeatherDashboardComponent } from "./weather-dashboard.component";


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: WeatherDashboardComponent },
		]),

		WeatherModeSelectComponentModule,
		WeatherTableDailyComponentModule,
	],
	declarations: [
		WeatherDashboardComponent
	]
})
export class WeatherDashboardComponentModule {

}
