import { ActionCreator, createAction, props } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

type Dictionary<T extends string = string, V = string> = Record<T, V>;

type ActionProps<T extends Dictionary> = Record<keyof T, object | void>

type ActionConstructor<T extends string, P extends object | void> = ActionCreator<T, (props: P) => P & TypedAction<T>>

type CombinedActions<T extends Dictionary, P extends ActionProps<T>> = {
	readonly [K in keyof T]: ActionConstructor<T[K], P[K]>;
}

/**
 * Easily constructs action creators for every action defined in actionTypes
 * @param actionTypes A dictionary of action types
 * @returns A dictionary of action creators
 */
export function defineActions<T extends Dictionary>(actionTypes: T) {
	return <P extends ActionProps<T>>() => {
		const actions = Object
			.entries(actionTypes)
			.reduce((acc, [key, value]) => {
				acc[key] = createAction(value, props<{ some: string }>());
				return acc;
			}, {} as Record<string, object>);

		return actions as CombinedActions<T, P>;
	}
}
