<template>
  <SelectInput
    v-model="selectedItem"
    :options="[
      { value: 1, text: 'Text' },
      { value: 2, text: 'World' },
      { value: 3, text: 'Value' },
    ]"
    placeholder="Placeholder"
  />
</template>

<script>
import SelectInput from "@/components/SelectInput";

export default {
  components: {
    SelectInput,
  },

  data: () => ({
    selectedItem: null,
  }),
};
</script>
