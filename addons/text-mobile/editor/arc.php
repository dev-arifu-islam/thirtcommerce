<?php
$addons = $GLOBALS['addons'];
?>
<div class="row toolbar-action-arc">	
	<div class="col-xs-6 pull-left text-arc-value">
		<div class="form-group">
			<small><?php echo $addons->__('addon_text_arc_title_full'); ?></small> <span id="text-arc-value" class="label label-default">0</span>&#176;
		</div>
	</div>
	<div class="col-xs-6 text-right pull-right text-arc-opp">
		<div class="form-group">
			<small><?php echo $addons->__('addon_text_arc_title_reverse'); ?> </small> <input type="checkbox" class="text-arc-reverse" onclick="design.text.arc.reverse(this)">
		</div>
	</div>
	<div class="form-group col-xs-12 clear-both">
		<div id="text-arc" class="dg-slider"></div>
	</div>
	<input type="text" style="display: none" id="text-arc-spacing-label" value="<?php echo $addons->__('addon_text_arc_title_spacing'); ?>">
</div>