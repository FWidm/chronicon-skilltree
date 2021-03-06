import {Tile} from './tile';

/*
 Number of attributes on the skill.
 {'cooldown': 187,
 'cost1': 225,
 'cost100': 225,
 'damage': 622,
 'description': 639,
 'duration': 251,
 'effect': 312,
 'element': 639,
 'family': 639,
 'max_rank': 639,
 'min_level': 639,
 'name': 639,
 'proc': 82,
 'range': 216,
 'range2': 216,
 'skill_requirement': 639,
 'type': 639,
 'value': 114,
 'x': 639,
 'y': 639}
 */
export class ChroniconSkill extends Tile {
  public id: number;
  public cooldown: string;
  public cost1: string;
  public cost100: string;
  public damage: string;
  public description: string;
  public duration: string;
  public effect: string;
  public element: string;
  public family: string;
  public max_rank: number;
  public min_level: number;
  public name: string;
  public proc: string;
  public range: string;
  public range2: string;
  public skill_requirement: string;
  public type: string;
  public value: string;
  public alternatives: Array<ChroniconSkill>;
  public rank: number;
  public chosen: boolean;

  public static compareXYCoordinates() {
    return function (a, b) {
      return a.y - b.y || a.x - b.x;
    };
  }


  constructor(x: number | string, y: number | string, id: number, name: string, rank: number) {
    super(x, y);
    this.name = name;
    this.rank = rank;
    this.id = id;
  }

  static fromJson(jsonObj: any, rank = 0, chosen = false) {
    const obj = new ChroniconSkill(jsonObj.x, jsonObj.y, jsonObj.id, jsonObj.name, rank);
    obj.skill_requirement = jsonObj.skill_requirement;

    obj.max_rank = jsonObj.max_rank;
    obj.effect = jsonObj.effect;
    obj.damage = jsonObj.damage;
    obj.family = jsonObj.family;
    obj.min_level = jsonObj.min_level;
    obj.element = jsonObj.element;
    obj.type = jsonObj.type;
    obj.description = jsonObj.description;
    obj.cooldown = jsonObj.cooldown;
    obj.cost1 = jsonObj.cost1;
    obj.cost100 = jsonObj.cost100;
    obj.duration = jsonObj.duration;
    obj.proc = jsonObj.proc;
    obj.range2 = jsonObj.range2;
    obj.range = jsonObj.range;
    obj.value = jsonObj.value;
    obj.alternatives = [];
    obj.chosen = chosen;
    return obj;
  }

  /*
   {'DAMAGE%': 308,
   'DURATION': 247,
   'EFFECT%': 324,
   'PROC%': 77,
   'RANGE': 208,
   'RANGE2': 28,
   'REQUIRED': 144,
   'VALUE': 94, 'VALUE%': 1, x
   'XDAM': 214}
   */
  public getTooltip(): string {
    let tooltip = this.description;
    // todo: make more efficient replacement of values.
    // todo: implement coloring - '|' = green, '~' = red
    if (tooltip) {
      tooltip = tooltip.replace(/XDAM/g, '');
      tooltip = tooltip.replace(/DAMAGE%/g, this.getValue(this.damage, this.rank));
      tooltip = tooltip.replace(/PROC/g, this.getValue(this.proc, this.rank, 100));
      tooltip = tooltip.replace(/RANGE2/g, this.getValue(this.range2, this.rank));
      tooltip = tooltip.replace(/RANGE/g, this.getValue(this.range, this.rank));
      tooltip = tooltip.replace(/VALUE/g, this.getValue(this.value, this.rank));
      tooltip = tooltip.replace(/DURATION/g, this.getValue(this.duration, this.rank));
      tooltip = tooltip.replace(/COST100/g, this.getValue(this.cost100, this.rank));
      tooltip = tooltip.replace(/COST1/g, this.getValue(this.cost1, this.rank));
      tooltip = tooltip.replace(/REQUIRED/g, this.skill_requirement);
      tooltip = tooltip.replace(/EFFECT%/g, this.getValue(this.effect, this.rank));
    }
    return tooltip;
  }

  public filter(allowed: Array<string>) {
    //noinspection TypeScriptUnresolvedFunction
    return Object.keys(this)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {});
  }


  public getValue(attribute, rank, divisor = null) {
    // rank 0 shows the same dmg as rank 1 - additionally make sure we cannot go out of bounds [0, max rank]
    if (attribute) {
      if (divisor) {
        return '' + Number(attribute.split(',')[Math.max(rank - 1, 0)]) / divisor;

      } else {
        return '' + attribute.split(',')[Math.max(rank - 1, 0)];
      }
    }
    return 'NONE';
  }


  public isActive(): boolean {
    return !this.type.includes('Passive');
  }

  public getImage(): string {
    return '';
  }

  /**
   * Levels the rank of this skill by a modifier, returns whether it was modified.
   * @param {number} modifier
   * @returns {number} difference between new and old rank.
   */
  public levelRank(modifier: number) {
    const old = this.rank;
    this.rank = Math.min(Math.max(0, this.rank + modifier), this.max_rank);

    return this.rank - old;
  }

  public setRank(rank: number) {
    this.rank = Math.min(Math.max(0, rank), this.max_rank);

  }

}
