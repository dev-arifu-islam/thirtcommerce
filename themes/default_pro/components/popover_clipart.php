<?php
$addons 	= $GLOBALS['addons'];
$settings 	= $GLOBALS['settings'];
if(isset($settings->photo_color) && $settings->photo_color == 0)
{
	$change_photo = 0;
}
else
{
	$change_photo = 1;
}
?>
<div id="options-add_item_clipart" class="dg-options">
	<div class="dg-options-content dg-options-content-default">
		<div class="row toolbar-action-edit">					
			<div id="item-print-colors"></div>
		</div>
		<div class="row toolbar-action-size">
			<div class="col-xs-3 col-lg-3 align-center">
				<div class="form-group">
					<small><?php echo lang('designer_clipart_edit_width'); ?></small>
					<input type="text" size="2" id="clipart-width" readonly disabled>
				</div>
			</div>
			<div class="col-xs-3 col-lg-3 align-center">
				<div class="form-group">
					<small><?php echo lang('designer_clipart_edit_height'); ?></small>
					<input type="text" size="2" id="clipart-height" readonly disabled>
				</div>
			</div>
			<div class="col-xs-6 col-lg-6 align-right">
				<div class="form-group align-left">
					<small><?php echo lang('designer_clipart_edit_unlock_proportion'); ?></small><br />
					<input type="checkbox" class="ui-lock" id="clipart-lock" />
				</div>
			</div>
		</div>
		
		<div class="row toolbar-action-rotate">					
			<div class="form-group col-lg-12">
				<div class="row">
					<div class="col-xs-6 col-lg-6">
						<small><?php echo lang('designer_clipart_edit_rotate'); ?> &deg;</small>
					</div>
					<div class="col-xs-6 col-lg-6">
						<div class="input-group input-group-sm">
							<span class="rotate-values"><input type="number" value="0" class="form-control rotate-value" id="clipart-rotate-value" /></span>
							<div class="input-group-addon">
								<span class="rotate-refresh glyphicons refresh"></span>
							</div>
						</div>
					</div>
				</div>						
			</div>
		</div>
		
		<div class="row toolbar-action-colors">
			<div id="clipart-colors">
				<div class="form-group col-lg-12 text-left position-static">
					<small><?php echo lang('designer_clipart_edit_choose_your_color'); ?></small>
					<div id="list-clipart-colors" class="list-colors"></div>
				</div>
			</div>
		</div>
		
		<?php 
		if($change_photo == 1){
			$photo_color_default = '#000000';
			if(isset($settings->photo_color_default))
			{
				$photo_color_default = $settings->photo_color_default;
			}
		?>
		<div class="row toolbar-action-convertcolor" style="display:none;">
			<div class="col-md-12">
				<div class="checkbox">
					<label>
						<input type="checkbox" class="convertcolor-value" onclick="design.myart.convertcolor.ini()"> <?php echo lang('designer_convert_color'); ?>
					</label>
				</div>
			</div>
			<div class="col-md-12" id="convert-colors" style="display:none;">
				<div class="form-group">
					<label><?php echo lang('designer_clipart_edit_choose_your_color'); ?></label>
					<div class="list-colors list-colors-convertcolor">
						<a class="dropdown-color" id="art-change-color" href="javascript:void(0)" data-color="<?php echo $photo_color_default; ?>" onclick="design.myart.convertcolor.addEvent();" style="background-color:<?php echo $photo_color_default; ?>">
							<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>
						</a>
					</div>
				</div>
			</div>
		</div>
		<?php } ?>

		<div class="form-group">
			<div class="btn-group">
				<button class="btn btn-default btn-sm dg-tooltip" id="btn-photo-filter" title="<?php echo lang('designer_canvas_menu_finter'); ?>" onclick="design.finter.show(this);">
					<i class="fa fa-magic"></i> <?php echo lang('designer_canvas_menu_finter'); ?>
				</button>
				<button class="btn btn-default btn-sm dg-tooltip" title="<?php echo lang('designer_tools_fit'); ?>" onclick="design.tools.fit();">
					<i class="fa fa-arrows-alt"></i> <?php echo lang('designer_tools_fit_title'); ?>
				</button>
			</div>
		</div>
	</div>
</div>
<div class="dropdown-toolbar-filter" style="display: none;">
	<div id="photo-filters"></div>
</div>