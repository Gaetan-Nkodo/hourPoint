import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { ProviderAst } from '@angular/compiler';
import { GlobalService } from 'app/shared/global.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './userList.component.html',
  styleUrls:['./userList.component.css'],
  providers:[]
})
export class UserListComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  constructor(private data2:GlobalService){
  }

  private user;
  private tab;
  private tab2;
  private tabExtraMorning=[];
  private tab2ExtraMorning=[];
  private tabExtraAfternoon=[];
  private tab2ExtraAfternoon=[];
  private tabExtraTotalString=[];
  private tab2ExtraTotalString=[];
  private tabExtraTotalNumber=[];
  private tab2ExtraTotalNumber=[];
  private totalExtraTotal;
  private totalExtraTotal2;





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

            //*
            this.data2.getWeekHoursInfo().subscribe(
              res => {
                  this.tab =res;
                  for(let i=0;i<this.tab.length;i++){
                     this.tabExtraMorning.push(this.data2.calculateExtraMorning(this.tab[i].onDuty,this.tab[i].clockIn,this.tab[i].clockOut));
                     this.tabExtraAfternoon.push(this.data2.calculateExtraAfternoon(this.tab[i].offDuty,this.tab[i].clockOut,this.tab[i].clockIn));
                     this.tabExtraTotalString.push(this.data2.calculateExtraTotal().hourString); 
                     this.tabExtraTotalNumber.push(this.data2.calculateExtraTotal().hourNumber);
                  }
      
                  for(let i=0;i<this.tab.length;i++){
                    this.tab[i].extraMorning = this.tabExtraMorning[i]
                    this.tab[i].extraAfternoon = this.tabExtraAfternoon[i]
                    this.tab[i].extraFinal = this.tabExtraTotalString[i]

                    if(this.tabExtraMorning[i].charAt(0)=='-'){

                      this.tab[i].extraMorningSign=0
                    }else{
                      this.tab[i].extraMorningSign=1
                    }

                    if(this.tabExtraAfternoon[i].charAt(0)=='-'){

                      this.tab[i].extraAfternoonSign=0
                    }else{
                      this.tab[i].extrAfternoonSign=1
                    }

                    if(this.tabExtraTotalString[i].charAt(0)=='-'){

                      this.tab[i].extraFinalSign=0
                    }else{
                      this.tab[i].extrFinalSign=1
                    }
      
                  }
      
                  this.totalExtraTotal=this.data2.calculateTotalExtraTotal(this.tabExtraTotalNumber);
                  
                 console.log('tabExtraMorning',this.tabExtraMorning)
                 console.log('tabExtraAfternoon',this.tabExtraAfternoon)
                 console.log('tabExtraTotalString',this.tabExtraTotalString)
                 console.log('tabExtraTotalNumber',this.tabExtraTotalNumber)

                 this.tabExtraMorning=[]
                 this.tabExtraAfternoon=[]
                 this.tabExtraTotalString=[]
                 this.tabExtraTotalNumber=[]
                  
              },
              err => {
                  console.log("Hourinfo error",err);
              }
            )
            //*/
      
      
            //*
            this.data2.getMonthHoursInfo(this.selectedMonth+1,this.selectedYear).subscribe(
              res => {
                  this.tab2 =res;
                  for(let i=0;i<this.tab2.length;i++){
                     this.tab2ExtraMorning.push(this.data2.calculateExtraMorning(this.tab2[i].onDuty,this.tab2[i].clockIn,this.tab2[i].clockOut));
                     this.tab2ExtraAfternoon.push(this.data2.calculateExtraAfternoon(this.tab2[i].offDuty,this.tab2[i].clockOut,this.tab2[i].clockIn));
                     this.tab2ExtraTotalString.push(this.data2.calculateExtraTotal().hourString); 
                     this.tab2ExtraTotalNumber.push(this.data2.calculateExtraTotal().hourNumber);
                  }
      
                  for(let i=0;i<this.tab2.length;i++){
                    this.tab2[i].extraMorning = this.tab2ExtraMorning[i]
                    this.tab2[i].extraAfternoon = this.tab2ExtraAfternoon[i]
                    this.tab2[i].extraFinal = this.tab2ExtraTotalString[i]

                    if(this.tab2ExtraMorning[i].charAt(0)=='-'){

                      this.tab2[i].extraMorningSign=0
                    }else{
                      this.tab2[i].extraMorningSign=1
                    }

                    if(this.tab2ExtraAfternoon[i].charAt(0)=='-'){

                      this.tab2[i].extraAfternoonSign=0
                    }else{
                      this.tab2[i].extrAfternoonSign=1
                    }

                    if(this.tab2ExtraTotalString[i].charAt(0)=='-'){

                      this.tab2[i].extraFinalSign=0
                    }else{
                      this.tab2[i].extrFinalSign=1
                    }
      
                  }
      
                  this.totalExtraTotal2=this.data2.calculateTotalExtraTotal(this.tab2ExtraTotalNumber);

                  this.val = false;

                 console.log('tab2ExtraMorning',this.tab2ExtraMorning)
                 console.log('tab2ExtraAfternoon',this.tab2ExtraAfternoon)
                 console.log('tab2ExtraTotalString',this.tab2ExtraTotalString)
                 console.log('tab2ExtraTotalNumber',this.tab2ExtraTotalNumber)

                 this.tab2ExtraMorning=[]
                 this.tab2ExtraAfternoon=[]
                 this.tab2ExtraTotalString=[]
                 this.tab2ExtraTotalNumber=[]

              },
              err => {
                  console.log("Hourinfo error",err);
              }
            )
            //*/
          
    }

    public ngOnInit() {


      
      
      console.log("\n\nCHOSEN MONTH ",this.selectedMonth+1);
      console.log("CHOSEN YEAR ",this.selectedYear);

      this.user = this.data2.getUserPayload();
      console.log("USER PAYLOAD MAN",this.user);

      this.subscribeToPromise();






      /*$(function() {
        $('.date-picker').datepicker( {
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'MM yy',
            onClose: function(dateText,inst) {
              console.log("IN MEN",inst.selectedMonth+1,inst.selectedYear);
              this.chosenMonth = inst.selectedMonth+1;
              this.chosenYear = inst.selectedYear;
              console.log(this.chosenMonth);
              console.log(this.chosenYear);

                $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));

                /*
                $.ajax({
                  //L'URL de la requête 
                  url: "http://localhost:3000/user/monthHoursInfo/"+ inst.selectedMonth+1 +"/"+inst.selectedYear,
          
                  //La méthode d'envoi (type de requête)
                  method: "GET",

                  contentType: "application/json",

                  headers:{Authorization: "Bearer "+localStorage.getItem('token')},
          
                  //Le format de réponse attendu
                  dataType : "json",

                  
              })
              .done(function(response){
                  let data = JSON.stringify(response);
                  console.log(data);

                  this.tab2 =data;
                  for(let i=0;i<this.tab2.length;i++){
                    console.log('hello2',this.tab2.length);
                     this.tab2ExtraMorning.push(this.data2.calculateExtraMorning(this.tab2[i].onDuty,this.tab2[i].clockIn));
                     this.tab2ExtraAfternoon.push(this.data2.calculateExtraAfternoon(this.tab2[i].offDuty,this.tab2[i].clockOut));
                     this.tab2ExtraTotalString.push(this.data2.calculateExtraTotal().hourString); 
                     this.tab2ExtraTotalNumber.push(this.data2.calculateExtraTotal().hourNumber);
                  }
      
                  for(let i=0;i<this.tab2.length;i++){
                    this.tab2[i].extraMorning = this.tab2ExtraMorning[i]
                    this.tab2[i].extraAfternoon = this.tab2ExtraAfternoon[i]
                    this.tab2[i].extraFinal = this.tab2ExtraTotalString[i]
      
                  }
      
                  this.totalExtraTotal2=this.data2.calculateTotalExtraTotal(this.tab2ExtraTotalNumber);

                  console.log("\n\nTAB2",this.tab2);
                  //$("div#res").append(data);
              })
              .fail(function(error){
                  alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
              })*

                
              
            }
        });
    });*/













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
    //this.selected_date_element.dataset.value=selectedDate

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
  
        console.log(this.selectedMonth+1,this.selectedYear)

        this.subscribeToPromise();

        return this.months[this.selectedMonth] + ' ' + this.selectedYear
    }

/****************************************************************************************************************/
}
