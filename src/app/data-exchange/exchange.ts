import {ChroniconSkill} from '../chronicon-skill';

/*
An exchange class that allows serialization and deserialization of chronicon trees.

Expected format:
{
  "version":"0.75.1",
  "char":"Templar",
  "activeTree":"Redemption",
  "skills":{
    "40":{"rank":4},
    "279":{"rank":3},
    "280":{"rank":3},
    "281":{"rank":3},
    "336":{"rank":4}
  },
  "level":0}
 */
export class Exchange {
  readonly ACTIVE_TREE = 'activeTree';
  readonly CHAR_CLASS = 'char';
  readonly SKILLS = 'skills';
  readonly LEVEL = 'level';
  readonly VERSION = 'version';

  private characterState: {};

  constructor() {
    this.characterState = {};
  }

  public initialize(char?: string, activeTree?: string, skills?: object, level?: number, version?: string) {
    this.characterState[this.CHAR_CLASS] = char;
    this.characterState[this.ACTIVE_TREE] = activeTree;
    this.characterState[this.SKILLS] = skills;
    this.characterState[this.LEVEL] = level;
    if (version) {
      this.characterState[this.VERSION] = version;
    }
  }

  public addSkill(skill: ChroniconSkill) {
    this.characterState[this.SKILLS][skill.id] = skill.filter(['rank']);
  }

  private pruneLevelZeroSkills() {
    const skills = this.getSkills();
    for (const skillId in skills) {
      if (skills.hasOwnProperty(skillId)) {
        if (skills[skillId]['rank'] <= 0) {
          delete(skills[skillId]);
        }
      }
    }
  }

  public exportState() {
    // delete rank 0 skills on export
    // const selectedTree = this.characterState[this.ACTIVE_TREE];
    // for (const skill in this.characterState[this.SKILLS][selectedTree]) {
    //   if (this.characterState[this.SKILLS][selectedTree].hasOwnProperty(skill)) {
    //     if (this.characterState[this.SKILLS][selectedTree][skill].rank <= 0) {
    //       delete(this.characterState[this.SKILLS][selectedTree][skill]);
    //     }
    //   }
    // }
    this.pruneLevelZeroSkills();
    this.setLevel(this.determineRequiredLevel());
    console.log(this.characterState);
    const json_str = JSON.stringify(this.characterState);
    // console.log(json_str);
    const b64 = LZString.compressToBase64(json_str);
    // console.log(b64);
    return b64;
  }

  public importState(compressed: string) {
    const jsonStr = LZString.decompressFromBase64(compressed);
    const json = JSON.parse(jsonStr);
    console.log(jsonStr);
    if (json) {
      this.characterState = json;
      console.log(this.characterState);
      return this.characterState;
    }
    return undefined;
  }

  /**
   * Calculates the level of the complete selected skills
   * @returns {number}
   */
  private determineRequiredLevel() {
    let sum = 0;
    const skills = this.getSkills();
    for (const skill in skills) {
      if (skills.hasOwnProperty(skill)) {
        sum += skills[skill]['rank'];
      }
    }
    return sum;
  }

  public setVersion(version: string) {
    this.characterState[this.VERSION] = version;
  }

  public setActiveTree(tree: string) {
    this.characterState[this.ACTIVE_TREE] = tree;
  }

  public setActiveChar(char: string) {
    this.initialize(char, undefined, {});
    this.characterState[this.CHAR_CLASS] = char;
  }

  public setLevel(level: number) {
    this.characterState[this.LEVEL] = level;
  }

  public getState() {
    return this.characterState;
  }

  public getActiveTree() {
    return this.characterState[this.ACTIVE_TREE];
  }

  public getActiveChar() {
    return this.characterState[this.CHAR_CLASS];
  }

  public getSkills() {
    return this.characterState[this.SKILLS];
  }
}
