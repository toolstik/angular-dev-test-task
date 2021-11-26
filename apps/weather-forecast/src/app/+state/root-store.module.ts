import { NgModule } from "@angular/core";
import { CityModule } from "./features/city/city.module";
import { RouterFacade } from "./router.facade";

@NgModule({
	providers: [
		RouterFacade,
	],
	imports: [
		CityModule,
	]
})
export class RootStoreModule {

}
