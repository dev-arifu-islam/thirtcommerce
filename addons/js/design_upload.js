﻿(function () {
	var filesUpload = {},
	dropArea 	= {},
	fileList 	= {},
	fileType 	= ["png", "gif", "jpg", "jpeg"],
	maxsize		= uploadSize['max'];
	minsize		= uploadSize['min'];
	function uploadFile (file) {
		var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
		ext = ext.toLowerCase();
		jQuery(document).triggerHandler("dg_upload", [file, fileType]);
		var check = fileType.indexOf(ext);
		if(check == -1)
		{
			alert(lang.upload.fileType);
			return false;
		}
		if(file.size > 1048576 * maxsize){
			alert(lang.upload.maxSize + maxsize+'MB)');
			return false;
		}
		
		if(file.size < 1048576 * minsize){
			alert(lang.upload.minSize + minsize+'MB)');
			return false;
		}
		var span = document.createElement("div"),			
			img,
			progressBarContainer = document.createElement("div"),
			progressBar = document.createElement("div"),
			reader,
			xhr,
			fileInfo;
		span.className = 'view-thumb box-art';
		
		if (jQuery('#remove-bg').is(':checked') == true) var remove = 1;
		else var remove = 0;
		var url = siteURL + 'ajax.php?type=upload&remove='+remove;
		
		/*
			If the file is an image and the web browser supports FileReader,
			present a preview in the file list
		*/				
		if (typeof window.FileReader !== "undefined" && (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif')) {
			img = document.createElement("img");
				img.className = 'img-responsive img-thumbnail';				
			span.appendChild(img);
			reader = new FileReader();
			reader.onload = (function (theImg) {
				return function (evt) {
					theImg.src = evt.target.result;
					if (/MSIE/.test(navigator.userAgent))
					{
						jQuery(progressBar).html('uploading...').css('width', '100%');
						jQuery.ajax({
							type: "POST",
							url:  siteURL + 'ajax.php?type=uploadIE&remove='+remove,
							data: { myfile: evt.target.result}
						}).done(function( content ) {							
							var media 	= eval('('+content+')');
							if (media.status == 1)
							{
								img.setAttribute('src', siteURL + media.src);
								span.item = media.item;
								span.item.url = siteURL + media.item.url;
								span.item.thumb = siteURL + media.item.thumb;
								jQuery(span).bind('click', function(){
									design.myart.create(span);
									jQuery(document).triggerHandler( "uploaded", [media.item, span]);
									
									setTimeout(function(){
										var elm = design.item.get();
										jQuery(elm).addClass('drag-item-upload');
										jQuery(elm).data('upload', 1);
										jQuery(document).triggerHandler( "added.uploaded", elm);
										design.ajax.getPrice();
									}, 1000);
								});
								jQuery(span).trigger( "click" );
								jQuery(progressBarContainer).addClass('uploaded');
								jQuery(progressBar).html('Uploaded').css('width', '100%');
							}
							else
							{
								alert(media.msg);
							}
							jQuery('#remove-bg').attr('checked', false);
							jQuery('#files-upload').val('');
						});
					}
				};
			}(img));
			reader.readAsDataURL(file);
		}
		else if(/msie 9/.test(navigator.userAgent.toLowerCase()))
		{
			jQuery(progressBar).html('uploading...').css('width', '100%');
			var iframe = jQuery('<iframe name="iframe" id="iframe" style="display: none"></iframe>');
			jQuery("body").append(iframe);
			jQuery('#files-upload-form').attr("action", url);
			jQuery('#files-upload-form').attr("target", "iframe").submit();
			jQuery("#iframe").load(function () {
				var file = JSON.parse(this.contentWindow.document.body.innerHTML);
				if (file.status == 1)
				{
					img = document.createElement("img");
					img.className = 'img-responsive img-thumbnail';				
					span.appendChild(img);
					img.setAttribute('src', siteURL + file.src);
					span.item 		= file.item;
					span.item.url 	= siteURL + file.item.url;
					span.item.thumb = siteURL + file.item.thumb;
					jQuery(span).bind('click', function(){
						design.myart.create(span);
						jQuery(document).triggerHandler( "uploaded", [file.item, span]);
						
						setTimeout(function(){
							var elm = design.item.get();
							jQuery(elm).addClass('drag-item-upload');
							jQuery(elm).data('upload', 1);
							jQuery(document).triggerHandler( "added.uploaded", elm);
							design.ajax.getPrice();
						}, 1000);
					});
					jQuery(span).trigger( "click" );
					jQuery(progressBarContainer).addClass('uploaded');
					jQuery(progressBar).html('Uploaded').css('width', '100%');					
				}
				else
				{
					alert(file.msg);
				}
				jQuery('#iframe').remove();
				jQuery('#remove-bg').attr('checked', false);
				jQuery('#files-upload').val('');
			});	
		}
		else
		{
			img = document.createElement("img");
			img.className = 'img-responsive img-thumbnail';
			img.setAttribute('src', siteURL + 'assets/images/photo.png');
			span.appendChild(img);
		}
		
		jQuery('#upload-tabs a[href="#uploaded-art"]').tab('show');
		
		progressBarContainer.className = "progress progress-bar-container";
		progressBar.className = "progress-bar";
		progressBarContainer.appendChild(progressBar);
		span.appendChild(progressBarContainer);
		if(/msie 9/.test(navigator.userAgent.toLowerCase()) == false)
		{
			// Uploading - for Firefox, Google Chrome and Safari
			xhr = new XMLHttpRequest();
			
			// Update progress bar
			xhr.upload.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					var completed = (evt.loaded / evt.total) * 100;
					progressBar.style.width = completed + '%';
					progressBar.innerHTML = completed.toFixed(0) + '%';
				}
				else {
					// No data to calculate on
				}
			}, false);
				
			
			// File uploaded
			xhr.addEventListener("load", function () {
				progressBarContainer.className += " uploaded";
				progressBar.innerHTML = "Uploaded!";			
			}, false);
		}

		if (/MSIE/.test(navigator.userAgent) == false)
		{
			xhr.open("post", url, true);
			
			xhr.onload = function() {
				if (xhr.status === 200) {
					var media 					= eval('('+this.responseText+')');
					if (media.status == 1)
					{
						img.setAttribute('src', siteURL + media.src);
						span.item = media.item;
						span.item.url = siteURL + media.item.url;
						span.item.thumb = siteURL + media.item.thumb;
						jQuery(span).bind('click', function(){
							design.myart.create(span);
							jQuery(document).triggerHandler( "uploaded", [media.item, span]);
							
							setTimeout(function(){
								var elm = design.item.get();
								jQuery(elm).addClass('drag-item-upload');
								jQuery(elm).data('upload', 1);
								jQuery(document).triggerHandler( "added.uploaded", elm);
								design.ajax.getPrice();
							}, 1000);
						});
						jQuery(span).trigger( "click" );
					}
					else
					{
						alert(media.msg)
					}
				}
				jQuery('#remove-bg').attr('checked', false);
				jQuery('#files-upload').val('');
			};
			
			var formData = new FormData();  
			formData.append('myfile', file); 
			xhr.send(formData);
		}
		fileList.appendChild(span);
		if(typeof design.drop != 'undefined')
		{
			design.drop.upload();
		}
		gridArt('#dag-files-images');
	}
	
	function traverseFiles (files) {
		if (typeof files !== "undefined") {
			for (var i=0, l=files.length; i<l; i++) {
				uploadFile(files[i]);
			}
		}
		else {
			fileList.innerHTML = "No support for the File API in this web browser";
		}	
	}
	
	jQuery(document).ready(function($) {
		filesUpload = document.getElementById("files-upload");
		dropArea 	= document.getElementById("drop-area");
		fileList 	= document.getElementById("dag-files-images");

		document.getElementById('action-upload').addEventListener("click", function () {
			var check = design.upload.computer();
			if (check == true)
			{
				var IE9 = /msie 9/.test(navigator.userAgent.toLowerCase());
				if(IE9 == true)
				{
					var iframe = jQuery('<iframe name="postiframe" id="postiframe" style="display: none"></iframe>');
					jQuery("body").append(iframe);
					var frm = jQuery('#files-upload-form');
					frm.attr("action", siteURL + "ajax.php?type=iframeupload");
					frm.attr("method", "post");
					frm.attr("enctype", "multipart/form-data");
					frm.attr("target", "postiframe").submit();
					jQuery("#postiframe").load(function () {
						var myFile = JSON.parse(this.contentWindow.document.body.innerHTML);
						uploadFile(myFile.myfile);
						jQuery('#postiframe').remove();
						return false;
					})
				}
				else
				{
					traverseFiles(filesUpload.files);
				}
			}
		}, false);

		dropArea.addEventListener("dragleave", function (evt) {
			var target = evt.target;
			
			if (target && target === dropArea) {
				this.className = "";
			}
			evt.preventDefault();
			evt.stopPropagation();
		}, false);
		
		dropArea.addEventListener("dragenter", function (evt) {
			this.className = "over";
			evt.preventDefault();
			evt.stopPropagation();
		}, false);
		
		dropArea.addEventListener("dragover", function (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}, false);
		
		dropArea.addEventListener("drop", function (evt) {
			traverseFiles(evt.dataTransfer.files);
			this.className = "";
			evt.preventDefault();
			evt.stopPropagation();
		}, false);	
	});
})();

jQuery(document).ready(function($) {
	if(typeof files_uploaded != 'undefined')
	{
		var images_upload = JSON.parse(files_uploaded);
		jQuery.each(images_upload, function(index, file) {
			var div = document.createElement('div');
			div.className = 'view-thumb box-art';
			var a = document.createElement('a');
			a.className = '';
			a.setAttribute('href', 'javascript:void(0)');
			a.innerHTML = '<img class="img-thumbnail" draggable="true" src="'+file.thumb+'" alt="">';
			a.item 			= file;
			div.item 		= file;
			div.item.thumb 	= siteURL + file.thumb;
			div.item.width 	= file.size.width;
			div.item.height = file.size.height;
			div.item.large 	= siteURL + file.url;
			div.appendChild(a);
			jQuery('#dag-files-images').append(div);
		});
		gridArt('#dag-files-images');
		jQuery('#dag-files-images .box-art').on('click', function(e) {
			var span = document.createElement('span');
			span.item = this.item;
			design.myart.create(span);
			setTimeout(function(){
				var elm = design.item.get();
				jQuery(elm).addClass('drag-item-upload');
				jQuery(elm).data('upload', 1);
				jQuery(document).triggerHandler( "added.uploaded", elm);
				design.ajax.getPrice();
			}, 800);
		});
	}
});