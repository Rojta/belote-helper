<template>
  <Dropdown v-model="selectedTrump" :options="trumps" optionLabel="adut" placeholder="Odaberi aduta">
    <template #value="slotProps">
      <div class="p-dropdown-car-value" v-if="slotProps.value">
        <img
          style="height: 50px"
          :alt="slotProps.value.name"
          v-lazy="`https://assets.gm.miami/belote-helper/trump2D/png/${slotProps.value.file}.png`"
        />
      </div>
    </template>
    <template #option="slotProps">
      <div class="p-dropdown-car-option">
        <img
          style="height: 50px"
          :alt="slotProps.option.name"
          v-lazy="`https://assets.gm.miami/belote-helper/trump2D/png/${slotProps.option.file}.png`"
        />
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  name: "trumpSelector",
  components: {
    Dropdown,
  },
  data() {
    return {
      speech: {
        listen: false,
        lang: "hr_HR",
        transcription: [],
      },
      selectedTrump: { name: "Bundeva", file: "bundeva" },
      trumps: [
        { name: "Bundeva", file: "bundeva" },
        { name: "List", file: "list" },
        { name: "Srce", file: "srce" },
        { name: "Zir", file: "zir" },
      ],
    };
  },
  methods: {
    startSpeechToTxt() {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();
      recognition.lang = this.speech.lang;
      recognition.interimResults = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        let text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.speech.transcription = text;
      });
      // end of transcription
      recognition.addEventListener("end", () => {
        console.log(`DEBUG: ${this.speech.transcription}`);
        this.speech.transcription = "";
      });
      recognition.start();
    },
  },
  mounted() {
    let that = this;

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.lang = this.speech.lang;
    recognition.interimResults = true;

    // event current voice reco word
    recognition.addEventListener("result", (event) => {
      console.log(`DEBUG: recognition result`);

      let temparr = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      this.speech.transcription = temparr.join(" ");

      if (this.speech.transcription && typeof this.speech.transcription === "string") {
        let t = this.speech.transcription.toLowerCase();

        let stavioList = ["stavi", "stavio", "stavila", "stavili", "stari", "stani", "šta"];

        console.log(t);
        let args = t.split(" ");
        if (args[0] && args[1]) {
          if (stavioList.includes(args[0])) {
            switch (args[1]) {
              case "bundeva":
              case "bundevu":
              case "karo":
              case "karu":
              case "bundu":
                this.selectedTrump = { name: "Bundeva", file: "bundeva" };
                recognition.abort();
                this.speech.listen = false;
                break;
              case "list":
              case "lista":
              case "pik":
              case "zelena":
              case "zeleno":
              case "zeleni":
                this.selectedTrump = { name: "List", file: "list" };
                recognition.abort();
                this.speech.listen = false;
                break;
              case "srce":
              case "hleb":
              case "hleba":
              case "kruh":
              case "kruha":
              case "crvena":
              case "crveno":
              case "crveni":
              case "herc":
                this.selectedTrump = { name: "Srce", file: "srce" };
                recognition.abort();
                this.speech.listen = false;
                break;
              case "zir":
              case "žir":
              case "sir":
              case "vizir":
              case "tref":
              case "zid":
              case "živ":
                this.selectedTrump = { name: "Zir", file: "zir" };
                recognition.abort();
                this.speech.listen = false;
                break;
              default:
                break;
            }
          }
        }
      }
    });
    // end of transcription
    recognition.addEventListener("end", () => {
      console.log(`DEBUG: recognition ended`);

      this.speech.transcription = "";
      if (that.speech.listen === true) recognition.start();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key == " ") {
        e.preventDefault();
        if (that.speech.listen === false) {
          recognition.start();
          that.speech.listen = true;
        } else {
          recognition.abort();
          that.speech.listen = false;
        }
      }
    });
  },
};
</script>
