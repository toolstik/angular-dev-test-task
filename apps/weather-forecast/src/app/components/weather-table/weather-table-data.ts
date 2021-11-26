export type WeatherTableDataItem = {
	date: Date,
	temperature: number,
};

export type WeatherTableData = {
	city: string,
	data: WeatherTableDataItem[],
}
