import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from './toast-service';
import {ReactButton as Button} from './button'

import { AppService } from 'src/app/shared/service/app.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { restApiService } from '../../core/services/rest-api.service';
import { IMstProjectFlow } from 'src/types';
import { User } from 'src/app/core/interface/currentUser.interface';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexFill,
} from 'ng-apexcharts';

interface DashboardProjectState {
  project_id: number;
  project_name: string;
  flow_id: number;
  flow: string;
  state: string;
}

interface Mahasiswa {
  nim: string
  phone_number: number
}

interface Airline {
  data: Array<{
    code: string
    type_airline: string
    name: string
  }>
}


type GroupedProjectFlow = {
  project_id: number;
  project_name: string;
  flow_ids: Array<number>;
  state: Array<'Done' | 'Pending' | 'Progress' | undefined>;
};

type TActiveTab = 'summary' | 'progress';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

/**
 * Ecommerce Component
 */
export class DashboardComponent implements OnInit {
  Button = Button

  loading = false;
  breadCrumbItems!: Array<{}>;
  user: User | null = null;
  data: Airline = { data: [
    { code: '', type_airline: '', name: '' }
  ] };
  dataProjectFlow: DashboardProjectState[] = [];
  dataMasterProjectFlow: IMstProjectFlow[] = [];
  projectFlowState: GroupedProjectFlow[] = [];

  activeTab: TActiveTab = 'summary';
  mahasiswa: string = '';

  @ViewChild('airlineChart') chart?: ChartComponent;
  // Use `any` for chart options to keep template binding flexible and avoid strict template type errors
  public airlineChartOptions: any = {
    series: [],
    chart: { type: 'pie', height: 320 },
    labels: [],
    responsive: [],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true },
    colors: []
  };

  constructor(
    public toastService: ToastService,
    public service: AppService,
    private TokenStorageService: TokenStorageService,
    private restApiService: restApiService
  ) {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Dashboard', active: true }];

    if (sessionStorage.getItem('toast')) {
      this.toastService.show('Logged in Successfull.', {
        classname: 'bg-success text-center text-white',
        delay: 5000,
      });
      sessionStorage.removeItem('toast');
    }
  }

  ngOnInit(): void {
   this.getDataAirline();
   localStorage.setItem('mahasiswa', JSON.stringify({ nim: '123456', phone_number: 8123456789 }));
  }

  ngOnDestroy(): void {
    localStorage.removeItem('mahasiswa');
  }

  getDataAirline(){
    this.service.get('/resource-master/airline').subscribe((res) => {
      if (res.message === "success") {
    
        if (Array.isArray(res.data)) {
          this.data = { data: res.data };
        } else if (res.data && Array.isArray(res.data.data)) {
      
          this.data = res.data;
        } else {
          // fallback: empty array
          this.data = { data: [] };
        }
        console.log("data airline", this.data);
        console.log("data airline length", this.data.data.length);
        // build chart data grouped by type_airline
        const counts: { [key: string]: number } = {};
        (this.data.data || []).forEach((a) => {
          // log a single entry for debugging (avoid huge console spam)
          // console.log("entry", a);
          const t = a.type_airline && a.type_airline.trim() ? a.type_airline : 'Unknown';
          counts[t] = (counts[t] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const series = labels.map((l) => counts[l]);

        this.airlineChartOptions = {
          series,
          chart: {
            type: 'pie',
            height: 320,
          },
          labels,
          legend: { position: 'bottom' },
          colors: ['#0d6efd', '#6610f2', '#198754', '#0dcaf0', '#ffc107', '#dc3545', '#adb5bd'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 300 },
                legend: { position: 'bottom' },
              },
            },
          ],
          dataLabels: { enabled: true },
        };
      }
    });
  }

 
}
