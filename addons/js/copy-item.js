/** definde avariable for check allow copy item */
var allowCopyFlg = true;

/** add button copy on toolbar */
jQuery(document).ready(function() {
	var toolbarVer = jQuery('#dg-help-functions .btn-group-vertical');
	if(toolbarVer.length > 0)
		toolbarVer.append('<span class="btn btn-default copyToolBtn" data-placement="left" data-toggle="tooltip" data-original-title="'+lang.text.copy+'" onclick="design.tools.copy(this)"><i class="fa fa-copy"></i></span>');
	else
	{
		jQuery('.btn-group-tools').append('<button class="btn btn-default dg-tooltip copyToolBtn" data-placement="left" title="'+lang.text.copy+'" onclick="design.tools.copy(this)"><i class="fa fa-copy"></i></button>');
	}
});

/** add process disable button copy when item is team */
jQuery(document).on("select.item.design", function(event, ele){
	var copyBtn = jQuery('#dg-help-functions .btn-group-vertical').find('.copyToolBtn');
	if(jQuery(ele).data('type') == 'team') 
	{
		copyBtn.css({
			'cursor' : 'not-allowed',
			'opacity': '0.5'
		});
	}
	else 
	{
		copyBtn.css({
			'cursor': 'pointer',
			'opacity': '1'
		});
	}
});

/** function copy item */
design.tools.copy = function(e) {
	var item = design.item.get();
	/* case don't have item selected */
	if(item.length == 0) 
	{
		return;
	}
	var item_c = item[0].item;
	var type   = item.data('type');
	var iStyle,	bStyle,	uStyle,	alignL,	alignC,	alignR,	outlineC, outlineW;
	jQuery(document).triggerHandler( "before.copy.design", type);
	/* case item is limited */
	if(!allowCopyFlg) 
	{
		return;
	}
	//item_c        = item[0].item;
	item_c.type   = type;
	item_c.svg    = item.find('svg').clone();
	item_c.width  = item.css('width').replace('px', '');
	item_c.height = item.css('height').replace('px', '');
	if(item.find('div.item-remove-on').length > 0) 
	{
		item_c.remove = true;
	}
	else 
	{
		item_c.remove = false;
	}
	if(item.find('div.item-rotate-on').length > 0) 
	{
		item_c.rotate = true;
	}
	else 
	{
		item_c.rotate = false;
	}
	if(type == 'text') 
	{
		var txt = item.find('tspan').text();
		if(txt  == undefined) 
		{
			txt = item.find('textPath').text();
		}
		item_c.colors     = [];
		item_c.colors.push(item[0].item.color);
		item_c.text       = txt;
		item_c.color      = item[0].item.color;
		item_c.fontFamily = item[0].item.fontFamily;
		iStyle            = jQuery('#text-style-i').hasClass('active');
		bStyle            = jQuery('#text-style-b').hasClass('active');
		uStyle            = jQuery('#text-style-u').hasClass('active');
		alignL            = jQuery('#text-align-left').hasClass('active');
		alignC            = jQuery('#text-align-center').hasClass('active');
		alignR            = jQuery('#text-align-right').hasClass('active');
		outlineC          = item[0].item.outlineC;
		outlineW          = item[0].item.outlineW;
	}
	if(type == 'clipart') {
		var lyr             = jQuery('#layers .layer.active'); 
		var title           = lyr.find('span').text();
		var thumb           = lyr.find('img')[0].src;
		item_c.title        = title;
		item_c.thumb        = thumb;
		item_c.file         = item.data('file');
		item_c.clipart_id   = item[0].item.clipart_id;
		item_c.file_name    = item[0].item.file_name;
		item_c.change_color = item[0].item.change_color;
		item_c.confirmColor = item[0].item.confirmColor;
		item_c.edit         = item[0].item.edit;
		item_c.upload       = item[0].item.upload;
		var colors          = [];
		jQuery('#list-clipart-colors a').each(function() {
			colors.push(jQuery(this).data('color'));
		});
		item_c.colors      = colors;
	}
	if(type == 'team') 
	{
		return;
	}
	var html = item_c.svg.html();
	if(html.indexOf('id="') != -1)
	{
		var index = html.indexOf('id="');
		var start_id = parseInt(index) + 4;
		var end_id = start_id + 40;
		var str = html.substring(start_id, end_id);
		var index = str.indexOf('"');
		if(index != -1)
		{
			var old_id = str.substring(0, index);
			var ids = html.split(old_id);
			if(ids.length > 0)
			{
				var new_id 	= 'copy-'+parseInt((Math.random() * 100000000));
				var new_html = html;
				for(i=0; i<ids.length; i++)
				{
					new_html = new_html.replace(old_id, new_id);
				}
				item_c.svg.innerHTML = new_html;
			}
		}
	}
	design.item.create(item_c);
	var itemN = design.item.get();
	if(item.find('div.item-rotate-on').length > 0) 
	{
		var matrix    = item.css('transform');
		var deg       = 0;
		var angle     = 0;
		if(matrix !== 'none') 
		{
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a      = values[0];
			var b      = values[1];
			deg        = Math.round(Math.atan2(b, a) * (180/Math.PI));
			angle      = Math.atan2(b, a);
		}
		jQuery('#' + item.data('type') + '-rotate-value').val(deg);
		jQuery(item_c).data('rotate', deg);
		itemN.css({
			'transform': 'rotate(' + angle + 'rad)'
		});
		jQuery('.mask-item.ui-draggable.ui-resizable').css({
			'transform': 'rotate(' + angle + 'rad)'
		});
	}
	if(type == 'text') 
	{
		var obj = itemN[0];
		if(iStyle) 
		{
			jQuery('#text-style-i').addClass('active');
			obj.item.Istyle = 'italic';
		};
		if(bStyle) 
		{
			jQuery('#text-style-b').addClass('active');
			obj.item.weight = 'bold';
		};
		if(uStyle) 
		{
			jQuery('#text-style-u').addClass('active');
			obj.item.decoration = 'underline';
		};
		if(alignL) 
		{
			jQuery('#text-align-left').addClass('active');
			jQuery('#text-align-center').removeClass('active');
			jQuery('#text-align-right').removeClass('active');
			obj.item.align = 'left';
		}
		else if(alignC) 
		{
			jQuery('#text-align-center').addClass('active');
			jQuery('#text-align-left').removeClass('active');
			jQuery('#text-align-right').removeClass('active');
			obj.item.align = 'center';
		}
		else if(alignR) 
		{
			jQuery('#text-align-right').addClass('active');
			jQuery('#text-align-center').removeClass('active');
			jQuery('#text-align-left').removeClass('active');
			obj.item.align = 'right';
		}
		obj.item.outlineC = outlineC;
		obj.item.outlineW = outlineW;
		if(outlineC != 'none') 
		{
			jQuery('.option-outline .dropdown-color').addClass('active').removeClass('bg-none');
		}
		if(outlineW != 0) 
		{
			jQuery('.option-outline .outline-value').html(outlineW);
		}
	}
	jQuery.each(item.data(), function (name, value) {
		itemN.data(name, value);
	});
	itemN.data('id', parseInt(itemN.attr('id').replace('item-', '')));
	if(item_c.type == 'clipart')
	{
		var svg = itemN.find('svg');
		design.item.setup(itemN[0].item);
	}
};