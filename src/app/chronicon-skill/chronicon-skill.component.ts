import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChroniconSkill} from '../chronicon-skill';

@Component({
  selector: 'app-chronicon-skill',
  templateUrl: './chronicon-skill.component.html',
  styleUrls: ['./chronicon-skill.component.css']
})
export class ChroniconSkillComponent implements OnInit, OnChanges {
  @Input() chroniconSkill: ChroniconSkill;
  rank = 0;
  hovered = false;
  tooltip: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.chroniconSkill);
    if (this.chroniconSkill instanceof ChroniconSkill) {
      // console.log(this.chroniconSkill.constructor.name);
      this.tooltip = this.chroniconSkill.getTooltip(this.rank);
    }

  }

  onClick(event) {
    let modifier = 1;
    if (event.ctrlKey) {
      modifier = 5;
    }
    // this.rank = Math.clamp
    if (event.shiftKey) {
      if (this.rank >= 0) {
        this.rank = Math.max(0, this.rank - modifier);
      }
    } else {

      if (this.rank <= this.chroniconSkill.max_rank) {
        this.rank = Math.min(this.chroniconSkill.max_rank, this.rank + modifier);
      }
    }

    this.tooltip = this.chroniconSkill.getTooltip(this.rank);

  }
}
