import { Component, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-store-thongke',
  templateUrl: './store-thongke.component.html',
  styleUrl: './store-thongke.component.css'
})
export class StoreThongkeComponent {
  store!: Store;

  danhsachThongKe_Thang_SoDon: any = {};
  danhsachThongKe_7Ngay_SoDon: any = {};
  danhsachThongKe_Thang_DoanhThu: any = {};
  danhsachThongKe_7Ngay_DoanhThu: any = {};
  danhsachTop5_SP_BanChayNhat: any = {};
  danhsachTop5_SP_BanENhat: any = {};

  tenThangSoDon: string[] = [];

  constructor(private storeService: StoreService) {
    storeService.storeObservable.subscribe((newStore) => {
      this.store = newStore;
      console.log(this.store);

    });




    this.loadChartData();
    this.randomizeSoDon3Thang();
    this.randomizeDoanhThu3Thang();
    this.randomizeSoDon7Ngay();
    this.randomizeDoanhThu7Ngay();




  }

  loadChartData(): void {
    let idch = { MaCH: this.store._id };
    this.storeService.get_ThongKe_Thang_DoanhThu_Store(idch).subscribe((item) => {
      this.danhsachThongKe_Thang_DoanhThu = item;
      this.themData_Thang_DoanhThu3Thang(item);
    });

    this.storeService.get_ThongKe_Thang_SoDon_Store(idch).subscribe((danhsachThongKe) => {
      this.danhsachThongKe_Thang_SoDon = danhsachThongKe;
      this.themData_Thang_SoDon3Thang(danhsachThongKe);

    });

    this.storeService.get_ThongKe_7NGAY_SoDon_Store(idch).subscribe((item) => {
      this.danhsachThongKe_7Ngay_SoDon = item;
      this.themData_Ngay_SoDon7Ngay(item);
      this.randomizeSoDon7Ngay();

    });

    this.storeService.get_ThongKe_7NGAY_DoanhThu_Store(idch).subscribe((item) => {
      this.danhsachThongKe_7Ngay_DoanhThu = item;
      this.themData_Thang_DoanhThu7Ngay(item);

    });

    this.storeService.get_ThongKe_Top5_SP_BanChayNhat_Store(idch).subscribe((item) => {
      this.danhsachTop5_SP_BanChayNhat = item;
      console.log('878d7ffd');
      console.log(item);

    });


    this.storeService.get_ThongKe_Top5_SP_BanENhat_Store(idch).subscribe((item) => {
      this.danhsachTop5_SP_BanENhat = item;

    });


  }

  themData_Thang_SoDon3Thang(item: any) {
    this.barChartSoDon3ThangData.labels = item.monthNames;
    this.barChartSoDon3ThangData.datasets[0].data = item.tongSoDon3thang;
    this.barChartSoDon3ThangData.datasets[1].data = item.don_hoanthanh3thang;
    this.barChartSoDon3ThangData.datasets[2].data = item.don_huy3thang;

    this.randomizeSoDon3Thang();


  }

  themData_Ngay_SoDon7Ngay(item: any) {
    this.barChartSoDon7NgayData.labels = item.dayNames;
    this.barChartSoDon7NgayData.datasets[0].data = item.tongSoDon7ngay;
    this.barChartSoDon7NgayData.datasets[1].data = item.don_hoanthanh7ngay;
    this.barChartSoDon7NgayData.datasets[2].data = item.don_huy7ngay;


  }

  themData_Thang_DoanhThu3Thang(item: any) {
    this.barChartDoanhThu3ThangData.labels = item.monthNames;
    this.barChartDoanhThu3ThangData.datasets[0].data = item.don_doanhthu3thang;

    this.randomizeDoanhThu3Thang();

  }

  themData_Thang_DoanhThu7Ngay(item: any) {
    this.barChartDoanhThu7NgayData.labels = item.dayNames;
    this.barChartDoanhThu7NgayData.datasets[0].data = item.don_doanhthu7ngay;

    this.randomizeDoanhThu7Ngay();

  }




  //==============================Thong ke thang - So don 3 Thang

  @ViewChild(BaseChartDirective) chartSoDon3Thang: BaseChartDirective | undefined;

  public barChartSoDon3ThangOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 1,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartSoDon3ThangType: ChartType = 'bar';

  public barChartSoDon3ThangData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Tổng số đơn' },
      { data: [], label: 'Đã giao' },
      { data: [], label: 'Đã hủy' },
    ],
  };

  // events
  public chartSoDon3ThangClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartSoDon3ThangHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomizeSoDon3Thang(): void {
    this.barChartSoDon3ThangType = this.barChartSoDon3ThangType === 'bar' ? 'line' : 'bar';
  }

  //==============================Thong ke thang - Doanh thu 3 thang

  @ViewChild(BaseChartDirective) chartDoanhThu3Thang: BaseChartDirective | undefined;

  public barChartDoanhThu3ThangOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartDoanhThu3ThangType: ChartType = 'bar';

  public barChartDoanhThu3ThangData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Doanh thu' },
    ],
  };

  // events
  public chartDoanhThu3ThangClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartDoanhThu3ThangHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomizeDoanhThu3Thang(): void {
    this.barChartDoanhThu3ThangType = this.barChartDoanhThu3ThangType == 'bar' ? 'line' : 'bar';
  }


  //==============================Thong ke Ngay - So don 7 Ngay

  @ViewChild(BaseChartDirective) chartSoDon7Ngay: BaseChartDirective | undefined;

  public barChartSoDon7NgayOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 1,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartSoDon7NgayType: ChartType = 'bar';

  public barChartSoDon7NgayData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Tổng số đơn' },
      { data: [], label: 'Đã giao' },
      { data: [], label: 'Đã hủy' },
    ],
  };

  // events
  public chartSoDon7NgayClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartSoDon7NgayHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomizeSoDon7Ngay(): void {
    this.barChartSoDon7NgayType = this.barChartSoDon7NgayType === 'bar' ? 'line' : 'bar';
  }


  //==============================Thong ke thang - Doanh thu 7 Ngay

  @ViewChild(BaseChartDirective) chartDoanhThu7Ngay: BaseChartDirective | undefined;

  public barChartDoanhThu7NgayOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartDoanhThu7NgayType: ChartType = 'bar';

  public barChartDoanhThu7NgayData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Doanh thu' },
    ],
  };

  // events
  public chartDoanhThu7NgayClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartDoanhThu7NgayHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomizeDoanhThu7Ngay(): void {
    this.barChartDoanhThu7NgayType = this.barChartDoanhThu7NgayType == 'bar' ? 'line' : 'bar';
  }

  //==============================Thong ke thang - Top 5 san pham ban chay nhat

  @ViewChild(BaseChartDirective) ChartTop5_BanChayNhat: BaseChartDirective | undefined;

  // Pie
  public pieChartTop5_BanChayNhatOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartTop5_BanChayNhatData(ten: any, soluong: any): ChartData<'pie', number[], string | string[]> {
    return {
      labels: ten,
      datasets: [
        {
          data: soluong,
          label: 'Số lượng sản phẩm đã bán'
        },
      ],
    };
  }

  public pieChartTop5_BanChayNhatType: ChartType = 'pie';
  public pieChartTop5_BanChayNhatPlugins = [DatalabelsPlugin];

  // events
  public chartChartTop5_BanChayNhatClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public ChartTop5_BanChayNhatHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  changeLegendPosition_ChartTop5_BanChayNhat(): void {
    if (this.pieChartTop5_BanChayNhatOptions?.plugins?.legend) {
      this.pieChartTop5_BanChayNhatOptions.plugins.legend.position =
        this.pieChartTop5_BanChayNhatOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.ChartTop5_BanChayNhat?.render();
  }

  //==============================Thong ke thang - Top 5 san pham ban e nhat

  @ViewChild(BaseChartDirective) ChartTop5_BanENhat: BaseChartDirective | undefined;

  // Pie
  public pieChartTop5_BanENhatOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartTop5_BanENhatData(ten: any, soluong: any): ChartData<'pie', number[], string | string[]> {
    return {
      labels: ten,
      datasets: [
        {
          data: soluong,
          label: 'Số lượng sản phẩm đã bán'
        },
      ],
    };
  }

  public pieChartTop5_BanENhatType: ChartType = 'pie';
  public pieChartTop5_BanENhatPlugins = [DatalabelsPlugin];

  // events
  public chartChartTop5_BanENhatClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public ChartTop5_BanENhatHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  changeLegendPosition_ChartTop5_BanENhat(): void {
    if (this.pieChartTop5_BanENhatOptions?.plugins?.legend) {
      this.pieChartTop5_BanENhatOptions.plugins.legend.position =
        this.pieChartTop5_BanENhatOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.ChartTop5_BanENhat?.render();
  }



}

