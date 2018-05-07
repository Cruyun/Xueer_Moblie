import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../components/index/Cont";
import Course from "../components/course/Course";
import Recommend from "../components/course/Recommend";
import NewComment from "../components/course/NewComment";
import Detail from "../components/course/Detail";
import Subject from "../components/subject/Subject";
import Landing from "../components/common/landing";

Vue.use(VueRouter);
module.exports = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      name: "index",
      path: "/",
      component: Index
    },
    {
      name: "recommend",
      path: "/recommend",
      component: Recommend
    },
    {
      name: "all",
      path: "/all",
      component: Course
    },
    {
      name: "tip",
      path: "/tip/:id",
      component: Subject
    },
    {
      name: "course",
      path: "/course/:id",
      component: Detail
    },
    {
      name: "newComment",
      path: "/course/:id/comment",
      component: NewComment
    },
    {
      name: "landing",
      path: "/landing",
      component: Landing
    }
  ]
});
