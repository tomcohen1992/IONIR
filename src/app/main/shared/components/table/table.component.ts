import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { IMeteor } from '../../models/meteor.model';
import { TableColumns } from '../../models/table.config';
import { TableService } from '../../services/table.service';
import { Animations } from '../../../animations/table.animation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    Animations.listAnimation
  ]
})
export class TableComponent implements OnInit, OnChanges {
  TableColumns = TableColumns;
  isLoading$: Subject<boolean>;
  displayedColumns: string[] = ['id', 'name', 'nametype', 'year', 'mass'];

  @Input() dataSet: IMeteor[];

  constructor(
    private ref: ChangeDetectorRef,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.tableService.isLoading$;
  }

  trackByFn(index, item): number {
    return item.id;
  }

  ngOnChanges(): void {
    this.tableService.isLoading$.next(false);
  }
}
