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
  demo: ChroniconSkill = <ChroniconSkill>{
    image: './assets/img.png'
  };
  demo2: ChroniconSkill = <ChroniconSkill>{
    image: './assets/img.png'
  };
  skills;
  connectors;
  version = 'VERSIONSTRING';

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


  private initializeApp(data) {
    // get charnames
    console.log(data.tree);
    if (data == null) {
      return;
    }
    const skills = data.tree;
    this.version = data.version;
    let skillList = [];
    let connectorList = [];

    const dragonkin = skills['Berserker']['Dragonkin'];
    for (const skill in dragonkin) {
      if (dragonkin.hasOwnProperty(skill)) {
        console.log(skill);
        const chroniconSkill = new ChroniconSkill(dragonkin[skill], '.');
        skillList.push(chroniconSkill);
        if (chroniconSkill.skill_requirement !== 'none') {
          const split = chroniconSkill.skill_requirement.split(',');
          const required = skills['Berserker']['Dragonkin'][split[0]];
          connectorList.push(new Connector(new Tile(required.x, required.y), chroniconSkill));
        }
      }
    }
    skillList.sort(ChroniconSkill.compareXYCoordinates());
    // todo: create a list ordered by x, then y => add in empty divs to display holes
    this.skills = skillList;
    this.connectors = connectorList;
    console.log(this.connectors);

    // skillList = [];
    // const sky_lord = skills['Berserker']['Frostborn'];
    // for (const skill in sky_lord) {
    //   if (sky_lord.hasOwnProperty(skill)) {
    //     console.log(skill);
    //     skillList.push(new ChroniconSkill(sky_lord[skill], '.'));
    //   }
    // }
    // skillList.sort(ChroniconSkill.compareXYCoordinates());
    // this.skills2 = skillList;

    console.log(skillList);

    this.demo = new ChroniconSkill(data.tree.Berserker.Dragonkin.Dragmageddon, 'assets/img.png');
    this.demo2 = new ChroniconSkill(data.tree.Berserker.Dragonkin.Fissures, 'assets/img.png');
  }
}
