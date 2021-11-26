import { NgModule } from '@angular/core';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Features } from '../features';
import { CityEffects } from './city.effects';
import { CityFacade } from './city.facade';
import { cityReducer } from './city.reducer';

@NgModule({
	providers: [CityEffects, CityFacade],
	imports: [
		WeatherForecastServicesModule,
		StoreModule.forFeature(Features.CITY, cityReducer),
		EffectsModule.forFeature([CityEffects]),
	],
})
export class CityModule { }
