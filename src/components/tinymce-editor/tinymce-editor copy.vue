<template>
  <!-- tinymce-editor 富文本框组件 -->
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"> </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons"; // 解决了icons.js 报错Unexpected token '<'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件

export default {
  components: {
    Editor,
  },
  props: {
    // 初始值
    value: {
      type: String,
      default: "",
    },
    // 高度
    height: {
      type: Number,
      default: 500,
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: "",
    },
    // 是否禁用富文本的编辑
    disabled: {
      type: Boolean,
      default: false,
    },
    // 富文本的插件
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount",
    },
    // 工具栏
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | bold italic forecolor backcolor removeformat | formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table ",
    },
    // 字体大小
    fontsize: {
      type: String, // 字符串中的每一项都应以空格或逗号分隔并包含单位
      default: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
    },
  },
  data() {
    return {
      myValue: this.value, // 富文本内容
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`, //语言包的路径
        language: "zh_CN", //语言
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        selector: "textarea",
        height: this.height, // 编辑器高度
        plugins: this.plugins, // 富文本的插件
        toolbar: this.toolbar, // 工具栏
        fontsize_formats: this.fontsize, // 字体大小
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(blobInfo, success, failure);
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
      },
    };
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue); // 子组件在传值的时候，选用input，如this.$emit(‘input’,val)，在父组件直接用v-model绑定，就可以获取到了
    },
  },
  mounted() {
    tinymce.init({});
  },
};
</script>