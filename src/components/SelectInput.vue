<template>
  <div :id="wrapperId" :class="selectClasses">
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

    <div class="select-menu" :style="menuMaxHeightStyle" data-cy="select-menu">
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
const PX_IN_ONE_REM = 16;

export default {
  name: "SelectInput",

  props: {
    value: {
      type: [String, Number],
      default: "",
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
    windowHeight: 0,
  }),

  computed: {
    id() {
      return "1";
    },

    selectClasses() {
      return {
        "select-open-menu": this.isOpenedMenu,
        "minimize-placeholder": this.search,
        "scroll-menu": this.isFilledMoreHalfScreen,
      };
    },

    selectValue: {
      get() {
        const selectedItem = this.options.find((option) => option.value === this.value);

        return selectedItem ? selectedItem.value : null;
      },
      set(newItem) {
        this.$emit("input", newItem);
      },
    },

    filteredOptions() {
      const selectedValue = this.options?.find((item) => item.value === this.selectValue);

      if (this.search && selectedValue && this.search !== selectedValue.text) {
        return this.options.filter((item) => {
          return item.text.toLowerCase().includes(this.search.toLowerCase());
        });
      }

      return this.options;
    },

    menuMaxHeightStyle() {
      const maxHeight = this.windowHeight / 2 / PX_IN_ONE_REM;

      return `max-height: ${maxHeight}rem`;
    },

    wrapperId() {
      return `wrapper${this.id}`;
    },

    isFilledMoreHalfScreen() {
      const menuItemHeight = 40;
      const allMenuItemsHeight = menuItemHeight * this.options?.length;
      const allMenuHeightInRem = allMenuItemsHeight / PX_IN_ONE_REM;
      const maxHeight = this.windowHeight / 2 / PX_IN_ONE_REM;

      return allMenuHeightInRem > maxHeight;
    },
  },

  mounted() {
    this.windowHeight = window.screen.height;

    this.prefillValue();
  },

  methods: {
    prefillValue() {
      if (this.value) {
        const selectedItem = this.options?.find((item) => item.value === this.value);

        this.selectValue = selectedItem.value;
        this.search = selectedItem.text;
      }
    },

    onFocusOpenMenu() {
      this.isOpenedMenu = true;
    },

    onBlurCloseMenu() {
      this.isOpenedMenu = false;
      this.clearSearchInput();
    },

    clearSearchInput() {
      const selectedItem = this.options?.find((item) => item.text === this.search);

      if (!selectedItem) {
        this.search = "";
      }
    },

    onClickSelectItem(item) {
      if (item.value === this.selectValue) {
        this.selectValue = "";
        this.search = "";
      } else {
        this.selectValue = item.value;
        this.search = item.text;
      }
    },

    setActiveItemClass(value) {
      return this.selectValue === value ? "active-item" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.select {
  &-wrapper {
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
    @apply mt-1;

    &:focus-visible {
      outline-width: 0;
    }
  }

  &-menu {
    @apply border border-gray-300 bg-white;
    @apply opacity-0 transition duration-100 ease-in-out;
    @apply h-0 w-0;

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
      @apply h-auto w-auto opacity-100;
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

.scroll-menu {
  .select-menu {
    @apply overflow-y-scroll;
  }
}

.active-item {
  @apply bg-gray-100;
}
</style>
