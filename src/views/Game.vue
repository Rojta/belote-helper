<template>
  <Toast position="top-right" />
  <ConfirmPopup></ConfirmPopup>
  <div class="p-d-flex p-flex-column">
    <Card class="p-mb-2">
      <template #title>Kontrola</template>
      <template #content>
        <div class="p-grid">
          <div class="p-col">
            <!-- p-d-flex -->
            <Fieldset legend="Dodaj novog igrača">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" v-model="temp.player" placeholder="Ime" />
                <Button @click="addPlayer" class="p-mb-2 p-mr-2" label="Dodaj igrača" :disabled="temp.player.length < 1" />
              </div>
            </Fieldset>
          </div>
          <div class="p-col">
            <Fieldset legend="Dodaj rundu">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" v-model="temp.round" :value="`Runda ${save.rounds.length + 1}`" disabled />
                <Button @click="addRound(save.rounds.length + 1)" class="p-mb-2 p-mr-2" label="Dodaj rundu" />
              </div>
            </Fieldset>
          </div>
          <div class="p-col">
            <Fieldset legend="Smakni rundu">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" :value="`Runda ${save.rounds.length}`" disabled />
                <Button @click="removeRound" class="p-button-danger p-mb-2 p-mr-2" label="Smakni rundu" :disabled="save.rounds.length < 2" />
              </div>
            </Fieldset>
          </div>
          <div class="p-col">
            <Fieldset legend="Dodatno">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <trumpSelector class="p-mb-2 p-mr-2" />
                <Button @click="newGame($event)" class="p-button-danger p-mb-2 p-mr-2" label="Nova igra" />
              </div>
            </Fieldset>
          </div>
        </div>
      </template>
    </Card>
    <Card class="p-mb-2">
      <template #title>Skor</template>
      <template #content>
        <TabView>
          <TabPanel>
            <template #header>
              <i class="p-mr-1 fa-solid fa-gamepad"></i>
              <span>Igra</span>
            </template>
            <DataTable
              :value="save.players"
              editMode="cell"
              @cell-edit-complete="onCellEditComplete"
              responsiveLayout="scroll"
              showGridlines
              stripedRows
              contextMenu
              v-model:contextMenuSelection="selectedPlayer"
              @rowContextmenu="onRowContextMenu"
            >
              <Column field="total" header="Total" style="width: 5%" :sortable="true"></Column>
              <Column field="name" header="Igrač"></Column>

              <Column v-for="col of save.columns" :field="col.field" :header="col.header" :key="col.field" style="width: 25%" :sortable="true">
                <template #editor="{ data, field }">
                  <InputText v-model="data[field]" autofocus />
                </template>
              </Column>
              <template #empty> Nema igrača. </template>
            </DataTable>
          </TabPanel>
          <TabPanel>
            <template #header>
              <i class="p-mr-1 fa-solid fa-clock-rotate-left"></i>
              <span>Povijest</span>
            </template>
            <div v-if="history.length < 1">Nema povijest.</div>
            <DataTable v-for="game of history" :key="game" :value="game.players" class="p-mb-3" responsiveLayout="scroll" showGridlines stripedRows>
              <Column field="total" header="Total" style="width: 5%" :sortable="true"></Column>
              <Column field="name" header="Igrač"></Column>
              <Column v-for="col of game.columns" :field="col.field" :header="col.header" :key="col.field" style="width: 25%" :sortable="true">
                <template #editor="{ data, field }">
                  <InputText v-model="data[field]" autofocus />
                </template>
              </Column>
              <template #empty> Nema igrača. </template>
            </DataTable>
          </TabPanel>
        </TabView>
        <ContextMenu :model="menuModel" ref="cm" />
      </template>
    </Card>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Fieldset from "primevue/fieldset";
import ContextMenu from "primevue/contextmenu";
import trumpSelector from "../components/trumpSelector";
import ConfirmPopup from "primevue/confirmpopup";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

export default {
  name: "Game",
  components: {
    TabView,
    TabPanel,
    ConfirmPopup,
    trumpSelector,
    ContextMenu,
    Fieldset,
    Toast,
    Button,
    Card,
    InputText,
    DataTable,
    Column,
  },
  methods: {
    updateTrump(trump) {
      this.save.trump = trump;
    },
    removeRound() {
      this.save.players.forEach((p) => {
        p.total -= p[`round${this.save.rounds.length}`];
        delete p[`round${this.save.rounds.length}`];
      });
      this.sendToast("success", "Runda smaknuta", `Runda ${this.save.rounds.length} je smaknuta.`);
      this.save.rounds.pop();
      this.save.columns.pop();
    },
    addRound(r) {
      this.save.rounds.push(`round${r}`);
      this.save.columns.push({ field: `round${r}`, header: `Runda ${r}` });
      this.save.players.forEach((p) => {
        p[`round${r}`] = 0;
      });
      this.sendToast("success", "Runda dodan", `Runda ${r} je dodana.`);
    },
    addPlayer() {
      if (this.save.players.some((p) => p.name === `${this.temp.player}`)) return this.sendToast("error", "Vec na listi.", "Igrač je vec u igri.");

      let i = this.save.players.push({ name: this.temp.player, total: "0" }) - 1;
      this.save.rounds.forEach((r) => {
        this.save.players[i][r] = 0;
      });
      this.sendToast("success", "Igrač dodan", `${this.temp.player} je dodan u igru.`);
      this.temp.player = "";
    },
    sendToast(severity, summary, detail) {
      this.$toast.removeAllGroups();
      this.$toast.add({
        severity: `${severity}`,
        summary: `${summary}`,
        detail: `${detail}`,
        life: 3000,
      });
    },
    onCellEditComplete(event) {
      let { index, data, newValue, field } = event;
      if (!newValue) return;

      if (typeof newValue === "string" && newValue.trim().length > 0) {
        if (!Number.isInteger(parseInt(newValue))) return this.sendToast(`error`, `Broj`, `Score mora bit broj`);

        this.save.players[index][field] = parseInt(newValue);
        data[field] = newValue;

        let total = 0;
        this.save.rounds.forEach((r) => {
          total += parseInt(this.save.players[index][r]);
        });
        this.save.players[index].total = total;
      } else {
        event.preventDefault();
      }
    },
    onRowContextMenu(event) {
      this.$refs.cm.show(event.originalEvent);
    },
    removePlayer(player) {
      this.save.players = this.save.players.filter((p) => p.name !== player.name);
      this.sendToast("success", "Igrač smakljen", `${player.name} je maknut iz igre.`);
    },
    saveAll() {
      const saveParsed = JSON.stringify(this.save);
      localStorage.setItem("save", saveParsed);
      const historyParsed = JSON.stringify(this.history);
      localStorage.setItem("history", historyParsed);
    },
    newGame(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Si siguran?",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "popAccept",
        rejectClass: "popReject",
        accept: () => {
          if (this.save.players.length > 0) this.history.push(this.save);

          this.save = {
            rounds: ["round1"],
            columns: [{ field: "round1", header: "Runda 1" }],
            players: [], //default [{id: 0,name: "test1",round1: 0,total: 0,}]
          };
          this.sendToast("success", "Nova igra", "Nova igra je pokrenuta.");
        },
      });
    },
  },
  watch: {
    save: {
      handler() {
        this.saveAll();
      },
      deep: true,
    },
    history: {
      handler() {
        this.saveAll();
      },
      deep: true,
    },
  },
  data() {
    return {
      temp: {
        round: "",
        player: "",
      },
      selectedPlayer: null,
      menuModel: [{ label: "Smakni Igrača", icon: "pi pi-fw pi-times", command: () => this.removePlayer(this.selectedPlayer) }],
      save: {
        rounds: ["round1"],
        columns: [{ field: "round1", header: "Runda 1" }],
        players: [], //default [{id: 0,name: "test1",round1: 0,total: 0,}]
      },
      history: [],
    };
  },
  mounted() {
    if (localStorage.getItem("save")) {
      try {
        this.save = JSON.parse(localStorage.getItem("save"));
      } catch (e) {
        localStorage.removeItem("save");
      }
    }
    if (localStorage.getItem("history")) {
      try {
        this.history = JSON.parse(localStorage.getItem("history"));
      } catch (e) {
        localStorage.removeItem("history");
      }
    }
  },
};
</script>

<style lang="scss">
.popAccept {
  background: none;
  border: 1px solid #ffffff;
  color: #3b82f6;

  &:hover {
    border: 1px solid #3b82f6;
    background: none !important;
    color: #3b82f6 !important;
  }
  .p-button-label {
    font-size: 0px;
    &::before {
      content: "Da";
      font-size: 14px;
    }
  }
}
.popReject {
  .p-button-label {
    font-size: 0px;
    &::before {
      content: "Ne";
      font-size: 14px;
    }
  }
}
</style>
