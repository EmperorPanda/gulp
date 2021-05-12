<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{message}}</li>

            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                required
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                required
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                required
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notAuthenticated',
  name: 'login',
  data() {
    return {
      user: {
        "email": "",
        "password": "",
        username: ''
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = this.isLogin ? await login({
          user: this.user
        }) : await register({
          user: this.user
        })
        console.log(res.data,8888)
        this.$store.commit('setUser', res.data.user)
        Cookie.set('user', res.data.user)
        this.$router.push('/')
      } catch (err){
        console.dir(err,8888)
        this.errors = err.response.data.errors
      }
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  }
};
</script>

<style lang="scss" scoped>
</style>