<template>
  <div class="card">
    <div class="course">Anime Design 5B
      <div class="under-course">
        Henry Drackm
      </div>
    </div>
    <div class="course-box-icons">
      <img src="../assets/icon.png" class="course-img" draggable="false">
      <a href="#" class="course-links">
        <i class='bx bx-message course-icons'></i>
      </a>
      <a href="#" class="course-links">
        <i class='bx bx-archive-in course-icons'></i>
      </a>
    </div>

    <div class="course-description">
      ciao, sono Henry Drackm, il tuo tutore personale di Lepsoy
    </div>
    <div class="progress-content">
      <div class="percentage">{{progress}}%</div>
      <div class="border-progress-bar">
        <div class="overflow-progress-bar">
          <div class="progress-bar" :style="styleObject"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { loginService as ls } from '../servises/login.service'
// import store from '../store/index'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      styleObject: {
        width: this.progress + '%'
      }
    }
  },
  methods: {},
  computed: {},
  props: {
    progress: Number
  }
}

</script>

<style>
.card {
    width: 300px;
    height: 180px;
    object-fit: cover;
    display: block;
    background-color: white;
    border-radius: 12px 12px 12px 12px;
}
.course {
    background: linear-gradient(0.35turn, #63b377, #3f87a6);
    color: white;
    width: 100%;
    font-size: 18px;
    padding: 10px;
    border-radius: 12px 12px 0px 0px;
}
.course-box-icons {
    margin-top: 0;
    float: right;
    margin-right: 13px;
    width: 80px;
    font-family: sans-serif;
    padding: 0px 0px 0px 0px;
}
.course-box-icons * {
    box-sizing: border-box;
}
.course-icons {
    float: right;
    width: 20px;
    margin-top: 15px;
    margin-right: 5px;
    display: block;
    border-radius: 50%;
    color: var(--text-color);
    transition: var(--tran-03);
    font-size: 20px;
}
.course-links:hover {
    cursor: pointer;
}
.under-course {
    font-size: 13px;
}
.course-img {
    float: right;
    margin-right: 10px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    outline: 8px solid white;
}
.progress-content {
    position: relative;
    margin-left: 10px;
    width: 213px;
    height: 32px;
}
.border-progress-bar {
    position: relative;
    width: 213px;
    height: 15px;
    border-radius: 12px;
    background: linear-gradient(0.35turn, #63b377, #3f87a6);
}
.overflow-progress-bar {
    position: absolute;
    width: 209px;
    height: 11px;
    border-radius: 12px;
    border: solid 2px rgb(255, 255, 255);
    background-color: white;
    margin-left: 2px;
    margin-top: 2px;
}
.progress-bar {
    position: relative;
    height: 7px;
    border-radius: 12px;
    background: linear-gradient(0.35turn, #63b377, #3f87a6);
}
.percentage {
    font-size: 11px;
    text-align: right;
    font-weight: 600;
    color: #3f87a6;
}
.course-description {
    width: 185px;
    font-size: 9px;
    height: 66px;
    overflow: hidden;
    font-weight: 600;
    color: #707070;
    margin-top: 5px;
    margin-left: 10px;
    word-wrap: break-word;
}
</style>
