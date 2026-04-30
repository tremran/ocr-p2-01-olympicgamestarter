import { Component, Input, OnInit } from '@angular/core';
import { AppInformation } from '../information/information.type';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})

export class PageHeaderComponent {
  @Input() pageTitle!: string;
  @Input() informations!: AppInformation[];

}
