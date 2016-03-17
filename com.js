/*
*@ 分页插件
*@ by chenjef
*@ qq: 1737752975
*@
*/

;(function($,window,document,undefined){
	function PageCommond(ele,options,callback){
		this.$ele = ele;
		this.pageNum;
		this.pageAllNum;
		this.defaults = {
			"$ele":"",		//要添加页码的元素
			"$url":"",       //url地址
			"$pageNumShow":6,  //每页显示的数目
			"$pageKey":"", //总共页数的key
			"$company_id":""
		};
		this.settings = $.extend({},this.defaults,options);
		this.callback = callback;
	};
	PageCommond.prototype = {
		init: function(){
			var _this = this,
				pagecontent = "",
				detailContent = "";
			pagecontent += '<div class="pagebutton pagetop"><<</div>';
			pagecontent += '<div class="pagebutton pageleft"><</div>';
			pagecontent += '<div class="pagedetail"></div>'; //放页码
			pagecontent += '<div class="pagebutton pageright">></div>';
			pagecontent += '<div class="pagebutton pagebottom">>></div>';
			pagecontent += '<div class="pagecount">共<span></span>页</div>'; //显示多少页
			pagecontent += '<div class="pageinput"><input type="text" /></div>'; 
			pagecontent += '<div class="pagebutton">跳转</div>';
			$(_this.settings.$ele).empty(pagecontent);
			$(_this.settings.$ele).append(pagecontent);
			$.ajax({
				type:"GET",
				url: _this.settings.$url,
				dataType: "json",
				success: function(data){
					_this.settings.$pageKey = data[_this.settings.$pageKey];
					_this.pageAllNum = _this.settings.$pageKey;
					_this.pageNum = 1;
					for(var i = 0; i<_this.settings.$pageKey; i++){
						detailContent += '<span>'+(i+1)+'</span>';
					};
					$(".pagedetail").append(detailContent);
					$(".pagedetail span").eq(0).addClass("pagebuttoncolor");
					$(".pagecount span").html(data);
					_this.callback();
				},
				error:function(err){
					alert(err.message);
				}
			});
			//点击下一页
			$(".pageright").click(function(){
				_this.handleChange(1);
			});
			//点击上一页
			$(".pageleft").click(function(){
				_this.handleChange(-1);
			});
			//首页
			$(".pagetop").click(function(){
				_this.handleLimit(-1);
			});
			//尾页
			$(".pagebottom").click(function(){
				_this.handleLimit(1)
			});
	        //点击具体页数
	        $(".pagedetail").on("click","span",function(){
	            $(".pagedetail span").removeClass("pagebuttoncolor");
	            $(this).addClass("pagebuttoncolor");
	            _this.pageNum = $(this).html()-0;
	        });
		},
		handleChange : function(arg){
	        var _this = this, centerNum;
	        if(this.pageAllNum>6){
	            centerNum = $(".pagedetail span:last-child").html() -1;
	        }
	        $(".pagedetail span").removeClass("pagebuttoncolor");
	        //-----------------------
	        if (arg == 1){
	            if(_this.pageNum<_this.pageAllNum){
	                _this.pageNum += 1;
	            }
	            if ( centerNum <= _this.pageNum)
	            {
	                if($(".pagedetail span:last-child").html()-0 == _this.pageAllNum){
	                    
	                }else{
	                    $(".pagedetail span").each(function(index,ele){
	                        $(ele).html($(ele).html()-0+1);
	                    });
	                }
	            };
	            
	        };
	        //------------------
	        if(arg == -1){
	            if(_this.pageNum > 1){
	                _this.pageNum -= 1;
	            }
	            if ($(".pagedetail span:first-child").html()-0 == 1)
	            {
	                
	            }else{
	                $(".pagedetail span").each(function(index,ele){
	                    $(ele).html($(ele).html()-1);
	                });
	            };
	        }
	        //-------------渲染页数
	        $(".pagedetail span").each(function(p_index, p_ele){
	            if ($(p_ele).html() == _this.pageNum)
	            {
	                $(p_ele).addClass("pagebuttoncolor");
	            }
	        });
	    },
	    handleLimit: function(arg){
	        var _this = this,
	            pageItem = "";
	        $(".pagedetail").empty();
	        if(arg == -1){
	            _this.pageNum = 1;
	            for (var i=0;i<_this.pageAllNum;i++){
	                if(i<6){
	                    pageItem += '<span>'+(i+1)+'</span> ';
	                }
	            };
	            $(".pagedetail").append(pageItem);
	            $(".pagedetail span:first-child").addClass("pagebuttoncolor");
	        };
	        if(arg == 1){
	            var jj = 0;
	            _this.pageNum = _this.pageAllNum;
	            for (var i=_this.pageAllNum;i>0;i--){
	                jj++;
	                if(jj<7){
	                    pageItem += '<span>'+i+'</span> ';
	                }
	            };
	            var newPageItem = pageItem.split(" ").reverse();
	            $(".pagedetail").append(newPageItem);
	            $(".pagedetail span:last-child").addClass("pagebuttoncolor");
	        }
		}
	}
	$.fn.PageCommond = function(options,callback){
		var pagecommond = new PageCommond(this,options,callback);
		return pagecommond.init();
	}
	$.extend({
		Page: function(ele,url,pk,callback){
			$().PageCommond({
				"$ele": ele,
				"$url": url,
				"$pageKey": pk
			},callback);
		}
	})
})(jQuery,window,document);