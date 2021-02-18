import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ITableMeteor } from '../models/meteor.model';
import { ApiService } from './api.service';
import { IFilters } from '../models/filters.model';

@Injectable()
export class TableService {
  public isLoading$: Subject<boolean> = new Subject();

  constructor(
    private apiService: ApiService,
  ) { }

  getUsers(): Observable<ITableMeteor[]> {
    return this.apiService.getUsers().pipe(
      map((res: any) => {
        return res.map(meteor => {
          return {
            id: meteor.id,
            name: meteor.name,
            nametype: meteor.nametype,
            mass: meteor.mass ? parseInt(meteor.mass, 10) : parseInt('0', 10),
            year: meteor.year ? new Date(meteor.year).getFullYear() : parseInt('0', 10)
          };
        });
      }),
      tap((receivedData: ITableMeteor[]) => {
        console.log(receivedData);
      }),
      delay(100));
  }

  removeDuplicates(arr: Array<number>): Array<number> {
    const uniqeResults = new Set<any>();
    arr.forEach(e => uniqeResults.add(e));

    return Array.from(uniqeResults);
  }

  getYears(data: ITableMeteor[]): Array<number>  {
    let years = data.map(meteor => meteor.year);
    years = this.sortYears(years);
    years = this.removeDuplicates(years);

    return years;
  }

  sortYears(years: number[]): number[] {
    return years.sort((a: number , b: number) => {
      return b - a;
    });
  }

  sort(arr: ITableMeteor[]): ITableMeteor[] {
    return arr.sort((a: ITableMeteor , b: ITableMeteor) => {
      return b.mass - a.mass;
    });
  }

  filter(arr: ITableMeteor[], filters: IFilters): ITableMeteor[] {
    let tempArr = arr;

    if (filters.year) {
      tempArr = tempArr.filter(meteor => meteor.year === filters.year);
    }

    if (filters.mass) {
      tempArr = tempArr.filter(meteor => meteor.mass > filters.mass);
    }

    return tempArr;
  }

  getNextHigherMeteor(data: ITableMeteor[], mass: number): ITableMeteor {
    let higherMeteor: ITableMeteor = new ITableMeteor();
    data.forEach(meter => {
      if ((meter.mass >  mass) && (higherMeteor.mass ? meter.mass < higherMeteor.mass : true)) {
        higherMeteor = meter;
        return;
      }
    });

    return higherMeteor;
  }
}
