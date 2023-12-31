<?php
/**
 * @author tshirtecommerce - www.tshirtecommerce.com
 * @date: 2016-03-22
 *
 * API Theme
 *
 * @copyright  Copyright (C) 2015 tshirtecommerce.com. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 *
 */
$theme_name 	= 'default_pro';
if ( isset($data['settings']['theme']) && isset($data['settings']['themes']) && isset($data['settings']['theme'][$data['settings']['themes']]) )
{
	$settings	= $data['settings']['theme'][$theme_name];
}
else
{
	$settings	= array();
}
?>
<style>
.fancybox-inner{max-height: 540px;}
</style>
<link rel="stylesheet" type="text/css" href="<?php echo site_url('assets/plugins/pickColor/spectrum.css'); ?>">
<script type='text/javascript' src='<?php echo site_url('assets/plugins/pickColor/spectrum.js'); ?>'></script>
<script type="text/javascript" src="<?php echo site_url('assets/plugins/jquery-fancybox/jquery.fancybox.js'); ?>"></script>
<link rel="stylesheet" href="<?php echo site_url('assets/plugins/jquery-fancybox/jquery.fancybox.css'); ?>">

<div class="tabbable">
	<ul id="myTab" class="nav nav-tabs tab-bricky">
		<li class="active">
			<a href="#panel_tab1" data-toggle="tab"><i class="green fa fa-bars"></i> General</a>
		</li>	
		<li>
			<a href="#panel_tab2" data-toggle="tab"><i class="green fa fa-code"></i> Custom CSS & JS</a>
		</li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active custom_theme_default" id="panel_tab1">
			<div class="form-group">
				<button type="button" class="btn btn-default" onclick="theme_default()">Reset Default</button>
			</div>

			<!-- General -->
			<div class="panel panel-default">
				<div class="panel-heading">
					<i class="clip-settings"></i> Setting General
					<div class="panel-tools">
						<a href="javascript:void(0);" class="btn btn-xs btn-link panel-collapse collapses"></a>
					</div>
				</div>
				<div class="panel-body">
					
					<div class="row form-horizontal">
					
						<div class="form-group">
							<label class="col-sm-4 control-label">Background Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'general_background', 'FFFFFF'); ?>" name="setting[theme][<?php echo $theme_name; ?>][general_background]">
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Background Image</label>
							<div class="col-sm-8 background-image">
								<a href="javascript:void(0);" class="btn btn-default btn-sm" onclick="jQuery.fancybox( {height:'400px', href : '<?php echo site_url('index.php/media/modals/backgroundImg/1'); ?>', type: 'iframe'} );">Choose Image</a>
								
								<?php $theme_background = setValue($settings, 'general_image', ''); ?>
								<input type="hidden" class="theme-image" value="<?php echo $theme_background; ?>" name="setting[theme][<?php echo $theme_name; ?>][general_image]">
								
								<?php if ($theme_background != '') { ?>
									<img src="<?php echo $theme_background; ?>" class="img-thumbnail" alt="" width="50" />
								<?php } ?>
								<a href="javascript:void(0);" onclick="themRemoveOption(this)"><i class="fa fa-trash-o"></i></a>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Text Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'general_text_color', '333333'); ?>" name="setting[theme][<?php echo $theme_name; ?>][general_text_color]">
							</div>
						</div>				
					</div>
					
				</div>
			</div>

			<!-- Left Menu -->
			<div class="panel panel-default">
				<div class="panel-heading">
					<i class="clip-settings"></i> Left Menu
					<div class="panel-tools">
						<a href="javascript:void(0);" class="btn btn-xs btn-link panel-collapse collapses"></a>
					</div>
				</div>		
				<div class="panel-body">
					
					<div class="row form-horizontal">
					
						<div class="form-group">
							<label class="col-sm-4 control-label">Background Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_background', 'FFFFFF'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_background]">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label">Border Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_border', 'CCCCCC'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_border]">
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Text Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_text', '666666'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_text]">
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Text Color Hover</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_texthover', '333333'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_texthover]">
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Icon Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_icon', '666666'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_icon]">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label">Icon Color Hover</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'leftmenu_iconhover', '333333'); ?>" name="setting[theme][<?php echo $theme_name; ?>][leftmenu_iconhover]">
							</div>
						</div>			
					</div>
					
				</div>
			</div>
			
			<!-- Button -->
			<div class="panel panel-default">
				<div class="panel-heading">
					<i class="clip-settings"></i> All Button
					<div class="panel-tools">
						<a href="javascript:void(0);" class="btn btn-xs btn-link panel-collapse collapses"></a>
					</div>
				</div>		
				<div class="panel-body">
					
					<div class="row form-horizontal">
					
						<div class="form-group">
							<label class="col-sm-4 control-label">Background Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'button_background', 'FFFFFF'); ?>" name="setting[theme][<?php echo $theme_name; ?>][button_background]">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label">Border Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'button_border', 'CCCCCC'); ?>" name="setting[theme][<?php echo $theme_name; ?>][button_border]">
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Text Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'button_text', '666666'); ?>" name="setting[theme][<?php echo $theme_name; ?>][button_text]">
							</div>
						</div>				
						
						<div class="form-group">
							<label class="col-sm-4 control-label">Icon Color</label>
							<div class="col-sm-8">
								<input type="text" class="colors" value="<?php echo setValue($settings, 'button_icon', '666666'); ?>" name="setting[theme][<?php echo $theme_name; ?>][button_icon]">
							</div>
						</div>		
					</div>
					
				</div>
			</div>
		</div>

		<div class="tab-pane" id="panel_tab2">
			<div class="form-group">
				<label class="control-label">Custom CSS</label>
				<textarea class="form-control" name="setting[theme][<?php echo $theme_name; ?>][custom_css]" cols="8" rows="8"><?php echo setValue($settings, 'custom_css', ''); ?></textarea>
				<p class="help-block">Add custom CSS here. This code will display in tag head of page design tool</p>
			</div>
			<div class="form-group">
				<label class="control-label">Custom JS</label>
				<textarea class="form-control" name="setting[theme][<?php echo $theme_name; ?>][custom_js]" cols="8" rows="8"><?php echo setValue($settings, 'custom_js', ''); ?></textarea>
				<p class="help-block">Add custom JS here. This code will display in tag head of page design tool</p>
			</div>
		</div>
	</div>
</div>

<script type='text/javascript'>	
function backgroundImg(images)
{
	if(images.length > 0)
	{
		var e = jQuery('.theme-image');
		e.val(images[0]);
		if(e.parent().children('img').length > 0)
			e.parent().children('img').attr('src', images[0]);
		else
			e.parent().append('<img src="'+images[0]+'" class="img-thumbnail" alt="" width="50" />');
		jQuery.fancybox.close();
	}
}
function themRemoveOption(e)
{
	var elm = jQuery(e).parent();
	elm.find('img').remove();
	elm.find('input').val('');
}
jQuery(document).ready(function(){
	jQuery(".colors").spectrum({
		showPalette: true,
		showInput: true,
		preferredFormat: "hex",
		palette: [
			['FFFFFF', 'FCFCFC', 'CCCCCC', '333333'],
			['000000', '428BCA', 'F65E13', '2997AB'],
			['5CB85C', 'D9534F', 'F0AD4E', '5BC0DE'],
			['C3512F', '7C6853', 'F0591A', '2D5C88'],
			['4ECAC2', '435960', '734854', 'A81010'],
		]
	});
});
function theme_default(){
	var check = confirm('You sure want reset default of setting theme?');
	if(check == true)
	{
		jQuery('.custom_theme_default input').remove();
		jQuery('.custom_theme_default').parents('form').submit();
	}
}
</script>