<template>
  <div id="app">
    <div>
      <tinymce-editor ref="editor" v-model="value"></tinymce-editor>
      {{ value }}
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor/tinymce-editor.vue'
// import TinymceEditor from "@/components/tinymce-editor/tinymce-editor copy 2";

export default {
  name: 'App',
  components: {
    TinymceEditor
  },
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    console.log(this.$refs.editor)
  }
}
</script>

<style></style>
