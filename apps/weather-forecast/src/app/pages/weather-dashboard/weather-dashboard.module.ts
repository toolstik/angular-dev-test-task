import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WeatherDashboardComponent } from "./weather-dashboard.component";


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: WeatherDashboardComponent },
		]),
	],
	declarations: [
		WeatherDashboardComponent
	]
})
export class WeatherDashboardComponentModule {

}
