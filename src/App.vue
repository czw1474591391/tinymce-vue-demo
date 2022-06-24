<template>
  <div id="app">
    <div >
      <tinymce-editor ref="editor" v-model="value" />
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor/tinymce-editor.vue'

export default {
  name: 'App',
  components: {
    TinymceEditor
  },
  data() {
    return {
      value: '123'
    }
  },
  mounted() {
    console.log(this.$refs.editor)
  }
}
</script>

<style></style>
