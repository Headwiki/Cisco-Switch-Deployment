<template>
  <tr>
    <td>{{ ipd }}</td>
    <td>{{ status }}</td>
    <td>{{ image }}</td>
    <td><button>{{ action }}</button></td>
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
      action: 'Configure',
      timer: ''
    };
  },
  created() {
    this.checkStatus()
    this.timer = setInterval(this.checkStatus, 10000)
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
          // eslint-disable-next-line
          console.log(res.data)
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
// Ask backend if switch is online
//   Get switch info
</script>

<style>
</style>
