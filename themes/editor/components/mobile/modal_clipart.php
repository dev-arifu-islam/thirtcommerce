<?php
$settings 	= $GLOBALS['settings'];
$dg 		= $GLOBALS['dg'];
// check store
$is_store = false;
if (isset($settings->store) && isset($settings->store->enable) && isset($settings->store->api) && $settings->store->api != '' && isset($settings->store->verified) && $settings->store->verified == 1)
{
	$is_store = true;
}

if ($is_store == true)
{
	$dg->view('modal_store', 'mobile');
}
else
{
?>
<script>lang.store = {};</script>
<div class="modal fade" id="dg-cliparts" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header" style="overflow: hidden;">
				<button type="button" class="btn-mobile-close pull-right" data-dismiss="modal" aria-hidden="true" style="">
					<i class="glyph-icon text-danger flaticon-14 flaticon-remove"></i>
				</button>
				<div class="pull-left">
					<button class="btn btn-default btn-sm" onclick="jQuery('#dag-art-categories').toggle('slow')">
						<i class="glyph-icon flaticon-menu flaticon-12"></i>
					</button>
				</div>
				 <div class="pull-left" style="width: 80%;margin-left: 6px;">
					<div class="input-group">
						 <input type="text" id="art-keyword" autocomplete="off" class="form-control input-sm" placeholder="<?php echo lang('designer_clipart_search_for'); ?>">
						<span class="input-group-btn">
							<button class="btn btn-default btn-sm" onclick="design.designer.art.arts(0)" type="button"><?php echo lang('designer_clipart_search'); ?></button>
						</span>
					</div>
				</div>
			</div>
			<div class="modal-body">
				<div class="row align-center">
					<div id="dag-art-panel">
						<a href="javascript:void(0)" title="<?php echo lang('designer_show_categories'); ?>">
							<?php echo lang('designer_clipart_shop_library'); ?> <span class="caret"></span>
						</a>
						<a href="javascript:void(0)" title="<?php echo lang('designer_show_categories'); ?>">
							<?php echo lang('designer_clipart_store_design'); ?> <span class="caret"></span>
						</a>
					</div>
				</div>
				
				<div id="dag-art-categories"></div>
				
				<div class="row">
					
					<div class="col-md-12">
						<div id="dag-list-arts"></div>
						<div id="dag-art-detail">
							<button type="button" class="btn btn-danger"><?php echo lang('designer_close_btn'); ?></button>
						</div>
					</div>								
				</div>
			</div>
			
			<div class="modal-footer">
				<div class="align-right" id="arts-pagination" style="display:none">
					<ul class="pagination"></ul>
					<input type="hidden" value="0" autocomplete="off" id="art-number-page">
				</div>
				<div class="align-right" id="arts-add" style="display:none">
					<div class="art-detail-price"></div>
					<button type="button" class="btn btn-primary btn-sm"><?php echo lang('designer_add_design_btn'); ?></button>
				</div>
			</div>
		</div>
	</div>
</div>
<?php } ?>