import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Connector} from '../connector';
import {ChroniconSkill} from '../chronicon-skill';
import {Tile} from '../tile';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.css']
})
export class SkilltreeComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() charName;
  @Input() treeName;
  @Input() characterState;
  @Output() getSkillStatus = new EventEmitter<ChroniconSkill>();


  skills;
  connectors;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.hasOwnProperty('treeName') || changes.hasOwnProperty('charName')) {
      if (this.data) {
        this.populateTree();
      }
    }
  }

  /**
   * Callback for levelling skills
   * @param event
   */
  skillLevelUpCallback(event) {
    this.getSkillStatus.emit(event);
  }

  getCurrentRank(skill) {
    let rank = 0;
    let trees = this.characterState.trees;
    // console.log(trees);
    if (trees[this.treeName] && trees[this.treeName][skill]) {
      console.log(trees[this.treeName][skill]);
      rank = trees[this.treeName][skill].rank;
    }
    return rank;
  }

  /**
   * Populate the tree
   */
  populateTree() {
    const skillList = [];
    const connectorList = [];
    const skills = this.data['tree'];

    const tree = skills[this.charName][this.treeName];
    for (const skill in tree) {
      if (tree.hasOwnProperty(skill)) {
        const rank = this.getCurrentRank(tree[skill].name);


        const chroniconSkill = ChroniconSkill.fromJson(tree[skill], '.', rank);
        const previousSkill = skillList.filter(tmpSkill => tmpSkill.x === chroniconSkill.x && tmpSkill.y === chroniconSkill.y);
        if (previousSkill.length > 0) {
          previousSkill[0].alternatives.push(chroniconSkill);
        } else {
          skillList.push(chroniconSkill);
        }

        if (chroniconSkill.skill_requirement !== 'none') {
          const split = chroniconSkill.skill_requirement.split(',');
          const required = skills[this.charName][this.treeName][split[0]];
          connectorList.push(new Connector(new Tile(required.x, required.y), chroniconSkill));
        }
      }
    }
    // create a list ordered by x, then y
    skillList.sort(ChroniconSkill.compareXYCoordinates());
    this.skills = skillList;
    this.connectors = connectorList;

    console.log(this.connectors);

    console.log(skillList);
  }
}
