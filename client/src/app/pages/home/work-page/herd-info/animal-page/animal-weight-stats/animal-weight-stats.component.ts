import { Component, OnInit } from "@angular/core";
import { Chart } from "node_modules/chart.js";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-animal-weight-stats",
  templateUrl: "./animal-weight-stats.component.html",
  styleUrls: ["./animal-weight-stats.component.scss"],
})
export class AnimalWeightStatsComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const months = this.translateService.get('WEIGHTSTATS.MONTHS')['value'];
    const title = this.translateService.get('WEIGHTSTATS.STATSTITLE')['value'];
    var myLineChart = new Chart("weightChart", {
      type: "line",
      data: {
        labels: months,
        datasets: [{
          data: [100, 200, 300, 310, 300, 300, 280, 284, 285, 290, 294, 300],
          borderColor: "#B689A3",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: title
        },
        legend: {
          display: false
        }
      },
    });
  }
}
