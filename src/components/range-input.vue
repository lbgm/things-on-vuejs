<template>
  <input type="range" min="0" max="200" />
</template>

<style lang="scss" scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0;
  border: 1px solid #858c94;
  background: #fff;
}

input[type="range"]::-webkit-slider-thumb
/*input[type="range"]::-moz-range-thumb
input[type="range"]::-ms-thumb*/ {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 0;
  border: 1px solid #858c94;
  background: #fff;
  cursor: ew-resize;
}

input[type="range"]::-webkit-slider-runnable-track
/*input[type="range"]::-moz-range-track
input[type="range"]::-ms-track*/ {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
