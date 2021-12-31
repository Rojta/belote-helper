import { createRouter, createWebHashHistory } from "vue-router";
import Game from "../views/Game.vue";
import Cards from "../views/Cards.vue";

const routes = [
  {
    path: "/",
    name: "Igra",
    component: Game,
  },
  {
    path: "/karte",
    name: "Karte",
    component: Cards,
  },
];

const router = createRouter({
  history: createWebHashHistory(), //createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
