<template>
  <table class>
    <thead>
      <tr>
        <th>IP-adresse</th>
        <th>Status</th>
        <th>Valg</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ip in ips" :key="ip">
        <td>{{ ip }}</td>
        <td></td>
        <!-- <td v-if="ip.status">
          <span class="label label-success">Online</span>
        </td>
        <td v-else>
          <span class="label label-danger">Offline</span>
        </td>-->
        <td>valg</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const axios = require("axios");

export default {
  name: "Switches",
  data() {
    return {
      ips: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData () {
      axios.get("http://10.8.1.0/cgi-bin/dhcp.cgi")
      .then((res) => {
        this.ips = ["1.1.1.1"]
      })
    },
    getStatus() {}
  }
};
</script>
<style>
</style>
