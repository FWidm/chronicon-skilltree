import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {ChroniconSkill} from './chronicon-skill';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

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
    this.skills = data.tree;
    this.version = data.version;
    const skillList = [];
    // for (const character in this.skills) {
    //   if (this.skills.hasOwnProperty(character)) {
        for (const tree in this.skills['Berserker']) {
          if (this.skills['Berserker'].hasOwnProperty(tree)) {
            for (const skill in this.skills['Berserker'][tree]) {
              if (this.skills['Berserker'][tree].hasOwnProperty(skill)) {
                skillList.push(new ChroniconSkill(this.skills['Berserker'][tree][skill], 'assets/img.png'));
              }
            }
          }
        }
      // }
    // }
    this.skills = skillList;
    console.log(skillList);
    this.demo = new ChroniconSkill(data.tree.Berserker.Dragonkin.Dragmageddon, 'assets/img.png');
    this.demo2 = new ChroniconSkill(data.tree.Berserker.Dragonkin.Fissures, 'assets/img.png');
  }
}
