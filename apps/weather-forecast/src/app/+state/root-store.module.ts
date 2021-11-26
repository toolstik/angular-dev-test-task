import { NgModule } from "@angular/core";
import { CityModule } from "./features/city/city.module";
import { WeatherModule } from "./features/weather/weather.module";
import { RouterFacade } from "./router.facade";

@NgModule({
	providers: [
		RouterFacade,
	],
	imports: [
		CityModule,
		WeatherModule,
	]
})
export class RootStoreModule {

}
