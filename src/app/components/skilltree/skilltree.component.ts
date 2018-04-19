import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Connector} from '../../models/connector';
import {ChroniconSkill} from '../../models/chronicon-skill';
import {Tile} from '../../models/tile';
import {isNumber} from 'util';
import {SkillLevelEvent} from '../../events/skill_level_event';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.css']
})
export class SkilltreeComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() charName;
  @Input() treeName;
  @Input() exchange;
  @Output() getSkillStatus = new EventEmitter<ChroniconSkill>();


  skills;
  connectors;
  innate: ChroniconSkill;

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
  skillLevelUpCallback(event: SkillLevelEvent) {
    console.log(event);
    this.innate.levelRank(event.modifier);
    this.getSkillStatus.emit(event.skill);
  }

  getCurrentRank(skillId: number) {
    let rank = 0;
    const skills = this.exchange.getSkills();
    if (skills[skillId] && isNumber(skills[skillId].rank)) {
      rank = skills[skillId].rank;
    }
    return rank;
  }


  /**
   * Populate the tree
   */
  populateTree() {
    const skillList: [ChroniconSkill] | any = [];
    const connectorList = [];
    const skills = this.data['tree'];

    const tree = skills[this.charName][this.treeName];

    for (const skill in tree) {
      if (tree.hasOwnProperty(skill)) {

        const rank = this.getCurrentRank(tree[skill]['id']);

        const chroniconSkill = ChroniconSkill.fromJson(tree[skill], rank);
        const previousSkill = skillList.filter(tmpSkill => tmpSkill.x === chroniconSkill.x && tmpSkill.y === chroniconSkill.y);
        if (previousSkill.length > 0) {
          previousSkill[0].alternatives.push(chroniconSkill);
        } else {
          skillList.push(chroniconSkill);
        }
      }
    }
    for (const chroniconSkill of skillList) {
      if (chroniconSkill.skill_requirement !== 'none') {
        const requirements = chroniconSkill.skill_requirement.substring(1, chroniconSkill.skill_requirement.length - 1);
        const split = requirements.split(',');
        for (const tmpSkill of skillList) {
          if (split.indexOf(tmpSkill.id) >= 0) {
            connectorList.push(new Connector(new Tile(tmpSkill.x, tmpSkill.y), chroniconSkill));
            // assumption: there are no skills that have multiple dependencies but are in diff.
            // locations, as such we can stop after finding one path for one skill.
            break;
          }
        }
      }
    }

    // create a list ordered by x, then y
    skillList.sort(ChroniconSkill.compareXYCoordinates());
    this.skills = skillList;
    this.connectors = connectorList;
    this.innate = this.skills.find(skill => skill.name === this.treeName);

  }
}
