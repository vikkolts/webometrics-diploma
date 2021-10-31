<template>
  <h2 class="w-100" style="font-size: 16px; margin-top: 0">
    Загальна кореляція: 
    <span :style="{backgroundColor: bgColor}">
      {{avgCorrelation}}% {{getCorrelationText}}
    </span>
  </h2>
  <Pivot
    :report="correlation"
    :global="{localization: ukrLocale, readOnly: true}"
    height="630px"
    container=".pivot-container"
  ></Pivot>
</template>

<script>
import Pivot from "@/components/Pivot"
import ukrLocale from '../locale/uk.json'

export default {
  name: 'Correlation',
  props: ['correlationData', 'avgCorrelation'],
  components: {
    Pivot
  },
  data(){
    return{
      ukrLocale: ukrLocale,
      correlation: {
        "dataSource": {
            "data": this.correlationData
        },
        "slice": {
            "rows": [
                {
                    "uniqueName": "ЗВО"
                }
            ],
            "columns": [
                {
                    "uniqueName": "[Measures]"
                }
            ],
            "measures": [
                {
                    "uniqueName": "Сер. всього заяв",
                    "aggregation": "sum"
                },
                {
                    "uniqueName": "Сер. метрика",
                    "aggregation": "average",
                    "format": "-rvl1brc47db00"
                },
                {
                    "uniqueName": "Кореляція",
                    "aggregation": "average",
                    "format": "-big8wut6b8n00"
                }
            ],
            "sorting": {
                "column": {
                    "type": "desc",
                    "tuple": [],
                    "measure": {
                        "uniqueName": "Сер. всього заяв",
                        "aggregation": "sum"
                    }
                }
            },
            "flatSort": [
                {
                    "uniqueName": "Сер. всього заяв",
                    "sort": "desc"
                }
            ]
        },
        "conditions": [
            {
                "formula": "#value < 0",
                "measure": "Кореляція",
                "format": {
                    "backgroundColor": "#F44336",
                    "color": "#FFFFFF",
                    "fontFamily": "Arial",
                    "fontSize": "12px"
                }
            },
            {
                "formula": "#value > 0",
                "measure": "Кореляція",
                "format": {
                    "backgroundColor": "#8BC34A",
                    "color": "#000000",
                    "fontFamily": "Arial",
                    "fontSize": "12px"
                }
            }
        ],
        "formats": [
            {
                "name": "-big8wut6b8n00",
                "decimalPlaces": 2,
                "isPercent": true
            },
            {
                "name": "-rvl1brc47db00",
                "decimalPlaces": 2
            }
        ]
      },
    }
  },
  computed:{
    bgColor: function(){ return `hsla(${this.avgCorrelation < 0 ?  4 : 88}, 55%, 58%, ${Math.abs(parseInt(this.avgCorrelation))}%)`},
    getCorrelationText: function(){
      if(this.avgCorrelation){
        if(Math.abs(this.avgCorrelation) < 1 && Math.abs(this.avgCorrelation) >= 0)
          return '(відсутня)'
        else if(Math.abs(this.avgCorrelation) < 33 && Math.abs(this.avgCorrelation) > 1)
          return '(слабка)'
        else if(Math.abs(this.avgCorrelation) >= 33 && Math.abs(this.avgCorrelation) < 66)
          return '(помітна)'
        else if(Math.abs(this.avgCorrelation) >= 66 )
          return '(сильна)'
        else return ''
      }else{
        return ''
      }
    },
  },
  watch: {
  },
  created(){
  },
  mounted() {
  },
  updated(){
  },
  methods: {
  },
}
</script>