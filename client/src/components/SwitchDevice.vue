<template>
  <tr>
    <td>{{ ipd }}</td>
    <td>{{ status }}</td>
    <td>{{ image }}</td>
    <td>{{ action }}</td>
  </tr>
</template>

<script>
const axios = require("axios");

export default {
  name: "SwitchDevice",
  props: {
    ip: String
  },
  data() {
    return {
      ipd: this.ip,
      status: 'Offline',
      image: '<image>',
      action: '<action>'
    };
  },
  created() {
    this.checkStatus()
  },
  methods: {
    checkStatus() {
      axios({
        method: "get",
        url:  "http://localhost:3000/ssh/" + this.ip + "/check/",
        timeout: 5000
      })
        .then(res => {
          if (res.data == "Online") this.status = "Online";
          else this.status = "Offline";
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
        });
    }
  }
};
// Ask backend if switch is online
//   Get switch info
</script>

<style>
</style>
