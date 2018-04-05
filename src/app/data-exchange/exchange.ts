import {ChroniconSkill} from '../chronicon-skill';

/**
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

  /**
   * Init this exchange's state with lots of optional choices.
   * @param {string} char
   * @param {string} activeTree
   * @param {object} skills
   * @param {number} level
   * @param {string} version
   */
  public initialize(char?: string, activeTree?: string, skills?: object, level?: number, version?: string) {
    this.characterState[this.CHAR_CLASS] = char;
    this.characterState[this.ACTIVE_TREE] = activeTree;
    this.characterState[this.SKILLS] = skills;
    this.characterState[this.LEVEL] = level;
    if (version) {
      this.characterState[this.VERSION] = version;
    }
  }

  /**
   * Add a chronikonskill to the state.
   * @param {ChroniconSkill} skill
   */
  public addSkill(skill: ChroniconSkill) {
    this.characterState[this.SKILLS][skill.id] = skill.filter(['rank']);
  }


  /**
   * Remove all skills that have a rank of 0 from the stats.
   */
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

  /**
   * Export the object to json, then encode as b64string.
   * @returns {string} b64string representation of a json string
   */
  public exportState() {
    this.pruneLevelZeroSkills();
    this.setLevel(this.determineRequiredLevel());
    console.log(this.characterState);
    const json_str = JSON.stringify(this.characterState);
    return LZString.compressToBase64(json_str);
  }

  /**
   * Import the state
   * @param {string} compressed base64 json string
   * @returns {any} characterstate or undefined when decoding failed
   */
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
