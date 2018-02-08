import {Component} from '@angular/core';
import {ChroniconSkill} from './chronicon-skill';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  skills;
  demo: ChroniconSkill = <ChroniconSkill>{
  };
  // skill2: ChroniconSkill = <ChroniconSkill>{
  //   name: this.skills.tree.Berserker.Dragonkin.Dragmageddon.name,
  //   x: this.skills.tree.Berserker.Dragonkin.Dragmageddon.x,
  //   y: this.skills.tree.Berserker.Dragonkin.Dragmageddon.y,
  //   max: this.skills.tree.Berserker.Dragonkin.Dragmageddon.max_rank,
  //   image: null,
  // };

  constructor(private http: HttpClient) {
    this.fetchTreeData();
  }

  loadTreeData() {
    return this.http.get('../assets/chronicon_0_73.json');
  }

  fetchTreeData() {
    this.loadTreeData()
      .subscribe(data => {
        this.updateSkills(data);
      });
  }

  private updateSkills(data) {
    console.log(data);
    this.demo = data.tree.Berserker.Dragonkin.Dragmageddon;
    // this.demo = <ChroniconSkill>{
    //   name: data.tree.Berserker.Dragonkin.Dragmageddon.name,
    //   x: data.tree.Berserker.Dragonkin.Dragmageddon.x,
    //   y: data.tree.Berserker.Dragonkin.Dragmageddon.y,
    //   max_level: data.tree.Berserker.Dragonkin.Dragmageddon.max_rank,
    //   image: null,
    // };
  }
}
