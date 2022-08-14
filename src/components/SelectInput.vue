<template>
  <div class="select" :class="selectClasses">
    <div class="select-wrapper">
      <label :for="id" class="select-label" data-cy="select-label" />

      <label class="select-placeholder" :for="id">
        {{ placeholder }}
      </label>

      <input
        :id="id"
        v-model="search"
        class="select-input"
        data-cy="select-input"
        @focus="onFocusOpenMenu"
        @blur="onBlurCloseMenu"
      />
    </div>

    <div class="select-menu" data-cy="select-menu">
      <div
        v-for="item in filteredOptions"
        :key="item.value"
        :class="setActiveItemClass(item.value)"
        class="select-menu-item"
        @mousedown="onClickSelectItem(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInput",

  props: {
    value: {
      type: [Object, Number],
      default: null,
    },

    placeholder: {
      type: String,
      default: "",
    },

    options: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    isOpenedMenu: false,
    search: "",
  }),

  computed: {
    id() {
      const maxNumber = 1000;

      return String(Math.floor(Math.random() * maxNumber));
    },

    selectClasses() {
      return {
        "select-open-menu": this.isOpenedMenu,
        "minimize-placeholder": this.search,
      };
    },

    selectValue: {
      get() {
        const selectedItem = this.options.find((option) => option.value === this.value?.value);

        return selectedItem ? selectedItem : null;
      },
      set(newItem) {
        this.$emit("input", newItem);
      },
    },

    filteredOptions() {
      if (this.search) {
        return this.options.filter((item) => {
          return item.text.toLowerCase().includes(this.search.toLowerCase());
        });
      }

      return this.options;
    },
  },

  created() {
    this.prefillValue();
  },

  methods: {
    prefillValue() {
      const selectedItem = this.options?.find((item) => item.value === this.value?.value);

      this.selectValue = this.value;
      this.search = selectedItem?.text || "";
    },

    onFocusOpenMenu() {
      this.isOpenedMenu = true;

      this.search = "";
    },

    onBlurCloseMenu() {
      this.isOpenedMenu = false;

      if (!this.selectValue) {
        this.clearSearchInput();
      } else {
        this.search = this.selectValue.text;
      }
    },

    clearSearchInput() {
      this.search = "";
    },

    onClickSelectItem(item) {
      if (item.value === this.selectValue?.value) {
        this.selectValue = null;
        this.search = "";
      } else {
        this.selectValue = item;
        this.search = item.text;
      }
    },

    setActiveItemClass(value) {
      return this.selectValue?.value === value ? "active-item" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.select {
  @apply relative;

  &-wrapper {
    @apply flex;
    @apply bg-white;
    @apply relative rounded-lg border border-gray-300;
    @apply px-4 pt-4 pb-2;

    &:focus-within {
      @apply border-blue-400;
    }
  }

  &-label {
    @apply absolute top-0 left-0;
    @apply h-full w-full;
  }

  &-placeholder {
    @apply absolute;
    @apply text-xl font-normal text-gray-400;
    transition-duration: 0.5s;
  }

  &-input {
    @apply mt-1 w-full;

    &:focus-visible {
      outline-width: 0;
    }
  }

  &-menu {
    @apply absolute;
    @apply border border-gray-300 bg-white;
    @apply opacity-0 transition duration-100 ease-in-out;
    @apply h-0 w-0 overflow-y-auto;

    &-item {
      @apply text-base font-normal text-gray-700;
      @apply p-2;
      @apply cursor-pointer;

      &:hover {
        @apply bg-gray-200;
      }
    }
  }

  &-open-menu {
    .select-menu {
      @apply h-auto max-h-[50vh] w-full opacity-100;
      @apply z-10;
    }

    .select-wrapper {
      @apply rounded-b-none;
    }

    .select-placeholder {
      @apply top-1.5 text-xs;
    }
  }
}

.minimize-placeholder {
  .select-placeholder {
    @apply top-1.5 text-xs;
  }
}

.active-item {
  @apply bg-gray-300;
}
</style>
