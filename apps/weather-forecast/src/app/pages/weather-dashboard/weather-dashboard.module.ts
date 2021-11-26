import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiInputModule } from "@taiga-ui/kit";
import { WeatherModeSelectComponentModule } from "../../components/weather-mode-select/weather-mode-select.module";
import { WeatherTableDailyComponentModule } from "../../components/weather-table-daily/weather-table-daily.module";
import { WeatherTableHourlyComponentModule } from "../../components/weather-table-hourly/weather-table-hourly.module";
import { WeatherDashboardComponent } from "./weather-dashboard.component";


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{ path: '', component: WeatherDashboardComponent },
		]),

		WeatherModeSelectComponentModule,
		WeatherTableDailyComponentModule,
		WeatherTableHourlyComponentModule,

		TuiInputModule,
	],
	declarations: [
		WeatherDashboardComponent,
	]
})
export class WeatherDashboardComponentModule {

}
