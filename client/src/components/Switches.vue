<template>
  <div>
    <div v-if="status == 'connecting'">
      <p>Connecting to {{ this.url }}</p>
      <div class="loader"></div>
    </div>
    <p v-else-if="status == 'connected'">Connected to {{ this.url }}</p>
    <p v-else-if="status == 'not connected'">Couldn't connect to {{ this.url }}</p>
    <p v-else>Error</p>
    <table>
      <thead>
        <tr>
          <th>IP-address</th>
          <th>Status</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <SwitchDevice v-for="ip in ips" :ip="ip" :key="ip"/>
      </tbody>
    </table>
  </div>
</template>
<script>
import SwitchDevice from "./SwitchDevice.vue";
const axios = require("axios");

export default {
  name: "Switches",
  components: {
    SwitchDevice
  },
  data() {
    return {
      ips: [],
      url: "http://127.0.0.1:3000/",
      status: "connecting"
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios({
        method: "get",
        url: this.url,
        timeout: 5000
      })
        .then(res => {
          this.status = "connected";
          if (res.data != "") this.ips = res.data;
          else this.ips = "";
        })
        .catch(error => {
          this.status = "not connected";
          // eslint-disable-next-line
          console.log(error)
        });
    },
    getStatus() {}
  }
};
</script>
<style>
table {
  margin: auto;
}

.loader {
  display: inline-block;
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hidden {
    visibility: hidden;
  }
</style>
