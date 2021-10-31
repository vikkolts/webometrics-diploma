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
import avarageMarkByYears from '@/reports/avarage-mark-by-years.json'
import allAbitsByYears from '@/reports/all-abits-by-years.json'
import abitsByZVO2021 from '@/reports/abits-by-ZVO-2021.json'
import nubipStats from '@/reports/nubip.json'

export default {
  name: 'Dashboard',
  components: {
    Pivot
  },
  data(){
    return{
      avarageMarkByYears: avarageMarkByYears,
      allAbitsByYears: allAbitsByYears,
      abitsByZVO2021: abitsByZVO2021,
      nubipStats: nubipStats,
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