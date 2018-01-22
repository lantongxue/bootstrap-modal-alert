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
		closeBtn: {
			class: 'btn btn-default',
			text: '关闭',
		},
		okBtn: {
			class: 'btn btn-primary',
			close: true,
			text: '确定',
		},
	};
};

MyModal.prototype = {	
	loading: function(message, options){
		var html = '';
		html += '<div id="myLoadingModal" class="modal '+options.theme+' fade" tabindex="-1" role="dialog">';
		  html += '<div class="modal-dialog" role="document">';
			html += '<div class="modal-content">';
			  html += '<div class="modal-body">';
				html += '<h3 style="margin-top:auto;margin-bottom:auto;"><i class="fa fa-spinner fa-pulse"></i> '+message+'</h3>';
			  html += '</div>';			  
		  html += '</div>';
		html += '</div>';
		///{ 创建一个容器，用来装载模态框
		var container = document.createElement('div');
		container.setAttribute('id', '_modal_container__loading_tmp');
		container.innerHTML = html;
		$('body').append(container);
		///}
		
		///{ 禁用按Esc和点击模态框后面的遮罩的时候消失模态框
		$('#_modal_container__loading_tmp > div[id=myLoadingModal]').modal({
			keyboard: false,
			backdrop: 'static',
		});
		///}
		$('#_modal_container__loading_tmp > div[id=myLoadingModal]').modal('show');
		
		///{ 当模态框消失之后，将动态生成的元素移除
		$('#_modal_container__loading_tmp > div[id=myLoadingModal]').on('hidden.bs.modal', function(){
			$('body > div[id=_modal_container__loading_tmp]').remove();
		});
		///}
		return '#_modal_container__loading_tmp > div[id=myLoadingModal]';
	},
	close: function(e){
		$(e).modal('hide');		
	},
	alert: function(message, title, callback, options){
		var id = 'myModal_' + Math.floor(Math.random()*10);
		var cid = '_modal_container_tmp_s' + Math.floor(Math.random()*10);
		var html = '';
		html += '<div id="'+id+'" class="modal '+options.theme+' fade" tabindex="-1" role="dialog">';
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
				html += '<button type="button" class="'+options.closeBtn.class+'" data-dismiss="modal">'+options.closeBtn.text+'</button>';				
			  html += '</div>';
			html += '</div>';
		  html += '</div>';
		html += '</div>';
		///{ 创建一个容器，用来装载模态框
		var container = document.createElement('div');		
		container.setAttribute('id', cid);
		container.innerHTML = html;
		$('body').append(container);
		///}
		
		///{ 禁用按Esc和点击模态框后面的遮罩的时候消失模态框
		$('#'+cid+' > div[id='+id+']').modal({
			keyboard: false,
			backdrop: 'static',
		});
		///}
		
		$('#'+cid+' > div[id='+id+']').modal('show');
		
		///{ 当模态框消失之后，将动态生成的元素移除
		$('#'+cid+' > div[id='+id+']').on('hidden.bs.modal', function(){
			$('body > div[id='+cid+']').remove();
			if(callback != null){
				callback();
			}
		});
		///}
	},
	confirm: function(message, title, callback, options){
		var id = 'myConfirmModal_' + Math.floor(Math.random()*10);
		var cid = '_myConfirmModal__container_tmp_s' + Math.floor(Math.random()*10);
		var okBtn_id = '_myConfirmModal__okBtn_id' + Math.floor(Math.random()*10);
		var html = '';
		html += '<div id="'+id+'" class="modal '+options.theme+' fade" tabindex="-1" role="dialog">';
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
				html += '<button type="button" class="'+options.closeBtn.class+'" data-dismiss="modal">'+options.closeBtn.text+'</button>';
				html += '<button type="button" class="'+options.okBtn.class+'" data-dismiss="modal" id="'+okBtn_id+'">'+options.okBtn.text+'</button>';
			  html += '</div>';
			html += '</div>';
		  html += '</div>';
		html += '</div>';
		///{ 创建一个容器，用来装载模态框
		var container = document.createElement('div');		
		container.setAttribute('id', cid);
		container.innerHTML = html;
		$('body').append(container);
		///}
		
		///{ 禁用按Esc和点击模态框后面的遮罩的时候消失模态框
		$('#'+cid+' > div[id='+id+']').modal({
			keyboard: false,
			backdrop: 'static',
		});
		///}
		
		$(document).on('click', '#'+okBtn_id, callback);
		
		$('#'+cid+' > div[id='+id+']').modal('show');
		
		///{ 当模态框消失之后，将动态生成的元素移除
		$('#'+cid+' > div[id='+id+']').on('hidden.bs.modal', function(){
			$('body > div[id='+cid+']').remove();
		});
		///}
		
		
	}
};

$.extend({
	loading: function(message, options = null){
		var myModal = new MyModal();
		if(options == null){
			options = myModal.default;
		}
		return myModal.loading(message, options);
	},
	alert: function(message, title = '提示', callback = null, options = null){
		var myModal = new MyModal();
		
		if(options == null){
			options = myModal.default;
		}
		if(typeof(options.theme) == 'undefined'){
			options.theme = myModal.default.theme;
		}
		if(typeof(options.closeBtn) == 'undefined'){
			options.closeBtn = myModal.default.closeBtn;
		}
		myModal.alert(message, title, callback, options);
	},
	confirm: function(message, title = '提示', callback = null, options = null){
		var myModal = new MyModal();
		
		if(options == null){
			options = myModal.default;
		}
		if(typeof(options.theme) == 'undefined'){
			options.theme = myModal.default.theme;
		}
		if(typeof(options.closeBtn) == 'undefined'){
			options.closeBtn = myModal.default.closeBtn;
		}
		if(typeof(options.okBtn) == 'undefined'){
			options.okBtn = myModal.default.okBtn;
		}
		myModal.confirm(message, title, callback, options);
	},
	close: function(e){
		var myModal = new MyModal();
		myModal.close(e);
	}
});
