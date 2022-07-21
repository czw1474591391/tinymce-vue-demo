# tinymce-vue-demo

-   单独提取了 tinymce 的 plugins 扩展功能

-   同时要把 node_modeles 内的 tinymce 中的 skins 单独提出到 public 文件夹内（解决找不到 js css 文件的问题）

##### <p style="color:red">注意：由于 tinymce 默认是通过 cdn 的方式加载远程资源，加载数学公式的 kityFormula.html 时会报错，这时我们只需要把 plugin.min.js 里面的 tinymce.baseURL 修改成本地的 tinymce 就可以了。</p>
