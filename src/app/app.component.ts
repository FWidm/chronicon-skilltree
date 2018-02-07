import {Component} from '@angular/core';
import * as skills from '../assets/chronicon_0_73.json';
import {ChroniconSkill} from './chronicon-skill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  skill: ChroniconSkill = <ChroniconSkill>{
    name: skills.tree.Berserker.Dragonkin.Boiling.name,
    x: skills.tree.Berserker.Dragonkin.Boiling.x,
    y: skills.tree.Berserker.Dragonkin.Boiling.y,
    max: skills.tree.Berserker.Dragonkin.Boiling.max_rank,
    image: null,
  };
  skill2: ChroniconSkill = <ChroniconSkill>{
    name: skills.tree.Berserker.Dragonkin.Dragmageddon.name,
    x: skills.tree.Berserker.Dragonkin.Dragmageddon.x,
    y: skills.tree.Berserker.Dragonkin.Dragmageddon.y,
    max: skills.tree.Berserker.Dragonkin.Dragmageddon.max_rank,
    image: null,
  };
  constructor() {
    console.log(skills);
  }
}
