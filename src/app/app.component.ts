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
  characterState: {};
  level: number;
  saveCode: string;

  /**
   * Calculates the level of the complete selected skills
   * @param {{}} levelledSkills
   * @returns {number}
   */
  determineRequiredLevel(levelledSkills: {}) {
    let sum = 0;
    const char = levelledSkills[this.selectedChar];
    for (const tree in char) {
      if (char.hasOwnProperty(tree)) {
        for (const skill in char[tree]) {
          if (char[tree].hasOwnProperty(skill)) {
            sum += char[tree][skill]['rank'];
          }
        }
      }
    }
    console.log(sum);

    return sum;
  }

  constructor(private http: HttpClient) {
    this.fetchTreeData();
    this.characterState = {
      'char': undefined,
      'activeTree': undefined,
      'trees': {}
    };
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  /**
   * Level up event for a given skill.
   * @param event
   */
  skillLevelUpCallback(event) {
    if (!this.characterState['trees'][this.selectedTree]) {
      this.characterState['trees'][this.selectedTree] = {};
    }
    this.characterState['trees'][this.selectedTree][event.name] = event.filter(['x', 'y', 'rank']);
    this.level = this.determineRequiredLevel(this.characterState);
    this.exportSkills();

  }

  exportSkills() {
    // delete rank 0 skills on export
    for (const skill in this.characterState['trees'][this.selectedTree]) {
      if (this.characterState['trees'][this.selectedTree].hasOwnProperty(skill)) {
        if (this.characterState['trees'][this.selectedTree][skill].rank <= 0) {
          delete(this.characterState['trees'][this.selectedTree][skill]);
        }
      }
    }
    const b64 = LZString.compressToBase64(JSON.stringify(this.characterState));
    console.log(b64);
    this.saveCode = b64;
  }

  loadSkills(compressed) {
    // test: N4IgIgTghg5g9gOwNYEsEgFykrRACAQQgFs4JNQAPTAJgBoQBPTARgemUwGYBfBgSQQBjNAFNoAFxSIKIahi4NmGAAzsonBT21A=y
    this.saveCode = compressed;
    const jsonStr = LZString.decompressFromBase64(compressed);
    const json = JSON.parse(jsonStr);
    console.log(jsonStr);
    if (json) {
      this.characterState = json;
      console.log(this.characterState);
      this.selectedChar = this.characterState['char'];
      this.trees = Object.keys(this.data['tree'][this.characterState['char']]);
      // this.selectedChar
      // this.selectedChar=""
    }
  }


  loadTreeData() {
    return this.http.get('./assets/chronicon_0_75.json');
  }

  fetchTreeData() {
    this.loadTreeData()
      .subscribe(data => {
        this.initializeApp(data);
      });
  }

  setCharacter(char) {
    this.trees = Object.keys(this.data['tree'][char]);
    this.characterState = {
      'char': char,
      'activeTree': {},
      'trees': {}
    };
  }

  private initializeApp(data) {
    // get charnames
    console.log(data.tree);
    if (data == null) {
      return;
    }
    this.data = data;
    this.version = data.version;
    this.characterState['version'] = this.version;

    this.chars = Object.keys(data.tree);
  }


}
