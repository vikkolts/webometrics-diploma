<template>
  <div class="d-flex gap-1 flex-wrap w-100">
    <div style="width: 49%;">
      <h2 style="font-size: 16px; margin-bottom: 0.5rem; margin-top: 0">Середній бал за період 2018-2021</h2>
      <Pivot
        :report="avarageMarkByYears"
        :global="{localization: ukrLocale, readOnly: true}"
        height="295px"
        container=".pivot-container"
      ></Pivot>
    </div>
    <div style="width: 49%;">
      <h2 style="font-size: 16px; margin-bottom: 0.5rem; margin-top: 0">Всього заяв за період 2018-2021</h2>
      <Pivot
        :report="allAbitsByYears"
        :global="{localization: ukrLocale, readOnly: true}"
        height="295px"
        container=".pivot-container"
      ></Pivot>
    </div>
    <div style="width: 49%;">
      <h2 style="font-size: 16px; margin-bottom: 0.5rem">Відсоткове відношення кількості заяв між ЗВО за 2021</h2>
      <Pivot
        :report="abitsByZVO2021"
        :global="{localization: ukrLocale, readOnly: true}"
        height="295px"
        container=".pivot-container"
      ></Pivot>
    </div>
    <div style="width: 49%;">
      <h2 style="font-size: 16px; margin-bottom: 0.5rem">Кількість заяв та середній бал НУБІП за період 2018-2021</h2>
      <Pivot
        :report="nubipStats"
        :global="{localization: ukrLocale, readOnly: true}"
        height="295px"
        container=".pivot-container"
      ></Pivot>
    </div>
  </div>
</template>

<script>
import Pivot from "@/components/Pivot"
import ukrLocale from '../locale/uk.json'

export default {
  name: 'Dashboard',
  props: ['univData'],
  components: {
    Pivot
  },
  data(){
    return{
      avarageMarkByYears: {
          "dataSource": {
              "data": this.univData
          },
          "slice": {
              "rows": [
                  {
                      "uniqueName": "Рік"
                  }
              ],
              "columns": [
                  {
                      "uniqueName": "[Measures]"
                  }
              ],
              "measures": [
                  {
                      "uniqueName": "Всього заяв",
                      "aggregation": "sum"
                  },
                  {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average",
                      "format": "-j86b8p6gkti00"
                  }
              ]
          },
          "options": {
              "viewType": "charts",
              "chart": {
                  "type": "line",
                  "showDataLabels": true,
                  "activeMeasure": {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average"
                  }
              },
              "configuratorButton": false
          },
          "formats": [
              {
                  "name": "-j86b8p6gkti00",
                  "decimalPlaces": 3
              }
          ]
      },
      allAbitsByYears: {
          "dataSource": {
              "data": this.univData
          },
          "slice": {
              "rows": [
                  {
                      "uniqueName": "Рік"
                  }
              ],
              "columns": [
                  {
                      "uniqueName": "[Measures]"
                  }
              ],
              "measures": [
                  {
                      "uniqueName": "Всього заяв",
                      "aggregation": "sum"
                  },
                  {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average",
                      "format": "-j86b8p6gkti00"
                  }
              ]
          },
          "options": {
              "viewType": "charts",
              "chart": {
                  "type": "line",
                  "showDataLabels": true,
                  "activeMeasure": {
                      "uniqueName": "Всього заяв",
                      "aggregation": "sum"
                  }
              },
              "configuratorButton": false
          }
      },
      abitsByZVO2021: {
          "dataSource": {
              "data": this.univData
          },
          "slice": {
              "reportFilters": [
                  {
                      "uniqueName": "Рік",
                      "filter": {
                          "members": [
                              "рік.[2021]"
                          ]
                      }
                  }
              ],
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
                      "uniqueName": "Всього заяв",
                      "aggregation": "sum",
                      "format": "-4bwko4pymx70"
                  },
                  {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average"
                  },
                  {
                      "uniqueName": "% заяв",
                      "formula": "percentofcolumn(\"Всього заяв\")",
                      "caption": "% заяв",
                      "format": "-k0ckkqbnvlc00"
                  }
              ],
              "sorting": {
                  "column": {
                      "type": "desc",
                      "tuple": [],
                      "measure": {
                          "uniqueName": "Всього заяв",
                          "aggregation": "sum"
                      }
                  }
              }
          },
          "options": {
              "viewType": "charts",
              "chart": {
                  "type": "pie",
                  "showDataLabels": true,
                  "activeMeasure": {
                      "uniqueName": "% заяв",
                      "aggregation": "none"
                  }
              },
              "configuratorButton": false
          },
          "formats": [
              {
                  "name": "-4bwko4pymx70",
                  "isPercent": false
              },
              {
                  "name": "-k0ckkqbnvlc00",
                  "decimalPlaces": 1,
                  "currencySymbol": "%",
                  "positiveCurrencyFormat": "1$",
                  "negativeCurrencyFormat": "-1$",
                  "isPercent": false
              }
          ]
      },
      nubipStats: {
          "dataSource": {
              "data": this.univData
          },
          "slice": {
              "reportFilters": [
                  {
                      "uniqueName": "ЗВО",
                      "filter": {
                          "members": [
                              "зво.[нац. універ. біоресурсів і природокористування україни]"
                          ]
                      }
                  }
              ],
              "rows": [
                  {
                      "uniqueName": "Рік"
                  }
              ],
              "columns": [
                  {
                      "uniqueName": "[Measures]"
                  }
              ],
              "measures": [
                  {
                      "uniqueName": "Всього заяв",
                      "aggregation": "sum"
                  },
                  {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average"
                  }
              ]
          },
          "options": {
              "viewType": "charts",
              "chart": {
                  "type": "column_line",
                  "showDataLabels": true,
                  "activeMeasure": {
                      "uniqueName": "Сер. бал",
                      "aggregation": "average"
                  }
              },
              "configuratorButton": false
          }
        },
      ukrLocale: ukrLocale,
    }
  },
  watch: {
  },
  mounted() {
  },
  updated(){
  },
  methods: {
  },
}
</script>