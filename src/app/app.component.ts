import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {ChroniconSkill} from './chronicon-skill';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {Tile} from './tile';
import {Connector} from './connector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Tree demo';
  version = 'VERSIONSTRING';

  data: object;

  skills;
  connectors;
  chars: string[];
  trees: string[];
  selectedChar: string;
  selectedTree: string;

  demo: ChroniconSkill = <ChroniconSkill>{
    image: './assets/img.png'
  };
  demo2: ChroniconSkill = <ChroniconSkill>{
    image: './assets/img.png'
  };

  constructor(private http: HttpClient) {
    this.fetchTreeData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.skills);
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
    console.log(char);
    this.trees = this.loadTrees(char.split(': ')[1]);
  }

  loadTrees(charName) {
    return Object.keys(this.data['tree'][charName]);
  }

  populateTree(charName, treeName) {
    const skillList = [];
    const connectorList = [];
    const skills = this.data['tree'];

    const tree = skills[charName][treeName];
    for (const skill in tree) {
      if (tree.hasOwnProperty(skill)) {
        const chroniconSkill = new ChroniconSkill(tree[skill], '.');
        const previousSkill = skillList.filter(tmpSkill => tmpSkill.x === chroniconSkill.x && tmpSkill.y === chroniconSkill.y);
        if (previousSkill.length > 0) {
          previousSkill[0].alternatives.push(chroniconSkill);
        } else {
          skillList.push(chroniconSkill);
        }

        if (chroniconSkill.skill_requirement !== 'none') {
          const split = chroniconSkill.skill_requirement.split(',');
          const required = skills[charName][treeName][split[0]];
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

  private initializeApp(data) {
    // get charnames
    console.log(data.tree);
    if (data == null) {
      return;
    }
    this.data = data;
    this.version = data.version;

    this.chars = Object.keys(data.tree);
    const char = 'Berserker';
    const tree = 'Frostborn';
    this.populateTree(char, tree);
    this.demo = new ChroniconSkill(data.tree.Berserker.Dragonkin.Dragmageddon, 'assets/img.png');
    this.demo2 = new ChroniconSkill(data.tree.Berserker.Dragonkin.Fissures, 'assets/img.png');
  }
}
