import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableService } from '../shared/services/table.service';
import { ITableMeteor } from '../shared/models/meteor.model';
import { FiltersService } from './components/filters/filters.service';
import { IFilters } from '../shared/models/filters.model';
import { Message } from '../shared/models/messages.model';

@Component({
  selector: 'app-meteors',
  templateUrl: './meteors.component.html',
  styleUrls: ['./meteors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorsComponent implements OnInit, OnDestroy {
  isFetchData$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  data: ITableMeteor[] = [];
  filteredData: ITableMeteor[] = [];
  years: number[];
  newFilter: any;
  message: any;
  private destroyedFilters$ = new Subject();

  constructor(
    private tableService: TableService,
    private filtersService: FiltersService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchUsers();

    this.filtersService.filters$.pipe(
      takeUntil(this.destroyedFilters$)
    ).subscribe(filters => {
        this.tableService.isLoading$.next(true);
        this.updateUsers(filters);
      });
  }

  closeMessage(): void {
    this.message = false;
  }

  ngOnDestroy(): void {
    this.destroyedFilters$.unsubscribe();
  }

  private handleFindMeteor(mass: number): ITableMeteor {
    const higherMeteor: ITableMeteor = this.tableService.getNextHigherMeteor(this.data, mass);

    if (!Object.keys(higherMeteor).length) {
      this.message = Message.resetResults;
      this.newFilter = { reset: true };
    } else {
      this.message = Message.findNext;
      this.newFilter = { mass: higherMeteor.mass, year: higherMeteor.year };
    }

    return higherMeteor;
  }

  private updateUsers(filters: IFilters): void {
    this.filteredData = this.tableService.filter(this.data, filters);

    if (!this.filteredData.length) {
      const higherMeteor: ITableMeteor = this.handleFindMeteor(filters.mass);
      this.filteredData = [{...higherMeteor}];
    }
  }

  private initData(data: ITableMeteor[]): void {
    this.years = this.tableService.getYears(data);

    this.data = this.filteredData = this.tableService.sort(data);
  }

  private fetchUsers(): void {
    this.tableService.getUsers().subscribe(data => {
      this.initData(data);
    }, (err) => {
      console.log(err);
    }, () => {
      this.isFetchData$.next(true);
      this.ref.detectChanges();
    });
  }
}
