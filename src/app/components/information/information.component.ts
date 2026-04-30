import { Component, Input } from '@angular/core';
import { AppInformation } from './information.type';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent{
  @Input() info!: AppInformation;
  
}
