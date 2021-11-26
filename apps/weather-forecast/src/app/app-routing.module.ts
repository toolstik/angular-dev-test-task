import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./pages/weather-dashboard/weather-dashboard.module').then(m => m.WeatherDashboardComponentModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
