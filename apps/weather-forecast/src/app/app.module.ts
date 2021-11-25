import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,

		EffectsModule.forRoot(),
		StoreModule.forRoot(
			{
				router: routerReducer
			},
			{
				metaReducers: [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		StoreDevtoolsModule.instrument({
			name: 'Weather App',
		}),
		StoreRouterConnectingModule.forRoot(),

		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
