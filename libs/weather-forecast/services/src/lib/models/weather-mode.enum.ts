export const WeatherMode = {
	HOURLY: 'hourly',
	DAILY: 'daily',
} as const;

type ValuesOf<T> = T[keyof T];

export type WeatherModeValue = ValuesOf<typeof WeatherMode>;
