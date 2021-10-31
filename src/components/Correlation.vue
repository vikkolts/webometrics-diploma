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
import correlation from '@/reports/correlation.json'

export default {
  name: 'Correlation',
  components: {
    Pivot
  },
  data(){
    return{
      ukrLocale: ukrLocale,
      correlation: correlation,
      avgCorrelation: '',
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
    fetch("http://localhost:3333/test")
      .then(response => response.json())
      .then(jsonResponse => jsonResponse ? this.avgCorrelation = +((jsonResponse[0] * 100).toFixed(2)) : this.avgCorrelation = '');
  },
  mounted() {
  },
  updated(){
  },
  methods: {
  },
}
</script>