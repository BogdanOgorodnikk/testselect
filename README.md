## Use SelectInput component

```bash
npm i @bohdanohorodnik/testselec
```

- After install in your page add locale

```bash
import SelectInput from "@bohdanohorodnik/testselec";
import "@bohdanohorodnik/testselec/dist/select-input.css";
```

- Add to Component

```bash
  components: {
    SelectInput,
  },
```

- And use in your page

```bash
  <SelectInput v-model="yourModel" />
```

- Props

```bash
placeholder: <String> #Set placeholder in component
options: <Array> #Set items in menu

#options example
options=[{text: "Text", value: 1}] #value can be string or number
```