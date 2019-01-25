<template>
  <tr>
    <td>{{ ipd }}</td>
    <td>{{ image }}</td>
    <td>{{ status }}</td>
    <td>{{ action }}</td>
  </tr>
</template>

<script>
export default {
  name: "SwitchDevice",
  props: {
    ip: String
  },
  data() {
    return {
      ipd: this.ip,
      image: 'image',
      status: 'status',
      action: 'action'
    };
  },
  methods: {}
};
</script>

<style>
</style>
