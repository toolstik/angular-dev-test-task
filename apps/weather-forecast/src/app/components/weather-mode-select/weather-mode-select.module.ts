import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiGroupModule } from "@taiga-ui/core";
import { TuiRadioBlockModule } from "@taiga-ui/kit";
import { WeatherModeSelectComponent } from "./weather-mode-select.component";


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		TuiGroupModule,
		TuiRadioBlockModule,
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
