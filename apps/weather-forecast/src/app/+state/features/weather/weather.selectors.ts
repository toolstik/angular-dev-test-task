import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "../features";
import { WeatherState } from "./weather.state";

export class WeatherSelectors {

	private static readonly featureSelector = createFeatureSelector<WeatherState>(Features.WEATHER);

	static readonly state = createSelector(this.featureSelector, state => state);
	static readonly weather = createSelector(this.featureSelector, state => state?.weather);
	static readonly daily = createSelector(this.featureSelector, state => state?.weather?.daily || null);
	static readonly hourly = createSelector(this.featureSelector, state => state?.weather?.hourly || null);
}
