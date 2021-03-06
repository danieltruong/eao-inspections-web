import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import * as String from '../../../../../constants/strings';
import {ReportService} from '../../../../../services/report.service';
import { Inspection } from '../../../../../models/inspection.model';
import { Team } from '../../../../../models/team.model';
import { TeamService } from '../../../../../services/team.service';

@Component({
  selector: 'team-report-list',
  templateUrl: './team-report-list.component.html',
  styleUrls: ['./team-report-list.component.scss'],
  providers: [ReportService, TeamService]
})
export class TeamReportListComponent implements OnInit {
  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_INSPECTIONS,
  };

  isDesc: Boolean = false;
  direction: number;
  column: string;

  team: Team;
  data: Array<Inspection> = undefined;
  fields: Array<any>;
  actions: Array<any>;
  teamId: string;

  page = 0;
  totalPages = 0;

  constructor(private reportService: ReportService, private teamService: TeamService, private route: ActivatedRoute, private location: Location) {
    this.fields = ['title', 'project', 'inspector', 'submitted', 'actions'];
    this.actions = ['download'];
  }

  onLocationChange() {
    this.location.back();
  }

  ngOnInit() {
    this.sort('updatedAt');
    this.teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(this.teamId).then((team) => {
      this.team = team;
    });
    this.reportService.getActiveTeamReports(this.teamId)
    .then((results) => {
        this.data = results;
        this.totalPages = this.reportService.totalPages;
    });
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onChangePage(value) {
    this.page = value;
    this.reportService.getActiveTeamReports(this.teamId, value)
      .then((results) => {
        this.data = results;
      });
  }
}
