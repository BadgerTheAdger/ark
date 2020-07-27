import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/http/company.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dry-matter',
  templateUrl: './dry-matter.component.html',
  styleUrls: ['./dry-matter.component.scss']
})
export class DryMatterComponent implements OnInit {
  result: number = null;
  cowWeightPlaceholder: string;
  milkPerDayPlaceholder: string;

  constructor(private companyService: CompanyService, private translateSevice: TranslateService) { }

  ngOnInit() {
    this.cowWeightPlaceholder = this.translateSevice.get('DMI.CW')['value'];
    this.milkPerDayPlaceholder = this.translateSevice.get('DMI.MPD')['value'];
  }

  onSubmit(cowWeight, milkPerDayKg) {
    this.companyService.getDryMatter(cowWeight, milkPerDayKg).subscribe((result: any) => {
      this.result = result.dryMatterResult;
      console.log(result)
    })
  }

}
