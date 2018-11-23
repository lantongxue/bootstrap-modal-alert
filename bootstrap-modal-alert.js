/**
 基于 jQuery Bootstrap Font Awesome 所编写的快速弹出 Modal 插件
 默认使用了 AdminLTE 里面的 Modal 主题
 所以，如果要使用本插件里面的 theme 选项，需要配合 AdminLTE
 当然，你也可以自定义主题，你只需要重写下面的任意一个样式
 主题：modal-default modal-primary modal-info modal-warning modal-success modal-danger
 @author lantongxue
 @github https://github.com/lantongxue/bootstrap-modal-alert
 */
(function () {
    "use strict";
    var MyModal = function(_options){

        this.options = {
            // 主题：modal-default modal-primary modal-info modal-warning modal-success modal-danger
            theme: 'modal-default',
            closeBtn: {
                style: 'btn btn-default',
                text: '关闭'
            },
            okBtn: {
                style: 'btn btn-default',
                close: true,
                text: '确定'
            }
        };
        if(typeof _options == 'object'){
            this.options = $.extend(true, this.options, _options);
        }
    };

    MyModal.prototype = {
        loading: function(message){
            var html = '';
            html += '<div id="myLoadingModal" class="modal '+this.options.theme+' fade" tabindex="-1" role="dialog">';
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
                backdrop: 'static'
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
        close: function(modelId){
            $(modelId).modal('hide');
        },
        alert: function(message, title, callback){
            var id = 'myModal_' + Math.floor(Math.random()*100);
            var cid = '_modal_container_tmp_s' + Math.floor(Math.random()*100);
            var html = '';
            html += '<div id="'+id+'" class="modal '+this.options.theme+' fade" tabindex="-1" role="dialog">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '<h4 class="modal-title">'+title+'</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += message;
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="'+this.options.closeBtn.style+'" data-dismiss="modal">'+this.options.closeBtn.text+'</button>';
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
                backdrop: 'static'
            });
            ///}

            $('#'+cid+' > div[id='+id+']').modal('show');

            ///{ 当模态框消失之后，将动态生成的元素移除
            $('#'+cid+' > div[id='+id+']').on('hidden.bs.modal', function(){
                $('body > div[id='+cid+']').remove();
                if(typeof callback == 'function'){
                    callback();
                }
            });
            ///}
            return '#'+cid+' > div[id='+id+']';
        },
        confirm: function(message, title, callback){
            var id = 'myConfirmModal_' + Math.floor(Math.random()*100);
            var cid = '_myConfirmModal__container_tmp_s' + Math.floor(Math.random()*100);
            var okBtn_id = '_myConfirmModal__okBtn_id' + Math.floor(Math.random()*100);
            var html = '';
            html += '<div id="'+id+'" class="modal '+this.options.theme+' fade" tabindex="-1" role="dialog">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '<h4 class="modal-title">'+title+'</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += message;
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="'+this.options.closeBtn.style+'" data-dismiss="modal">'+this.options.closeBtn.text+'</button>';
            if(this.options.okBtn.close){
                html += '<button type="button" class="'+this.options.okBtn.style+'" data-dismiss="modal" id="'+okBtn_id+'">'+this.options.okBtn.text+'</button>';
            }else{
                html += '<button type="button" class="'+this.options.okBtn.style+'" id="'+okBtn_id+'">'+this.options.okBtn.text+'</button>';
            }
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
                backdrop: 'static'
            });
            ///}
            if(typeof callback == 'function'){
                $(document).on('click', '#'+okBtn_id, callback);
            }

            $('#'+cid+' > div[id='+id+']').modal('show');

            ///{ 当模态框消失之后，将动态生成的元素移除
            $('#'+cid+' > div[id='+id+']').on('hidden.bs.modal', function(){
                $('body > div[id='+cid+']').remove();
            });
            ///}
            return '#'+cid+' > div[id='+id+']';
        }
    };
    $.extend({
        bm:{
            loading: function(message){
                var myModal = new MyModal();
                return myModal.loading(message);
            },
            alert: function(message, title, callback, options){
                if(typeof title == 'undefined' || title === ''){
                    title = '提示';
                }
                if(typeof title == 'object'){
                    options = title;
                    title = '提示';
                }
                if(typeof callback == 'object'){
                    options = callback;
                }
                if(typeof title == 'function'){
                    callback = title;
                    title = '提示';
                }
                var myModal = new MyModal(options);
                return myModal.alert(message, title, callback);
            },
            confirm: function(message, title, callback, options){
                if(typeof title == 'undefined' || title === ''){
                    title = '提示';
                }
                if(typeof title == 'object'){
                    options = title;
                    title = '提示';
                }
                if(typeof callback == 'object'){
                    options = callback;
                }
                if(typeof title == 'function'){
                    callback = title;
                    title = '提示';
                }
                var myModal = new MyModal(options);
                return myModal.confirm(message, title, callback, options);
            },
            close: function(modelId){
                var myModal = new MyModal();
                myModal.close(modelId);
            }
        }
    });
})();

