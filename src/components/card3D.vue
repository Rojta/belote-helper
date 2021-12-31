<template>
  <model-viewer
    v-pre
    auto-rotate
    camera-controls
    xr-environment
    ar
    ar-modes="quick-look webxr scene-viewer"
    ar-scale="auto"
    id="model-viewer"
    interaction-prompt="none"
    shadow-intensity="0"
    rotation-per-second="50deg"
    field-of-view="50deg"
    max-field-of-view="50deg"
    environment-image="https://assets.gm.miami/belote-helper/belote360out.jpg"
    skybox-image="https://assets.gm.miami/belote-helper/belote360out.jpg"
  >
  </model-viewer>
</template>

<script>
import "@google/model-viewer/dist/model-viewer";

export default {
  name: "card3D",
  props: {
    card: Object,
  },
  mounted() {
    this.$nextTick(function () {
      let el = document.getElementById("model-viewer");
      el.setAttribute("poster", `https://assets.gm.miami/belote-helper/card2D/${this.card.file}.jpg`);
      el.setAttribute("src", `https://assets.gm.miami/belote-helper/card3D/${this.card.file}.glb`);
    });
  },
};
</script>

<style lang="scss" scoped>
button {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: none;
  background-color: blue;
  box-sizing: border-box;
}

button[slot="hotspot-hand"] {
  --min-hotspot-opacity: 0;
  background-color: #f1f1f1dc;
}

button[slot="hotspot-foot"]:not([data-visible]) {
  background-color: transparent;
  border: 3px solid blue;
}

#annotation {
  background-color: #f1f1f19a;
  position: absolute;
  transform: translate(10px, 10px);
  border-radius: 10px;
  padding: 10px;
}
/* This keeps child nodes hidden while the element loads */
:not(:defined) > * {
  display: none;
}

model-viewer {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
