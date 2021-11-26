import { NgModule } from '@angular/core';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Features } from '../features';
import { WeatherEffects } from './weather.effects';
import { WeatherFacade } from './weather.facade';
import { weatherReducer } from './weather.reducer';

@NgModule({
	providers: [WeatherEffects, WeatherFacade],
	imports: [
		WeatherForecastServicesModule,
		StoreModule.forFeature(Features.WEATHER, weatherReducer),
		EffectsModule.forFeature([WeatherEffects]),
	],
})
export class WeatherModule { }
