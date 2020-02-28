import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { ProviderAst } from '@angular/compiler';
import { GlobalService } from 'app/shared/global.service';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers:[]
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  constructor(private data2:GlobalService){}

  private user;
  private tabx;
  private tabxMonth;
  private tabWeekHours;
  private tabMonthHours;
  private bool1=false;
  private bool2=false;





  public tableData: TableData;
  startAnimationForLineChart(chart: any) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.on('draw', function(data: any) {

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }
  startAnimationForBarChart(chart: any) {
      let seq2: any, delays2: any, durations2: any;
      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data: any) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }




  subscribeToPromise(){

    this.data2.getAllWeekHoursInfo(this.selectedDay2,this.selectedMonth2+1,this.selectedYear2).subscribe(
      res => {
          console.log('IN STATISTICS RES')
          this.bool2=false
          this.tabWeekHours=res;

          for(let i=0;i<this.tabWeekHours.length;i++){
            if(this.tabWeekHours[i].length > 1){
              this.bool2=true;
            }
          }
          
          this.tabx=this.data2.statWeek(this.tabWeekHours);
          console.log('tablex',this.tabx)

          this.val2 = false;
      },
      err => {
        console.log(err);
    }
    )

    this.data2.getAllMonthHoursInfo(this.selectedMonth+1,this.selectedYear).subscribe(
      res => {
          this.bool1=false
          this.tabMonthHours=res;

          for(let i=0;i<this.tabMonthHours.length;i++){
            if(this.tabMonthHours[i].length > 1){
              this.bool1=true;
            }
          }
          this.tabxMonth=this.data2.statMonth(this.tabMonthHours);
          console.log("TABXMONTH",this.tabxMonth);

          this.val = false;
      },
      err => {
        console.log(err);
    }
    )


  }


    public ngOnInit() {

      
      console.log("\n\nCHOSEN MONTH ",this.selectedMonth+1);
      console.log("CHOSEN YEAR ",this.selectedYear);

      /*this.data2.getInfoById(this.data2.getUserIdFromLocalStorage()).subscribe(
        res => {
            console.log(res);
            this.user = res;
        },
        err => {
            console.log("userpageconsult error\n",err);
        }
    )*/

        this.subscribeToPromise();
      














      this.tableData = {
          headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
          dataRows: [
              ['US', 'USA', '2.920	', '53.23%'],
              ['DE', 'Germany', '1.300', '20.43%'],
              ['AU', 'Australia', '760', '10.35%'],
              ['GB', 'United Kingdom	', '690', '7.87%'],
              ['RO', 'Romania', '600', '5.94%'],
              ['BR', 'Brasil', '550', '4.34%']
          ]
       };
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      const dataDailySalesChart = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      };

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);
      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

      const optionsCompletedTasksChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
          // look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      };

     const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
      optionsCompletedTasksChart);

     this.startAnimationForLineChart(completedTasksChart);

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      const dataWebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      const optionsWebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      const responsiveOptions: any = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

      this.startAnimationForBarChart(websiteViewsChart);

      $('#worldMap').vectorMap({
        map: 'world_en',
        backgroundColor: 'transparent',
         borderColor: '#818181',
         borderOpacity: 0.25,
         borderWidth: 1,
         color: '#b3b3b3',
         enableZoom: true,
         hoverColor: '#eee',
         hoverOpacity: null,
         normalizeFunction: 'linear',
         scaleColors: ['#b6d6ff', '#005ace'],
         selectedColor: '#c9dfaf',
         selectedRegions: null,
         showTooltip: true,
         onRegionClick: function(element, code, region)
         {
             var message = 'You clicked "'
                 + region
                 + '" which has the code: '
                 + code.toUpperCase();

             alert(message);
         }
      });
   }
   ngAfterViewInit() {
       const breakCards = true;
       if (breakCards === true) {
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               const $fix_button = $(this);
               const $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count', 0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   }, 480);
               });

               $card.mouseenter(function(){
                   const $this = $(this);
                   const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr('data-count', hover_count);
                   if (hover_count >= 20) {
                       $(this).children('.card-header, .card-image').addClass('hinge animated');
                   }
               });
           });
       }
   }

/****************************************************************************************************************/
date_picker_element= document.querySelector('.date-picker')
selected_date_element= document.querySelector('.date-picker .selected-date')
dates_element= document.querySelector('.date-picker .dates')
year_element= document.querySelector('.date-picker .dates .year .yr')
next_yr_element= document.querySelector('.date-picker .dates .year .next-yr')
prev_yr_element= document.querySelector('.date-picker .dates .year .prev-yr')
    
months_element= document.querySelector('.date-picker .dates .months')
    
months= ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sept','Oct','Nov','Dec']
    
date= new Date()
month= this.date.getMonth()
year= this.date.getFullYear()
    
selectedDate= this.date
selectedMonth= this.month
selectedYear= this.year
val=false
dateselect=this.formDate()

 selectedDateFunc(i){

    this.selectedDate= new Date(this.year+'-'+(i+1)+'-'+12)
    this.selectedMonth=i
    this.selectedYear=this.year

    this.dateselect=this.formDate()

    }


    toggleDatePicker(){
        if(this.val==false){
            this.val=true
        }else{
            this.val=false
        }
    }
    
     goToNext(){
        this.year++;
    }
    
     goToPrev(){
        this.year--;
    }
    
     formDate(){
  
        console.log(this.selectedMonth,this.selectedYear)

        this.subscribeToPromise();
        return this.months[this.selectedMonth] + ' ' + this.selectedYear
    }

/****************************************************************************************************************/

/****************************************************************************************************************/
date_picker_element2= document.querySelector('.date-picker')
selected_date_element2= document.querySelector('.date-picker .selected-date')
dates_element2= document.querySelector('.date-picker .dates')
year_element2= document.querySelector('.date-picker .dates .year .yr')
next_yr_element2= document.querySelector('.date-picker .dates .year .next-yr')
prev_yr_element2= document.querySelector('.date-picker .dates .year .prev-yr')
    
months_element2= document.querySelector('.date-picker .dates .months')
    
months2= ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sept','Oct','Nov','Dec']
days2=[]
    
date2= new Date()
day2=this.date2.getDate()
month2= this.date2.getMonth()
year2= this.date2.getFullYear()
    
selectedDate2= this.date2
selectedDay2= this.day2
selectedMonth2= this.month2
selectedYear2= this.year2
val2=false
dateselect2=this.formDate2()

 selectedDateFunc2(i){

    this.selectedDate2= new Date(this.year2+'-'+(this.month2+1)+'-'+(i+1))
    this.selectedDay2=i+1
    this.selectedMonth2=this.month2
    this.selectedYear2=this.year2

    this.dateselect2=this.formDate2()

    }


    toggleDatePicker2(){
        if(this.val2==false){
            this.val2=true
        }else{
            this.val2=false
        }
        this.populateDates();
        console.log('DAYS',this.days2)
    }
    
     goToNext2(){
       console.log('SELECTED DAY',this.selectedDay2)
        this.month2++;
        if(this.month2>11){
          this.month2=0;
          this.year2++;
        }
        this.populateDates();
    }
    
     goToPrev2(){
        this.month2--;
        if(this.month2<0){
          this.month2=11;
          this.year2--;
        }
        this.populateDates();
    }

    populateDates(){
      this.days2=[]
      var amountDays=31
      if(this.month2==3||this.month2==5||this.month2==8||this.month2==10){
        amountDays=30
      }

      if(this.month2==1){
        if(this.year2%4==0){
          amountDays=29
        }else{
          amountDays=28
        }
      }
      for(let i=1; i<=amountDays; i++){
        this.days2.push(i)
      }

    }
    
     formDate2(){
        var selectedDay2=this.selectedDay2.toString()

        this.subscribeToPromise();

        console.log("selectedMonth2",this.selectedDay2,this.selectedMonth2)
        if(this.selectedDay2<10){
          selectedDay2='0'+this.selectedDay2
        }

        return selectedDay2 + ' ' + this.months2[this.selectedMonth2] + ' ' + this.selectedYear2
    }

/****************************************************************************************************************/

}
