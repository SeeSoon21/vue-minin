<template>
  <div id="app">
    <Form
      class="login-form"
      @submit="submit"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <h2>Login</h2>

      <div class="error-message" v-if="errMsg">{{ errMsg }}</div>

      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <Field
          id="email"
          name="email"
          type="text"
          v-model="email"
          class="form-input"
          :class="{ 'p-invalid': errors.email }"
        />
        <span class="p-error">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password</label>
        <Field
          id="password"
          name="password"
          type="text"
          v-model="password"
          class="form-input"
          :class="{ 'p-invalid': errors.password }"
        />
        <span class="p-error">{{ errors.password }}</span>
      </div>
      <button class="btn btn-primary btn-block" type="submit">Login</button>
    </Form>
  </div>

  <div>
    <article v-for="(location, idx) in locations" :key="idx">
      <img :src="location.image" />
      <h1>{{ location.name }}</h1>
    </article>
  </div>
</template>

<script>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { db } from "../main";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  components: { Field, Form, ErrorMessage },
  props: {
    params: {
      required: true,
      type: Object,
    },
  },
  data() {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    });
    return {
      email: "",
      password: "",
      errMsg: "",
      schema,
      location: [],
    };
  },
  emits: ["callback"],
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((value) => {
          alert("Successfully sign in");
          this.$router.push('/');
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "User not found";
              break;
            case "auth/wrong-password":
              this.errMsg = "Wrong password";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
  },
};
</script>