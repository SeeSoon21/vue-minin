<template>
  <Form
    class="card auth-card"
    @submit="submit"
    :validation-schema="schema"
    v-slot="{ errors }"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="error-message" v-if="errMsg">{{ errMsg }}</div>

      <div class="input-field">
        <label for="email">Email</label>
        <Field
          id="email"
          name="email"
          type="text"
          v-model="email"
          :class="{ 'p-invalid': errors.email }"
        />

        <span class="p-error"> {{ errors.email }} </span>
      </div>

      <div class="input-field">
        <Field
          id="password"
          name="password"
          type="text"
          class="validate"
          v-model="password"
          :class="{ 'p-invalid': errors.password }"
        />
        <label for="password">Пароль</label>
        <span class="p-error"> {{ errors.password }} </span>
      </div>

      <div class="input-field">
        <Field
          id="name"
          type="text"
          class="validate"
          name="name"
          v-model="name"
          :class="{ 'p-invalid': errors.name }"
        />
        <label for="name">Имя</label>
        <span class="p-error"> {{ errors.name }} </span>
      </div>
      <p>
        <label>
          <Field
            type="checkbox"
            name="acceptTerms"
            class="form check input"
            :class="{ 'p-invalid': errors.acceptTerms }"
            value="true"
          />
          <span>С правилами согласен</span>
        </label>
        <span class="p-error"> {{ errors.acceptTerms }} </span>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click="registerBtn"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>

        <button
          class="btn waves-effect waves-light auth-submit"
          @click="signInWithGoogle"
        >
          Войти с помощью Google
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default {
  components: { Field, Form, ErrorMessage },
  props: {
    params: {
      required: true,
      type: Object,
    },
  },
  emits: ["callback"],
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      name: yup.string().required(),
      acceptTerms: yup.string().required("Нужно подтвердить своё согласие!"),
    });
    return {
      email: "",
      name: "",
      password: "",
      acceptTerms: null,
      schema,
    };
  },
  methods: {
    submit() {
      console.log("Нажата кнопка регистрации");
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          this.$router.push("/login");
          alert("Success");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log("resultUser: " + result.user);
        this.$router.push("/");
      })
      .catch((error) => {
        console.log("error: " + error.ErrorMessage)
      });
    },
  },
};
</script>