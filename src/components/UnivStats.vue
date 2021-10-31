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
import reportUniStats from '@/reports/univs-all-and-metrics-by-years.json'

export default {
  name: 'UnivStats',
  components: {
    Pivot
  },
  data(){
    return{
      reportUniStats: reportUniStats,
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