<template>
<nav class="navbar is-primary">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="@/assets/logo.png" alt="awesome skills" width="50" height="50">
    </a>
    <div class="navbar-burger burger" data-target="awesome-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="awesome-menu" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/">Home</router-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link to="/login">Login</router-link>
          </p>
          <p class="control">
            <router-link to="/">SignUp</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
