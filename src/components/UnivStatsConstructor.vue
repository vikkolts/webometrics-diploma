<template>
  <Pivot
    ref="constructor-fm"
   :report="reportUniStats"
   toolbar
   :global="{localization: ukrLocale, readOnly: false}"
   height="645px"
   container=".pivot-container"
  ></Pivot>
</template>

<script>
import Pivot from "@/components/Pivot"
import ukrLocale from '../locale/uk.json'

export default {
  name: 'UnivStatsConstructor',
  props: ['univData'],
  components: {
    Pivot
  },
  data(){
    return{
      reportUniStats: {
        "dataSource": {
          "data": this.univData
          },
          "multipleMeasures": true,
          "slice": {
              "rows": [
                {
                  "uniqueName": "ЗВО", 
                  "filter": {
                      "exclude": [
                        
                      ]
                  }, 
                  "sort": "unsorted"},
                {"uniqueName": "Рік"}],
              "columns": [{"uniqueName": "[Measures]"}
              ],
              "measures": [
                  {"uniqueName": "Всього заяв","aggregation": "average"},
                  {"uniqueName": "Метрика","aggregation": "average","format": "-11hifdljgqv40"},
                  {"uniqueName": "Рейтинг Україна","aggregation": "average"}
              ],
              "flatSort": [{"uniqueName": "Всього заяв","sort": "desc"}]
          },
          "options": {
              "viewType": "charts",
              "configuratorButton": false,
              "chart": {
                  "type": "column_line",
                  "showDataLabels": true,
                  "activeMeasure": {"uniqueName": "Рейтинг Україна","aggregation": "average"}
              }
          },
          "formats": [
              {
                  "name": "-11hifdljgqv40",
                  "decimalPlaces": 2
              }
          ],
      },
      ukrLocale: ukrLocale,
    }
  },
  watch: {
    univData(){
      if(this.univData){
        window.flexmonster.updateData({data: this.univData});
      }
    }
  },
  mounted() {
  },
  updated(){
  },
  methods: {
  },
}
</script>