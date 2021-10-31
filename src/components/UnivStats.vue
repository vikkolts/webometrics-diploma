<template>
  <Pivot
   :report="reportUniStats"
   :global="{localization: ukrLocale, readOnly: true}"
   height="645px"
   container=".pivot-container"
  ></Pivot>
</template>

<script>
import Pivot from "@/components/Pivot"
import ukrLocale from '../locale/uk.json'

export default {
  name: 'UnivStats',
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
    selectedMode(){
      this.getReport();
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