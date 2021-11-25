import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { WeatherMode, WeatherModeValue } from '@bp/weather-forecast/services';

@Component({
	selector: 'bp-weather-mode-select',
	templateUrl: './weather-mode-select.component.html',
	styleUrls: ['./weather-mode-select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherModeSelectComponent implements ControlValueAccessor, OnDestroy {

	modes = WeatherMode;

	modeControl = new FormControl(this.modes.DAILY);

	private destroy$$ = new Subject<void>();

	constructor() {
		this.init();
	}

	private onChange: (value: WeatherModeValue) => void = () => { return; };
	private onTouched: () => void = () => { return; };

	private init() {
		this.modeControl.valueChanges
			.pipe(
				takeUntil(this.destroy$$),
				distinctUntilChanged(),
				tap(v => this.change(v))
			)
			.subscribe();
	}

	change(value: WeatherModeValue) {
		this.onChange?.(value);
	}

	touch() {
		this.onTouched?.();
	}

	writeValue(value: WeatherModeValue): void {
		this.modeControl.setValue(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	ngOnDestroy() {
		this.destroy$$.next();
		this.destroy$$.complete();
	}

}
