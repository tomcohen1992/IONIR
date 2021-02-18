import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FiltersService } from './filters.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  @Input() size: number;
  @Input() years: Array<string>;
  @Input() set newFilter(filter: any) {
    if (!filter) { return; }

    if (filter.reset) {
      this.form.reset();

      return;
    }

    this.form.controls.year.setValue(filter.year, { emitEvent: false });
    this.form.controls.mass.setValue(filter.mass, { emitEvent: false });
  }

  form = new FormGroup({
    year: new FormControl(null),
    mass: new FormControl(null),
  });

  constructor(
    private filtersService: FiltersService,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(formValue => {
      const form = this.filtersService.formatFilters(formValue);
      this.filtersService.filters$.next(form);
    });
  }
}
