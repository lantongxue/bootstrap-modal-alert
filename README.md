# bootstrap-modal
快速使用bootstrap模态框的插件
# 简介

基于 jquery bootstrap AdminLTE 所编写的快速弹出 Modal 插件<br />
默认使用了 AdminLTE 里面的 Modal 主题<br />
所以，如果要使用本插件里面的 theme 选项，需要配合 AdminLTE <br />
当然，你也可以自定义主题，你只需要重写下面的任意一个样式<br />
主题：modal-default modal-primary modal-info modal-warning modal-success modal-danger
# 使用方式

``` javascript
$.alert("提示信息", "标题", {theme: "modal-success"});
```
# buttons 配置

``` javascript
var options = {
	theme: 'modal-success',
	buttons: [
		{
			class: 'btn btn-default',  // 按钮样式
			close: true, // 如果为true，下面的onclick则不生效
			text: '关闭', // 按钮显示的文字
			onclick : function(){}  // 回调函数
		},
		{
		...
		}
	]
};
$.alert("提示信息", "标题", options);
```
