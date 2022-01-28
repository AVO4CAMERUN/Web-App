<template>
  <!-- Sidebar -->
  <nav class="sidebar " :class="{close: isClose}">
    <!-- Sidebar-header -->
    <header>
      <div class="image-text">
        <span class="image">
          <img src="../assets/logo.png" draggable="false"/>
        </span>

        <div class="text logo-text">
          <span class="name">Avo4Camerun</span>
        </div>
      </div>
      <i @click="isClose = !isClose" class="bx bx-chevron-right toggle"></i>
    </header>

    <!-- Sidebar-content -->
    <div class="menu-bar">

      <!-- Main button -->
      <div class="menu">

        <!--  -->
        <li class="nav-link" v-for="button in dataButtons" :key="button">
          <router-link :to="button.path">
            <i :class="button.icon"></i>
            <span class="text nav-text">{{ button.message }}</span>
          </router-link>
        </li>
      </div>
      <!-- Bottom button -->
      <div class="bottom-content">
        <li class="">
          <router-link to="/"
          @click="logout"
          >
            <i class="bx bx-log-out icon"></i>
            <span class="text nav-text">Logout</span>
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
import { loginService as ls } from '../servises/login.service'
import store from '../store/index'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      isClose: true,
      dataButtons: [
        { icon: 'bx bx-search icon', message: 'Search', path: '/search' },
        { icon: 'bx bx-book-bookmark icon', message: 'My Courses', path: '/mycourses' },
        { icon: 'bx bx-chalkboard icon', message: 'My Classes', path: '/myclasses' },
        { icon: 'bx bx-cog icon', message: 'Settings', path: '/settings' }
      ]
    }
  },
  methods: {
    logout () {
      ls.logout()
        .then((response) => {
          console.log(response.status)
          //
          // if (response.status === 403) {}
          // Remove saved refreshToken and accessToken
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          // Kicking out from web app
          this.$router.push('/login')
          store.commit('changeLogin')
          // console.log(obj) */
        })
        .catch(() => {
          console.log('dddd')
        })
    }
  }
}

</script>

<style>
/* Sidebar*/
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background: var(--sidebar-color);
  transition: var(--tran-05);
  z-index: 100;
}
.sidebar.close {
  width: 88px;
}

.sidebar li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.sidebar header .image,
.sidebar .icon {
  min-width: 60px;
  border-radius: 6px;
}

.sidebar .icon {
  min-width: 60px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.sidebar .text,
.sidebar .icon {
  color: var(--text-color);
  transition: var(--tran-03);
}

.sidebar .text {
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 1;
}
.sidebar.close .text {
  opacity: 0;
}

.sidebar header {
  position: relative;
}

.sidebar header .image-text {
  display: flex;
  align-items: center;
}
.sidebar header .logo-text {
  display: flex;
  flex-direction: column;
}
header .image-text .name {
  margin-top: 4px;
  font-size: 18px;
  font-weight: 600;
}

.name {
  color: black;
}

.image-text {
  margin-top: 10px;
}

.sidebar header .image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar header .image img {
  width: 40px;
  border-radius: 6px;
}

.sidebar header .toggle {
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: var(--primary-color);
  color: var(--sidebar-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  transition: var(--tran-05);
}

body.dark .sidebar header .toggle {
  color: var(--text-color);
}

.sidebar.close .toggle {
  transform: translateY(-50%) rotate(0deg);
}

.sidebar .menu {
  margin-top: 15px;
}

.sidebar li.search-box {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  cursor: pointer;
  transition: var(--tran-05);
}

.sidebar li.search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: var(--primary-color-light);
  color: var(--text-color);
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  transition: var(--tran-05);
}
.sidebar li a {
  list-style: none;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: var(--tran-03);
}

.sidebar li a:hover {
  background-color: var(--primary-color);
}
.sidebar li a:hover .icon,
.sidebar li a:hover .text {
  color: var(--sidebar-color);
}
body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text {
  color: var(--text-color);
}

.sidebar .menu-bar {
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}
.menu-bar::-webkit-scrollbar {
  display: none;
}
.sidebar .menu-bar .mode {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  position: relative;
  transition: var(--tran-05);
}

.menu-bar .mode .sun-moon {
  height: 50px;
  width: 60px;
}

.mode .sun-moon i {
  position: absolute;
}
.mode .sun-moon i.sun {
  opacity: 0;
}
body.dark .mode .sun-moon i.sun {
  opacity: 1;
}
body.dark .mode .sun-moon i.moon {
  opacity: 0;
}

.menu-bar .bottom-content .toggle-switch {
  position: absolute;
  right: 0;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}
.toggle-switch .switch {
  position: relative;
  height: 22px;
  width: 40px;
  border-radius: 25px;
  background-color: var(--toggle-color);
  transition: var(--tran-05);
}

.switch::before {
  content: "";
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--sidebar-color);
  transition: var(--tran-04);
}

body.dark .switch::before {
  left: 20px;
}

.home {
  position: absolute;
  top: 0;
  top: 0;
  left: 250px;
  height: 100vh;
  width: calc(100% - 250px);
  background-color: var(--body-color);
  transition: var(--tran-05);
}
.home .text {
  font-size: 30px;
  font-weight: 500;
  color: var(--text-color);
  padding: 12px 60px;
}

.sidebar.close ~ .home {
  left: 78px;
  height: 100vh;
  width: calc(100% - 78px);
}
body.dark .home .text {
  color: var(--text-color);
}
</style>
