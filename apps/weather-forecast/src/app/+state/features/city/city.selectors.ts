import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Features } from "../features"
import { CityState } from "./city.state";

export class CitySelectors {

	private static readonly featureSelector = createFeatureSelector<CityState>(Features.CITY);

	static readonly current = createSelector(this.featureSelector, state => state.current);
}
