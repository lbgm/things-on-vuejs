<template>
  <div class="range-input-component flex flex-col max-w-[200px]">
    <!--label-->
    <span
      v-if="label"
      class="block text-sm text-black leading-[1.125rem] -tracking-[0.1px] opacity-80 font-semibold mb-2"
    >
      <span>{{ label }}</span
      >&thinsp;<span
        v-if="required"
        class="text-left text-DA1414 font-semibold opacity-80 text-xs leading-5"
        >*</span
      >
    </span>
    <!---->
    <div
      class="border-858C94 border border-b-0 py-3 px-4 rounded-lg rounded-br-none rounded-bl-none inline-flex"
    >
      <input
        :placeholder="placeholder"
        class="border-0 outline-none appearance-none flex-shrink w-full bg-transparent text-black text-opacity-50 font-semibold text-sm leading-4"
        type="number"
        :name="name"
        :id="name"
        :value="range"
        min="0"
        max="100"
        step="1"
        @input="clearedToFocus"
        :autocomplete="'off'"
        spellcheck="false"
      />
    </div>
    <div class="range-input-container inline-flex">
      <input
        type="range"
        min="0"
        max="100"
        :value="range"
        @input="clearedToFocus"
        :class="`range-to-${range}`"
        class="w-full flex-shrink"
      />
    </div>
    <!---->
    <!---->
    <!-- error message -->
    <div :data-form-novalidate="hasError" v-if="hasError" class="w-full">
      <span class="!mt-2 block w-full widget-form-error-message" role="alert">
        {{ $t("errors.required") }}
      </span>
    </div>
    <!---->
  </div>
</template>

<script lang="js">
export default {
  props: {
    initRange: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: `input-range-${new Date().getTime()}`
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    required: {
      type: Boolean,
    },
  },
  data() {
    return {
      range: this.initRange,
    };
  },
  watch: {
    range: {
      handler(){
       this.$emit('range', String(this.range))
      },
      deep: true
    }
  },
  methods:{
    clearedToFocus ({ target }) {
      let val = Number(target.value);
      val = val > 100 ? 100 : val;
      //
      this.range = target.value = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.range-input-component {
  max-width: 200px;
}
input[type="range"] {
  -webkit-appearance: none;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0;
  border: 1px solid #858c94;
  background: #fff;
  background-image: linear-gradient(to right, #006a52 20%, transparent 0%);

  @for $i from 0 to 101 {
    &.range-to-#{$i} {
      background-image: linear-gradient(
        to right,
        #006a52 #{$i}%#{","} transparent 0%
      );
    }
  }
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

input::-ms-reveal,
input::-ms-clear {
  display: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
