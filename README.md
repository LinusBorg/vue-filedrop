# vue-filedrop

## What this is

Vue Filedrop is a UI component that provides a dropzone for files, like this:

-> **TODO: enter image here**

It *also* is a renderless component that wraps all of the business logic (drag&drop event handling etc) and provides an easy to consume API via a scoped slot. This allows developers to build their own UI representation of a Filedrop easily and withut worrying about edge cases and such.

## Usage

### UI component

```html
<filedrop-ui @change="handlFiles">
```

### Renderless component

```html
<filedrop v-slot="{
  dragEvents,
  hovering,
  files,
  open,
}">
  <div
    :class="hovering ? 'some-class-for-hover-state'"
    v-on:click="open"
    v-on="dragEvents"
  >
  <p v-if="!file.length && !hovering">Drop files here or click to select</p>
  <p v-elseif="hovering">You can drop the file(s) here </p>
  <ul v-else>
    <li v-for="file in files">{{file.name}}</li>
  </ul>
</filedrop>
```

## Installation

> WARNING
> This package hasnt been published yet, so install instructions don't work.

### Webpack or other bundlers

```bash
npm i vue-filedrop
# or
yarn add filedrop
```

```javascript
import Vue from 'vue'
import Filedrop from 'vue-filedrop'

Vue.use(Filedrop, {
  // Default component names, customizable
  // setting one to `false` skips their global registration
  filedropName: 'Filedrop',
  filedropUiName: 'FiledropUi'
})
```

## Browser

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-filedrop"></script>
```

In the browser, the plugin will automatically register the components globally

## Features

## Development

<details>

<summary>Click here to see information for constributors</summary>

### Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lints and fixes files

```bash
yarn run lint
```

### Run all tests

```bash
yarn run test
```

### Run your unit tests

```bash
yarn run test:unit
```

### Customize configuration

This project is based on Vue CLI, see  its [Configuration Reference](https://cli.vuejs.org/config/) for further info.
</details>