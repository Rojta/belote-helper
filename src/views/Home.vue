<template>
  <Toast position="bottom-right"/>
  <div class="p-d-flex p-flex-column">
    <Card class="p-mb-2">
      <template #title>
        Controls
      </template>
      <template #content>
        <div class="p-grid">
          <div class="p-col"> <!-- p-d-flex -->
            <Fieldset legend="Dodaj novog igrača">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" v-model="newPlayer" placeholder="Ime"/>
                <Button @click="addPlayer" class="p-mb-2 p-mr-2" label="Dodaj igrača"/>
              </div>
            </Fieldset>
          </div>
          <div class="p-col">
            <Fieldset legend="Dodaj rundu">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" v-model="newRound" :value="`Runda ${rounds.length + 1}`"
                           disabled/>
                <Button @click="addRound(rounds.length + 1)" class="p-mb-2 p-mr-2" label="Dodaj rundu"/>
              </div>
            </Fieldset>
          </div>
          <div class="p-col">
            <Fieldset legend="Smakni rundu">
              <div class="p-d-flex p-flex-column p-flex-sm-row">
                <InputText class="p-mb-2 p-mr-2" type="text" :value="`Runda ${rounds.length}`"
                           disabled/>
                <Button @click="removeRound" class="p-button-danger p-mb-2 p-mr-2" label="Smakni rundu"
                        :disabled="rounds.length < 2"/>
              </div>
            </Fieldset>
          </div>
        </div>
      </template>
    </Card>
    <Card class="p-mb-2">
      <template #title>
        Score
      </template>
      <template #content>
        <DataTable :value="players" editMode="cell" @cell-edit-complete="onCellEditComplete" responsiveLayout="scroll"
                   showGridlines stripedRows contextMenu v-model:contextMenuSelection="selectedPlayer" @rowContextmenu="onRowContextMenu">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"
                  :style="{ width: `${col.width ? col.width : '25%'}` }" :sortable="true">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" autofocus/>
            </template>
          </Column>
          <template #empty>
            Nema igrača.
          </template>
        </DataTable>

        <ContextMenu :model="menuModel" ref="cm" />
      </template>
    </Card>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Fieldset from 'primevue/fieldset';
import ContextMenu from 'primevue/contextmenu';


export default {
  components: {
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
    removeRound() {
      this.rounds.pop();
      this.columns.pop();
    },
    addRound(r) {
      this.rounds.push(`round${r}`);
      this.columns.push({field: `round${r}`, header: `Runda ${r}`});
      this.players.forEach(p => {
        p[`round${r}`] = 0;
      })
      this.sendToast('success', 'Runda dodan', `${this.newRound} je dodan.`);
    },
    addPlayer() {
      if (this.newPlayer.length < 1) return this.sendToast('error', 'Nema imena', 'Kako bez imena?');
      if (this.players.some(p => p.name === `${this.newPlayer}`)) return this.sendToast('error', 'Vec na listi.', 'Igrač je vec u igri.');

      let i = this.players.push({name: this.newPlayer, total: "0"}) - 1;
      this.rounds.forEach(r => {
        this.players[i][r] = 0;
      })
      this.sendToast('success', 'Igrač dodan', `${this.newPlayer} je dodan u igru.`);
      this.newPlayer = "";
    },
    sendToast(severity, summary, detail) {
      this.$toast.removeAllGroups();
      this.$toast.add({
        severity: `${severity}`,
        summary: `${summary}`,
        detail: `${detail}`,
        life: 3000
      });
    },
    onCellEditComplete(event) {
      let {index, data, newValue, field} = event;
      if (!newValue) return;

      if (newValue.trim().length > 0) {
        if (!Number.isInteger(parseInt(newValue))) return this.sendToast(`error`, `Broj`, `Score mora bit broj`)

        this.players[index][field] = parseInt(newValue);
        data[field] = newValue;

        let total = 0;
        this.rounds.forEach(r => {
          total += parseInt(this.players[index][r]);
        })
        this.players[index].total = total;
      } else {
        event.preventDefault();
      }
    },
    onRowContextMenu(event) {
      this.$refs.cm.show(event.originalEvent);
    },
    removePlayer(player) {
      this.players = this.players.filter(p => p.name !== player.name);
      this.sendToast('success', 'Igrač smakljen', `${player.name} je maknut iz igre.`);
    }
  },
  data() {
    return {
      selectedPlayer: null,
      menuModel: [
        {label: 'Smakni Igrača', icon: 'pi pi-fw pi-times', command: () => this.removePlayer(this.selectedPlayer)}
      ],
      newRound: "",
      newPlayer: "",
      rounds: ['round1'],
      columns: [
        {field: 'total', header: 'Total', width: '2%'},
        {field: 'name', header: 'Igrač'},
        {field: 'round1', header: 'Runda 1'},
      ],
      players: [], //default [{id: 0,name: "test1",round1: 0,total: 0,}]
    }
  },
}
</script>

<style lang="scss">
</style>
