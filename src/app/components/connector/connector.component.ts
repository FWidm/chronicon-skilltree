import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Connector} from '../../models/connector';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {
  @Input() connector: Connector;

  constructor() {
  }

  ngOnInit() {
  }


}
