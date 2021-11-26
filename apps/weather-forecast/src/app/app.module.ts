import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Features } from './+state/features/features';
import { RootStoreModule } from './+state/root-store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,

		EffectsModule.forRoot(),
		StoreModule.forRoot(
			{
				[Features.ROUTER]: routerReducer
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

		RootStoreModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
