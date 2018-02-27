import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Tree demo';
  version = 'VERSIONSTRING';

  data: object;

  chars: string[];
  trees: string[];
  selectedChar: string;
  selectedTree: string;
  levelledSkills: {};
  level: number;

  /**
   * Calculates the level of a given tree
   * @param {{}} levelledSkills
   * @param {string} tree
   * @returns {number}
   */
  static determineTreeLevel(levelledSkills: {}, tree: string) {
    let sum = 0;
    if (levelledSkills.hasOwnProperty(tree)) {
      for (const skill in levelledSkills[tree]) {
        if (levelledSkills[tree].hasOwnProperty(skill)) {
          sum += levelledSkills[tree][skill]['rank'];
        }
      }
    }
    console.log(sum);

    return sum;
  }

  /**
   * Calculates the level of the complete selected skills
   * @param {{}} levelledSkills
   * @returns {number}
   */
  static determineRequiredLevel(levelledSkills: {}) {
    let sum = 0;
    for (const tree in levelledSkills) {
      if (levelledSkills.hasOwnProperty(tree)) {
        for (const skill in levelledSkills[tree]) {
          if (levelledSkills[tree].hasOwnProperty(skill)) {
            sum += levelledSkills[tree][skill]['rank'];
          }
        }
      }

    }
    console.log(sum);

    return sum;
  }

  constructor(private http: HttpClient) {
    this.fetchTreeData();
    this.levelledSkills = {};
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  /**
   * Level up event for a given skill.
   * @param event
   */
  skillLevelUpCallback(event) {
    if (!this.levelledSkills[this.selectedTree]) {
      this.levelledSkills[this.selectedTree] = {};
    }
    this.levelledSkills[this.selectedTree][event.name] = event.filter(['name', 'rank']);
    this.level = AppComponent.determineRequiredLevel(this.levelledSkills);


  }

  exportSkills() {
    console.log(this.levelledSkills);
    // todo: export & import
    const b64 = LZString.compress(JSON.stringify(this.levelledSkills));
    console.log(b64);
    console.log(LZString.decompress(b64));
  }

  loadSkills(compressed) {
    console.log(LZString.decompress(compressed));
  }

  loadTreeData() {
    return this.http.get('./assets/chronicon_0_73.json');
  }

  fetchTreeData() {
    this.loadTreeData()
      .subscribe(data => {
        this.initializeApp(data);
      });
  }

  setCharacter(char) {
    this.trees = Object.keys(this.data['tree'][char]);
    this.levelledSkills = {};
  }

  private initializeApp(data) {
    // get charnames
    console.log(data.tree);
    if (data == null) {
      return;
    }
    this.data = data;
    this.version = data.version;
    this.levelledSkills['version'] = this.version;

    this.chars = Object.keys(data.tree);
  }


}
