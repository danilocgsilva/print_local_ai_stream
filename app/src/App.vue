<template>
  <IndexComponent />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IndexComponent from './components/IndexComponent.vue';

@Options({
  components: {
    IndexComponent,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
