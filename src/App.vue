<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

html, body{
  margin: 0;
  padding: 0;
  border: 0;
}

.d-flex{
  display: flex;
}

.flex-wrap{
  flex-wrap: wrap;
}

.w-100{
  width: 100%
}
.gap-1{
  gap: 0.5rem;
}
.gap-2{
  gap: 1rem;
}
.gap-3{
  gap: 1.5rem;
}
.p-3{
  padding: 1.5rem;
}

.mb-2{
  margin-bottom: 1rem;
}
.mx-auto{
  margin-left: auto;
  margin-right: auto;
}
</style>
