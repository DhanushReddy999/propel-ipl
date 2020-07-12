function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.noofmatcheswonbyeachteam);
  visualizemostmanofmatches(data.mostmanofmatch);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
      'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
 }


 
function visualizeMatchesWonByEachTeam(noofmatcheswonbyeachteam) {
    const seriesData1= [];
    const years = Object.keys(noofmatcheswonbyeachteam)
    const teams = {};
  
    const entries = Object.entries(noofmatcheswonbyeachteam)
  
    for(let item in noofmatcheswonbyeachteam) {
      for (let team in noofmatcheswonbyeachteam[item]) {
        teams[team] = [];
      }
    }
  
    for(let team in teams) {
      for(let entry of entries) {
        const obj = entry[1];
        if(team in obj) {
          teams[team].push(obj[team])
        } else {
          teams[team].push(0)
        }
      }
    }
  
    for(let name in teams) {
      const data = teams[name];
      seriesData1.push({name, data});
    }
    console.log(seriesData1);
  
    Highcharts.chart("noofmatcheswonbyeachteam", {
      chart: {
          type: 'column'
      },
      title: {
          text: ' Number of matches won by each team over all the years of IPL'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: years,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Matches Won'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: seriesData1
  });
  }


  function fetchAndVisualizeData1() {
    fetch("./data1.json")
      .then(r => r.json())
      .then(visualizeData1);
  }
  
  fetchAndVisualizeData1();
  
  function visualizeData1(data1) {
    visualizeeconomicbowler(data1.economicbowler);
    visualizeextrarunsbyeachteam(data1.extrarunsbyeachteam)
    
    return;
  }
  
  function visualizeeconomicbowler(economicbowler) {

      const seriesData = [];
    
      for(let item of economicbowler) {
        seriesData.push([item.bowler, parseFloat(item.economy)]);
      }
    
      Highcharts.chart('topeconomicbowler', {
        chart: {
            type: 'column'
        },
        title: {
            text: ' Top Economical Bowlers in 2015 season:'
        },
        subtitle: {
            text:  'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Economy'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Economy: <b>{point.y:.2f}</b>'
        },
        series: [{
           
            data: seriesData,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.2f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
    }
function visualizeextrarunsbyeachteam(extrarunsbyeachteam)
{
  const seriesData = Object.entries(extrarunsbyeachteam);
  Highcharts.chart('extraruns', {
    chart: {
        type: 'column'
    },
    title: {
        text: ' Extra runs conceded by each team in 2016:'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Extra Runs'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Extra runs: <b>{point.y:.1f}</b>'
    },
    series: [{
       
        data: seriesData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}





function visualizemostmanofmatches(mostmanofmatch) {

  seriesdata3=Object.entries(mostmanofmatch);

Highcharts.chart("mostmanofthematches", {
  chart: {
      type: 'column'
  },
  title: {
      text: 'man of the matches more than 10 times'
  },
  subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },
  xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Matches Won'
      }
  },
  legend: {
      enabled: false
  },
  tooltip: {
      pointFormat: 'Matches Won: <b>{point.y:.0f}</b>'
  },
  series: [{
     
      data: seriesdata3,
      dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.0f}', // one decimal
          y: 10,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  }]
});

}