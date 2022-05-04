<template>
  <div
    ref="parent"
    class="widget-otp-parent otp-gap-18"
    data-widget="widget-otp-parent"
  >
    <template v-if="type === 'number'">
      <input
        v-for="(count, index) in childs"
        :key="index"
        :ref="`widget-otp-input-${index}`"
        type="number"
        min="0"
        max="9"
        step="1"
        maxlength="1"
        autocomplete="off"
        spellcheck="false"
        inputmode="decimal"
        @keyup="checkEvent"
        @input="clearedToFocus"
        @paste="codePasted"
      />
    </template>

    <template v-if="type === 'text'">
      <input
        v-for="(count, index) in childs"
        :key="index"
        :ref="`widget-otp-input-${index}`"
        type="text"
        maxlength="1"
        autocomplete="off"
        spellcheck="false"
        @keyup="checkEvent"
        @input="clearedToFocus"
        @paste="codePasted"
      />
    </template>
  </div>
</template>

<script lang="js">

export default {
  name: "OtpInput",
  emits: ["code"],
  props:{
    childs: {
        type: Number,
        default: 6
    },
    type: {
        type: String,
        default: 'number'
    }
  },
  data () {
      return {
          code : []
      }
  },
  methods:{
    targetIndex (elm) {
        return [...elm.parentNode.children].indexOf(elm)
    },

    clearedToFocus ({ target }) {
       (target.value = String(target.value)[0] || '');
    },

    checkEvent (event) {
      event.preventDefault();
      event.stopPropagation();
      //
      const that = event.target;
      const index = this.targetIndex(that);
      const isNumber = /^\d$/i.test(event.key) && this.type === 'number';
      const isText = /(^\D)|(^\d)$/i.test(event.key) && this.type === 'text';
      const nextSibling = this.$refs.parent.children[index + 1];
      const prevSibling = this.$refs.parent.children[index - 1];

      if (event.key !== "Backspace" && (isNumber || isText)) {
        this.code.push(String(that.value));
        if(that.value) that.classList.add('hasvalue');
        if (nextSibling) nextSibling.focus();
      } else if (event.key === "Backspace") {
        that.value = "";
        this.code.splice(this.code.indexOf(String(that.value), 1));
        that.classList.remove('hasvalue');
        if (prevSibling) prevSibling.focus();
      }
    },

    codePasted (e) {
      const codep = String(e.clipboardData.getData('Text')).trim();
      const ins = this.$refs.parent.querySelectorAll("input");
      if(codep && /^[0-9]*$/.test(codep) && codep.length === 6) {
        ins.forEach((node, index)=>{
          node.value = codep[index];
          this.code.push(String(codep[index]));
          node.focus();
        })
      }
    }
  },

  watch:{
    code: {
      handler: function (val, oldVal) {
        const codeLength = this.code.length;
        const sendCode = this.code.join("");
        if (codeLength === this.childs) this.$emit("code", sendCode);
        else if (codeLength === 0) this.$emit("code", sendCode);
      },
      deep: true
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
::placeholder {
  font-weight: 400;
  color: gray;
}

.otp-gap-16 {
  margin: -16px 0 0 -16px;
  width: calc(100% + 16px);
}

.otp-gap-16 > * {
  margin: 16px 0 0 16px;
}

.otp-gap-18 {
  margin: -18px 0 0 -18px;
  width: calc(100% + 18px);
}

.otp-gap-18 > * {
  margin: 18px 0 0 18px;
}

div[data-widget="widget-otp-parent"] {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: 0;
}

@-moz-document url-prefix()/*firefox*/
{
  input[type="number"] {
    max-width: 52px;
    padding: 12px 0;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="text"] {
  max-width: 52px;
  padding: 12px 0;
}

input {
  border: 0;
  outline: none;
  background: transparent;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 12px;
  border: 2px solid #a5bce0;
  border-radius: 0.25rem;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  line-height: 26px;
}

input:focus {
  border-color: #4760b9;
}

input.hasvalue {
  border-color: #4760b9;
}
</style>
