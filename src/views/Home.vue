<template>
  <h1 style="font-size: 24px; width: 100%">Інформаційно-аналітична система показників вступу на ІТ-спеціальності та метрик відкритих електронних ресурсів ЗВО</h1>
  <div class="d-flex gap-3 mx-auto mb-2">
    <div>
      <input v-model="selectedMode" type="radio" id="radio-1" value="1">
      <label for="radio-1">Дашборд</label>
    </div>
    <div>
      <input v-model="selectedMode" type="radio" id="radio-2" value="2">
      <label for="radio-2">Кількість заяв та значення метрики для ЗВО за період 2018-2021</label>
    </div>
    <div>
      <input v-model="selectedMode" type="radio" id="radio-3" value="3">
      <label for="radio-3">Кореляція для ЗВО за період 2018-2021</label>
    </div>
    <!-- <div>
      <input v-model="selectedMode" type="radio" id="radio-4" value="4">
      <label for="radio-4">КПЕ</label>
    </div> -->
  </div>
  <template v-if="univData && univData.length > 0">
    <template v-if="selectedMode === '1'">
      <Dashboard :univData="univData"/>
    </template>
    <template v-else-if="selectedMode === '2'">
      <UnivStats :univData="univData"/>
    </template>
    <template v-else-if="selectedMode === '3' && correlationData && correlationData.length > 0">
      <Correlation :correlationData="correlationData" :avgCorrelation="avgCorrelation"/>
    </template>
  </template>
</template>

<script>
import UnivStats from '@/components/UnivStats'
import Dashboard from '@/components/Dashboard'
import Correlation from '@/components/Correlation'

export default {
  name: 'Home',
  components: {UnivStats, Dashboard, Correlation},
  data(){
    return{
      selectedMode: '1',
      univData: [],
      correlationData: [],
      avgCorrelation: '',
    }
  },
  watch: {
  },
  created(){
    //load all needed data
    fetch("http://localhost:3333/univ-stats")
      .then(response => response.json())
      .then(jsonResponse =>this.univData = jsonResponse || []);
    fetch("http://localhost:3333/univ-correlations")
      .then(response => response.json())
      .then(jsonResponse =>this.correlationData = jsonResponse || []);
    fetch("http://localhost:3333/avg-correlation")
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