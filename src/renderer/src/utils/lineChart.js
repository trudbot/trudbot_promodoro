import * as echarts from "echarts";

export function useLineChart(box) {
  const graph = echarts.init(box);
  graph.setOption({
    xAxis: {
      type: 'category',
      data: ['2023/6/16', '2023/6/17', '2023/6/18', '2023/6/19', '2023/6/20', '2023/6/21', '2023/6/22'],
      axisLabel: {
        interval: 1,
        rotate: 45
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          type: 'png',
          name: '番茄打卡时间表'
        },
        magicType: {
          type: ['line', 'bar']
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          //y轴线的颜色以及宽度
          show: true,
          lineStyle: {
            color: "#BDBDBD",
            width: 1,
            type: "solid",
          },
          axisLabel: {
            // 设置y轴的文字的样式
            textStyle: {
              show: true,
              color: "#BDBDBD",
              fontSize: "12",
            },
          },
        }
      },
      {
        type: "value",
        axisLine: {
          //y轴线的颜色以及宽度
          show: true,
          lineStyle: {
            color: "#BDBDBD",
            width: 1,
            type: "solid",
          },
        },
      }
    ],
    legend: {
      data: ["时长", "次数"],
    },
    color: ["#ED837C", "#E8D095"],
    series: [
      {
        name: "时长(min)",
        data: [],
        type: 'line',
        smooth: true
      },
      {
        name: "次数(次)",
        data: [],
        type: 'line',
        yAxisIndex: 1,
        smooth: true
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
    }
  });

  window.addEventListener("resize", function () {
    graph.resize();
  });

  return {graph};
}

export function updateValues(graph, newXlabs, newValues, interval) {
  const option = graph.getOption();
  let line1 = [], line2 = [];
  for (let i = 0; i < newValues.length; i ++) {
    line1.push(newValues[i][0]);
    line2.push(newValues[i][1]);
  }
  option.series[0].data = line1;
  option.series[1].data = line2;
  option.xAxis[0].data = newXlabs;
  option.xAxis[0].axisLabel.interval = interval;
  graph.setOption(option);
}
