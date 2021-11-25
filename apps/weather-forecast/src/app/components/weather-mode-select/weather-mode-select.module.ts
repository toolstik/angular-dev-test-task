import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { WeatherModeSelectComponent } from "./weather-mode-select.component";


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
	],
	declarations: [
		WeatherModeSelectComponent
	],
	exports: [
		WeatherModeSelectComponent
	]
})
export class WeatherModeSelectComponentModule {

}
