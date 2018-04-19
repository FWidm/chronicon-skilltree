import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from './data-exchange/exchange';

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
  saveCode: string;
  exchange: Exchange;


  constructor(private http: HttpClient) {
    this.fetchTreeData();
    this.exchange = new Exchange();
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  /**
   * Level up event for a given skill.
   * @param event
   */
  skillLevelUpCallback(event) {
    this.exchange.addSkill(event);
    this.exportSkills();
  }

  exportSkills() {
    this.saveCode = this.exchange.exportState();
  }

  loadSkills(compressed) {
    this.saveCode = compressed;
    this.exchange.importState(compressed);
    this.selectedChar = this.exchange.getActiveChar();
    console.log(this.selectedChar);
    this.trees = Object.keys(this.data['tree'][this.selectedChar]);
    this.selectedTree = this.exchange.getActiveTree();
  }

  loadTreeData() {
    return this.http.get('./assets/skilldata/chronicon_0_80_0.json');
  }

  fetchTreeData() {
    this.loadTreeData()
      .subscribe(data => {
        this.initializeApp(data);
      });
  }

  setCharacter(char: string) {
    this.trees = Object.keys(this.data['tree'][char]);
    this.exchange.setActiveChar(char);
  }

  setActiveTree(tree: string) {
    this.selectedTree = tree;
    this.exchange.setActiveTree(tree);
  }

  private initializeApp(data) {
    // get charnames
    if (data == null) {
      return;
    }
    this.data = data;
    this.version = data.version;
    this.exchange.setVersion(this.version);
    this.chars = Object.keys(data.tree);
  }


}
