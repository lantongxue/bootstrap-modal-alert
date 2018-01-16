/**
基于 jquery bootstrap AdminLTE 所编写的快速弹出 Modal 插件
默认使用了 AdminLTE 里面的 Modal 主题
所以，如果要使用本插件里面的 theme 选项，需要配合 AdminLTE 
当然，你也可以自定义主题，你只需要重写下面的任意一个样式
主题：modal-default modal-primary modal-info modal-warning modal-success modal-danger
*/
var MyModal = function(){
	this.default = {
		theme: 'modal-default',// 主题：modal-default modal-primary modal-info modal-warning modal-success modal-danger
		buttons: [
			{
				class: 'btn btn-default',
				close: true,
				text: '关闭',
				onclick : function(){}
			},
		]
	};
};

MyModal.prototype = {
	alert: function(message, title, options){
		var html = '';
		html += '<div id="myModal" class="modal '+options.theme+' fade" tabindex="-1" role="dialog">';
		  html += '<div class="modal-dialog" role="document">';
			html += '<div class="modal-content">';
			  html += '<div class="modal-header">';
				html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				html += '<h4 class="modal-title">'+title+'</h4>';
			  html += '</div>';
			  html += '<div class="modal-body">';
				html += message;
			  html += '</div>';
			  html += '<div class="modal-footer">';
				$.each(options.buttons, function(index, btn){
					if(options.theme != 'modal-default'){
						btn.class = 'btn btn-outline';
					}
					if(btn.close){
						html += '<button type="button" class="'+btn.class+'" data-dismiss="modal">'+btn.text+'</button>';
					}else{
						html += '<button type="button" id="_modal_foot_btn_id_'+index+'" class="'+btn.class+'">'+btn.text+'</button>';
						$(document).on('click', '#_modal_foot_btn_id_'+index, function(){
							///{ 执行callback
							btn.onclick();
							$('#_modal_container_tmp > div[id=myModal]').modal('hide');
							///} 执行完callback后关闭模态框
						});
					}
				});
			  html += '</div>';
			html += '</div>';
		  html += '</div>';
		html += '</div>';
		///{ 创建一个容器，用来装载模态框
		var container = document.createElement('div');
		container.setAttribute('id', '_modal_container_tmp');
		container.innerHTML = html;
		$('body').append(container);
		///}
		
		///{ 禁用按Esc和点击模态框后面的遮罩的时候消失模态框
		$('#_modal_container_tmp > div[id=myModal]').modal({
			keyboard: false,
			backdrop: 'static',
		});
		///}
		
		$('#_modal_container_tmp > div[id=myModal]').modal('show');
		
		///{ 当模态框消失之后，将动态生成的元素移除
		$('#_modal_container_tmp > div[id=myModal]').on('hidden.bs.modal', function(){
			$('body > div[id=_modal_container_tmp]').remove();
		});
		///}
	}
};

$.extend({
	alert: function(message, title = '提示', options = null){
		var myModal = new MyModal();
		if(options == null){
			options = myModal.default;
		}
		if(typeof(options.buttons) == 'undefined'){
			options.buttons = myModal.default.buttons;
		}
		myModal.alert(message, title, options);
	}
});
