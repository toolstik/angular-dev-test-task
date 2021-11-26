import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiTableModule } from '@taiga-ui/addon-table';
import { WeatherTableComponent } from "./weather-table.component";


@NgModule({
	imports: [
		CommonModule,

		TuiTableModule,
	],
	declarations: [WeatherTableComponent],
	exports: [WeatherTableComponent],
})
export class WeatherTableComponentModule {

}
