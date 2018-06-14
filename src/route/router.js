import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../components/index/Cont";
import Course from "../components/course/Course";
import Recommend from "../components/course/Recommend";
import Search from "../components/course/Search";
import NewComment from "../components/course/NewComment";
import Detail from "../components/course/Detail";
import Subject from "../components/subject/Subject";
import Landing from "../components/common/Landing";
import User from "../components/user";
import PromotionLanding from "../components/common/promotionLanding";

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
      name: "search",
      path: "/search",
      component: Search
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
      name: "user",
      path: "/user",
      component: User
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
    },
    {
      name: "promotionLanding",
      path: "/promotion/register",
      component: PromotionLanding
    }
  ]
});
