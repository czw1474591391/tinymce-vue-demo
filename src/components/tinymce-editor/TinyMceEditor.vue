<template>
  <div>
    <textarea :id="tinymceId"></textarea>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce';
export default {
  name: "tinymce",
  data() {
    const Id = Date.now();
    return {
      tinymceId: this.id || "vue-tinymce" + Date.parse(new Date()),
      hasInit: false,
      hasChange: false,
    };
  },
  props: {
    value: {
      default: "",
      type: String,
    },

    url: {
      default: "",
      type: String,
    },
    accept: {
      default: "image/jpeg, image/png",
      type: String,
    },
    maxSize: {
      default: false,

      default: 2097152,
      type: Number,
    },
    withCredentials: {
      default: false,
      type: Boolean,
    },
    height: {
      type: Number,
      requier: false,
      default: 400,
    },
    DefaultConfig: {
      // type: Object || Number || Boolean || Array,
      requier: false,
      default: () => {
        return {
          //语言
          language_url: "/static/tinymce/zh_CN.js",
          language: "zh_CN",
          // GLOBAL
          theme: "modern",
          menubar: false,
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
          plugins: ` paste importcss image  code table advlist fullscreen link media lists  textcolor colorpicker hr  preview `,
          // CONFIG
          forced_root_block: "p",
          force_p_newlines: true,
          importcss_append: true,
          // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
          content_style: `
         *                         { padding:0; margin:0; }
         html, body                { height:100%; }
        img                       { max-width:100%; display:block;height:auto; }
        a                         { text-decoration: none; }
        iframe                    { width: 100%; }
        p                         { line-height:1.6; margin: 0px; }
        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
        ul,ol                     { list-style-position:inside; }
        `,

          insert_button_items: "image link | inserttable",

          // CONFIG: Paste
          paste_retain_style_properties: "all",
          paste_word_valid_elements: "*[*]", // word需要它
          paste_data_images: false, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: "all",
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,

          // CONFIG: Font
          fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",

          // CONFIG: StyleSelect
          style_formats: [
            {
              title: "首行缩进",
              block: "p",
              styles: { "text-indent": "2em" },
            },
            {
              title: "行高",
              items: [
                { title: "1", styles: { "line-height": "1" }, inline: "span" },
                {
                  title: "1.5",
                  styles: { "line-height": "1.5" },
                  inline: "span",
                },
                { title: "2", styles: { "line-height": "2" }, inline: "span" },
                {
                  title: "2.5",
                  styles: { "line-height": "2.5" },
                  inline: "span",
                },
                { title: "3", styles: { "line-height": "3" }, inline: "span" },
              ],
            },
          ],

          // FontSelect
          font_formats: `
        微软雅黑=微软雅黑;
        宋体=宋体;
        黑体=黑体;
        仿宋=仿宋;
        楷体=楷体;
        隶书=隶书;
        幼圆=幼圆;
        Andale Mono=andale mono,times;
        Arial=arial, helvetica,
        sans-serif;
        Arial Black=arial black, avant garde;
        Book Antiqua=book antiqua,palatino;
        Comic Sans MS=comic sans ms,sans-serif;
        Courier New=courier new,courier;
        Georgia=georgia,palatino;
        Helvetica=helvetica;
        Impact=impact,chicago;
        Symbol=symbol;
        Tahoma=tahoma,arial,helvetica,sans-serif;
        Terminal=terminal,monaco;
        Times New Roman=times new roman,times;
        Trebuchet MS=trebuchet ms,geneva;
        Verdana=verdana,geneva;
        Webdings=webdings;
        Wingdings=wingdings,zapf dingbats`,
          // Tab
          tabfocus_elements: ":prev,:next",
          object_resizing: true,
          // Image
          imagetools_toolbar:
            "rotateleft rotateright | flipv fliph | editimage imageoptions",
        };
      },
    },
  },
  mounted() {
    this.initTinymce();
  },

  methods: {
    initTinymce() {
      const _this = this;
      tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        // body_class: "panel-body rich-text",
        //是否可拉伸
        resize: true,

        //是否显示 官方的logo
        branding: false,
        // 默认配置
        ...this.DefaultConfig,
        // prop内传入的的config
        ...this.config,
        // menubar: this.menubar,
        //插件
        powerpaste_word_import: "clean",
        //源代码弹出层宽
        // code_dialog_height:,
        //源代码弹出层高
        // code_dialog_width: "100%",
        //
        imagetools_cors_hosts: ["wpimg.wallstcn.com", "wallstreetcn.com"],
        //链接打开方式
        default_link_target: "_blank",
        images_upload_url: "/oss/file/uploadRichImg?dir=image",
        //上传图片回调
        images_upload_handler: (blobInfo, success, failure) => {
          failure("无此功能");
        },
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          //进来页面没改变值之前
          _this.hasInit = true;
          editor.on("NodeChange Change input KeyUp", () => {
            //第一次进入的时候change触发watch去setContent，光标变化了，
            this.hasChange = true;
            this.$emit("input", editor.getContent({ format: "raw" }));
          });
        },
      });
    },
    destroyTiny() {
      window.removeEventListener("tinymce", this.initTinymce);
      // 销毁监听事件
    },
    setContent(val) {
      window.tinymce.get(this.tinymceId).setContent(val);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
  },
  destroyed() {
    this.destroyTiny();
  },

  watch: {
    value(newV, oldV) {
      //当传入值不变化的时候更新富文本内容,
      if (this.hasInit && !this.hasChange) {
        window.tinymce.get(this.tinymceId).setContent(newV);
      }
    },
  },
};
</script>
