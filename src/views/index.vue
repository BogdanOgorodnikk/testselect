<template>
  <SelectInput
    v-model="selectedItem"
    :options="[{ value: 1, text: 'Text' }]"
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
    selectedItem: "",
  }),
};
</script>
