<template>
  <div class="fixture panel">
      <div class="panel-header text-center">
        <div class="panel-title">Day</div>
      </div>
      <div class="body">
        <table class="table table-striped table-hover text-center">
          <thead>
              <th>Home</th>
              <th>Score</th>
              <th>Away</th>
          </thead>
          <tbody>
          <tr>
            <td class="col-5">Paris Saint-Germain</td>
            <td>2 - 0</td>
            <td class="col-5">Manchester United</td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    props: {
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    components: {
      draggable
    }
  }
</script>

<style scoped>
</style>
