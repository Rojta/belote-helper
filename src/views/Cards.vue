<template>
  <Card>
    <template #title>Cards</template>
    <template #content>
      <div class="p-grid">
        <div v-for="card in cards" :key="card" class="p-col-12 p-md-6 p-lg-3">
          <div class="card-item">
            <div class="card-item-content">
              <div class="p-mb-3">
                <img v-lazy="`https://assets.gm.miami/belote-helper/card2D/${card.file}.jpg`" :alt="card.file" class="card-image" />
              </div>
              <div>
                <h4 class="p-mb-1">{{ card.name }}</h4>
                <h6 class="p-mt-0 p-mb-3">{{ card.points }} poena</h6>
                <span class="card-badge">{{ card.trumpPoints }} poena</span>
                <div class="car-buttons p-mt-5">
                  <Button
                    @click="
                      selectedCard = card;
                      display = true;
                    "
                    icon="pi pi-search"
                    class="p-button p-button-rounded p-mr-2"
                    v-tooltip.bottom="'Pogledaj u 3D'"
                  />
                  <Button
                    v-if="card.favorite === true"
                    @click="favorite(card, false)"
                    icon="fa-solid fa-star"
                    class="p-button-warning p-button-rounded p-mr-2"
                    v-tooltip.bottom="'Makni iz favorita'"
                  />
                  <Button
                    v-else
                    @click="favorite(card, true)"
                    icon="fa-regular fa-star"
                    class="p-button-outlined p-button-warning p-button-rounded p-mr-2"
                    v-tooltip.bottom="'Favoriraj'"
                  />
                  <!--<Button icon="pi pi-star-fill" class="p-button-success p-button-rounded p-mr-2" />
                  <Button icon="pi pi-cog" class="p-button-help p-button-rounded" />-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <Dialog :modal="true" :header="selectedCard.name" v-model:visible="display">
    <div style="width: 90vw; height: 500px">
      <Card3D :card="selectedCard"></Card3D>
    </div>
  </Dialog>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Card3D from "../components/card3D.vue";

export default {
  name: "Cards",
  components: {
    Card3D,
    Button,
    Card,
    Dialog,
  },
  data() {
    return {
      selectedCard: { name: "", file: "", points: 0, trumpPoints: 0 },
      display: false,
      favorites: [],
      cards: [
        {
          name: "Bundeva 7",
          file: "bundeva7",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Bundeva 8",
          file: "bundeva8",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Bundeva 9",
          file: "bundeva9",
          points: 0,
          trumpPoints: 14,
          favorite: false,
        },
        {
          name: "Bundeva 10",
          file: "bundeva10",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Bundeva As",
          file: "bundevaAs",
          points: 11,
          trumpPoints: 11,
          favorite: false,
        },
        {
          name: "Bundeva Dama",
          file: "bundevaDama",
          points: 3,
          trumpPoints: 3,
          favorite: false,
        },
        {
          name: "Bundeva Decko",
          file: "bundevaDecko",
          points: 2,
          trumpPoints: 20,
          favorite: false,
        },
        {
          name: "Bundeva Kralj",
          file: "bundevaKralj",
          points: 4,
          trumpPoints: 4,
          favorite: false,
        },
        {
          name: "List 7",
          file: "list7",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "List 8",
          file: "list8",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "List 9",
          file: "list9",
          points: 0,
          trumpPoints: 14,
          favorite: false,
        },
        {
          name: "List 10",
          file: "list10",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "List As",
          file: "listAs",
          points: 11,
          trumpPoints: 11,
          favorite: false,
        },
        {
          name: "List Dama",
          file: "listDama",
          points: 3,
          trumpPoints: 3,
          favorite: false,
        },
        {
          name: "List Decko",
          file: "listDecko",
          points: 2,
          trumpPoints: 20,
          favorite: false,
        },
        {
          name: "List Kralj",
          file: "listKralj",
          points: 4,
          trumpPoints: 4,
          favorite: false,
        },
        {
          name: "Srce 7",
          file: "srce7",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Srce 8",
          file: "srce8",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Srce 9",
          file: "srce9",
          points: 0,
          trumpPoints: 14,
          favorite: false,
        },
        {
          name: "Srce 10",
          file: "srce10",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Srce As",
          file: "srceAs",
          points: 11,
          trumpPoints: 11,
          favorite: false,
        },
        {
          name: "Srce Dama",
          file: "srceDama",
          points: 3,
          trumpPoints: 3,
          favorite: false,
        },
        {
          name: "Srce Decko",
          file: "srceDecko",
          points: 2,
          trumpPoints: 20,
          favorite: false,
        },
        {
          name: "Srce Kralj",
          file: "srceKralj",
          points: 4,
          trumpPoints: 4,
          favorite: false,
        },
        {
          name: "Zir 7",
          file: "zir7",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Zir 8",
          file: "zir8",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Zir 9",
          file: "zir9",
          points: 0,
          trumpPoints: 14,
          favorite: false,
        },
        {
          name: "Zir 10",
          file: "zir10",
          points: 0,
          trumpPoints: 0,
          favorite: false,
        },
        {
          name: "Zir As",
          file: "zirAs",
          points: 11,
          trumpPoints: 11,
          favorite: false,
        },
        {
          name: "Zir Dama",
          file: "zirDama",
          points: 3,
          trumpPoints: 3,
          favorite: false,
        },
        {
          name: "Zir Decko",
          file: "zirDecko",
          points: 2,
          trumpPoints: 20,
          favorite: false,
        },
        {
          name: "Zir Kralj",
          file: "zirKralj",
          points: 4,
          trumpPoints: 4,
          favorite: false,
        },
      ],
    };
  },
  methods: {
    favorite(card, favorite) {
      this.cards[this.cards.indexOf(card)].favorite = favorite;
      if (favorite === true) {
        this.favorites.push(card.name);
      } else {
        this.favorites.splice(this.favorites.indexOf(card.name), 1);
      }
    },
  },
  watch: {
    cards: {
      handler() {
        this.cards = this.cards.sort((a, b) => {
          return a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1;
        });
      },
      deep: true,
    },
    favorites: {
      handler() {
        const favoritesParsed = JSON.stringify(this.favorites);
        localStorage.setItem("favorites", favoritesParsed);
      },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.getItem("favorites")) {
      try {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        this.cards.forEach((card, n) => {
          if (this.favorites.includes(card.name)) {
            this.cards[n].favorite = true;
          }
        });
      } catch (e) {
        localStorage.removeItem("favorites");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.card-item {
  .card-item-content {
    border: 1px solid var(--surface-d);
    border-radius: 3px;
    margin: 0.3rem;
    text-align: center;
    padding: 2rem 0;
  }

  .card-image {
    width: 50%;
    border-radius: 9px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.card-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  background: #c8e6c9;
  color: #256029;
}
</style>
