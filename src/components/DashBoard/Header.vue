<template>
  <!-- Header -->
  <div class="navbar">
    <img id="user-pic" src="../../assets/icon.png" draggable="false" />
    <a href="#">
      <i class="bx bx-bell nav-icon"></i>
    </a>
    <a href="#">
      <i class="bx bx-chat nav-icon"></i>
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style>
.navbar {
  position: sticky;
  display: block;
  width: 100%;
  height: 73px;
  background-color: #fff;
}

#user-pic {
  float: right;
  display: block;
  width: 50px;
  border-radius: 50%;
  margin-top: 12px;
  margin-right: 10px;
}

#user-pic:hover {
  filter: brightness(75%);
  cursor: pointer;
  transition: var(--tran-03);
}

.nav-icon {
  float: right;
  display: block;
  padding: 10px;
  border-radius: 50%;
  margin-top: 19px;
  margin-right: 10px;
  color: var(--text-color);
  transition: var(--tran-03);
  font-size: 20px;
}

.nav-icon:hover {
  background-color: #3f87a6;
  color: white;
}
</style>
