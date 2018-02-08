import {Component} from '@angular/core';
import {ChroniconSkill} from './chronicon-skill';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  demo: ChroniconSkill = <ChroniconSkill>{};
  skills: [ChroniconSkill];

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
    // get charnames
    console.log(data.tree);
    if (data == null) {
      return;
    }
    // get tree names per char
    for (const char in data.tree) {
      console.log(data.tree[char]);
    }


    this.demo = data.tree.Berserker.Dragonkin.Dragmageddon;
  }
}
