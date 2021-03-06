import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input('team') team : any;
  @Input('showMembers') showMembers : any;
  constructor() { }

  ngOnInit() {
  }
}
