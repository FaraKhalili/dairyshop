import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
@Input() totalCount: number;
@Input() pageSize: number;
@Output() pagedChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  onPagerChange(event: any): void{
    this.pagedChanged.emit(event.page);
  }
}
