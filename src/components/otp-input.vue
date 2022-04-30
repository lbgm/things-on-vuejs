<template>
  <div
    ref="parent"
    class="widget-otp-parent otp-gap-16"
    data-widget="widget-otp-parent"
  >
    <input
      v-for="(count, index) in 6"
      :key="index"
      :ref="`widget-otp-input-${index}`"
      type="number"
      min="0"
      max="9"
      step="1"
      maxlength="1"
      autocomplete="off"
      spellcheck="false"
      placeholder="..."
      inputmode="decimal"
      @keyup="checkEvent"
      @input="({ target }) => (target.value = String(target.value)[0] || '')"
    />
  </div>
</template>

<script lang="js">
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  Ref,
} from "vue";

export default defineComponent({
  name: "OtpInput",
  emits: ["code"],
  setup(props, context) {
    void props;

    const otpWidget = getCurrentInstance(); void otpWidget
    const parent = ref(null);
    const code = ref([]); //Ref<number[]>

    const targetIndex = (elm) => [...elm.parentNode.children].indexOf(elm);

    const checkEvent = (event) => {
      //
      const that = event.target;
      const index = targetIndex(that);
      const isNumber = /^\d$/i.test(event.key);
      const nextSibling = parent.value.children[index + 1];
      const prevSibling = parent.value.children[index - 1];

      if (event.key !== "Backspace" && isNumber) {
        code.value.push(Number(that.value));
        if(that.value) that.classList.add('hasvalue');
        if (nextSibling) nextSibling.focus();
      } else if (event.key === "Backspace") {
        that.value = "";
        code.value.splice(code.value.indexOf(Number(that.value), 1));
        that.classList.remove('hasvalue');
        if (prevSibling) prevSibling.focus();
      }
    };

    //emit code
    watch(code, () => {
      const codeLength = code.value.length;
      const sendCode = code.value.join("");
      if (codeLength === 6) context.emit("code", sendCode);
      else if (codeLength === 0) context.emit("code", sendCode);
    }, {deep: true});

    onMounted(() => {
      //
      //console.log(otpWidget.ctx.$refs);
    });

    return {
      checkEvent,
      parent,
      code,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
::placeholder {
  font-weight: 400;
  color: gray;
}

@for $i from 1 to 48 {
  .otp-gap-#{$i} {
    margin: -#{$i}px 0 0 -#{$i}px;
    width: calc(100% + #{$i}px);

    & > * {
      margin: #{$i}px 0 0 #{$i}px;
    }
  }
}

div[data-widget="widget-otp-parent"] {
  display: flex;
  justify-content: center;
  border: 0;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield; //Firefox
    border: 0;
    outline: none;
    background: transparent;
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 16px;
    border: 2px solid gray;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
    &:focus {
      border-color: #0075a3;
    }
    &.hasvalue {
      border-color: #41cd52;
    }
  }
}
</style>
