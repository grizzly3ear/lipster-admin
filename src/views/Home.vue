<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs6>
        <v-container
          style="position: relative;top: 13%;  border: 2px solid #b2b2b2; border-radius: 10px; padding: 30px 50px 50px 50px; margin: 30px 180px 0 180px;"
          class="text-xs-center"
        >
          <v-card flat>
            <v-card-title primary-title>
              <h4 style="font-size: 20px; text-align: center;">Login</h4>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon="person" v-model="email" label="Email"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
              <v-card-actions>
                <v-btn primary large block @click="onLoginClick">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../utils/axios.js";

export default {
  methods: {
    async onLoginClick() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      const login = await axios.post(`api/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      window.localStorage.setItem("token", login.data.token);
      Swal.fire({
        position: "center",
        type: "success",
        title: "You login successed!",
        showConfirmButton: false,
        timer: 1000
      });
      this.$router.push("LipstickBrand");
    }
  },
  mounted() {
    window.localStorage.removeItem("token");
  },
  data: () => ({
    email: "",
    password: "",
    router: ""
  })
};
</script>
