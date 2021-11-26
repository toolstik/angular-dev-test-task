import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastApiService } from '.';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	providers: [WeatherForecastApiService],
	imports: [CommonModule, HttpClientModule],
})
export class WeatherForecastServicesModule { }
