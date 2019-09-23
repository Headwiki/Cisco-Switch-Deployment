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
      if (document.hasFocus()){
        axios({
          method: "get",
          url:  "http://localhost:3000/telnet/" + this.ip + "/check/",
          timeout: 10000
        })
          .then(res => {
            this.status = res.data;
            // eslint-disable-next-line
            console.log(res.data)
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error)
          });
      }
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
