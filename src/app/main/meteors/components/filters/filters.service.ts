import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IFilters } from '../../../shared/models/filters.model';

@Injectable()
export class FiltersService {
  filters$: Subject<IFilters> = new Subject<IFilters>();

  constructor() {}

  formatFilters(filters: IFilters): IFilters {
    for (const i in filters) {
      if (!filters[i]) {
        delete filters[i];
      } else {
        filters[i] = parseInt(filters[i], 10);
      }
    }

    return filters;
  }
}
