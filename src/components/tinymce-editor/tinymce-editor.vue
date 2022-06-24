<template>
  <!-- tinymce-editor 富文本框组件 -->
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"></editor>
    <button @click="aa">设置内容</button>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/template'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/save'
import 'tinymce/plugins/print'

// 扩展插件
// import '../../../public/tinymce-plugins/lineheight'
// import '../../../public/tinymce-plugins/axupimgs'// 图片批量上传插件
// import '../../../public/tinymce-plugins/bdmap'

export default {
  components: {
    Editor
  },
  props: {
    // 初始值
    value: {
      type: String,
      default: ''
    },
    // 高度
    height: {
      type: Number,
      default: 600
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ''
    },
    // 是否禁用富文本的编辑
    disabled: {
      type: Boolean,
      default: false
    },
    // 富文本的插件
    plugins: {
      type: [String, Array],
      default:
        'print save preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave autoresize'
    },
    // 工具栏
    toolbar: {
      type: [String, Array],
      default:
        'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent formatpainter | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap hr pagebreak insertdatetime | fullscreen preview | save print'
    },
    // 内容样式-（直接为编辑区编写css）
    content_style: {
      type: String, //（直接为编辑区编写css）
      default: 'p{margin: 0px 0;}'
    },
    // 字体大小
    fontsize_formats: {
      type: String, // 字符串中的每一项都应以空格或逗号分隔并包含单位
      default: '8px 10px 12px 14px 16px 18px 24px 36px 48px'
    },
    // 字体
    font_formats: {
      type: String, // 配置编辑器可选则的字体列表。格式为：标题1=字体名1,字体名2可多个;标题2=字体名3,每一项用分号分隔，字体名之间用逗号分隔。字体名写法可参考CSS的font-family。
      default:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;'
    }
  },
  data() {
    return {
      myValue: this.value, // 富文本内容
      init: {
        language: 'zh_CN', //语言
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`, //语言包的路径
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        // content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        // selector: 'textarea',
        toolbar_mode: 'wrap', // 工具栏模式, 取值：floating / sliding / scrolling / wrap
        height: this.height, // 编辑器高度
        min_height: this.height, // 编辑器最小高度（最小去掉貌似有问题）
        max_height: this.height, // 编辑器最大高度
        plugins: this.plugins, // 富文本的插件
        toolbar: this.toolbar, // 工具栏
        content_style: this.content_style, // 内容样式
        fontsize_formats: this.fontsize_formats, // 字体大小
        font_formats: this.font_formats, // 字体
        branding: false, // 隐藏右下角技术支持
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(blobInfo, success, failure)
          // const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(
            `http://img10.360buyimg.com/n1/jfs/t1/27452/29/10357/142066/5c8619c9Eb4da05ba/cf8c8486390b297a.jpg`
          )
        }
        //  save_onsavecallback: function (aa) { alert('已保存',aa); }
      }
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue) // 子组件在传值的时候，选用input，如this.$emit(‘input’,val)，在父组件直接用v-model绑定，就可以获取到了
    }
  },
  mounted() {
    // tinymce.init({})
  },
  methods: {
    aa() {
      tinymce.editors[0].setContent('这里是设置的内容')
    }
  }
}
</script>
