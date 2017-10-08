<template>
  <tr>
    <td class="col-5"></td>
    <td></td>
    <td class="col-5"></td>
  </tr>
</template>

<script>
  export default {
    props: {
      matchProp: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        match: this.matchProp
      }
    },
    computed: {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
