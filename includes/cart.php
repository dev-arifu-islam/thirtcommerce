<?php
/**
 * @author tshirtecommerce - www.tshirtecommerce.com
 * @date: 2015-01-10
 * 
 * @copyright  Copyright (C) 2015 tshirtecommerce.com. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 *
 */
class dgCart{
	/*
	 * get price of base product with discount quantity, sale
	 *
	 * $product product info
	 * $lisPrice list price with quantity
	 *
	*/
	public $setting;
	
	function getPrice($product, $lisPrice, $quantity){
	
		$prices	= new stdClass();
		
		$prices->base = $this->priceFormart($product->price);
		$prices->sale = $this->priceFormart($product->price);		
				
		// overwrite price
		if (isset($product->sale_price) && $product->sale_price > 0)
		{
			$prices->sale = $this->priceFormart($product->sale_price);
			return $prices;
		}
		
		// check price with quantity
		if ($lisPrice == false || empty($lisPrice->min_quantity)) return $prices;
				
				
		$mins 	= $lisPrice->min_quantity;
		$maxs 	= $lisPrice->max_quantity;
		$price 	= $lisPrice->price;
		$i 		= try_to_count($price) - 1;
		
		if (try_to_count($mins) == 0 || try_to_count($maxs) == 0 || try_to_count($price) == 0) return $prices;
		
		if ($quantity <= $mins[0])
		{
			$prices->sale = $this->priceFormart($price[0]);
			return $prices;
		}

		if ($quantity > $maxs[$i])
		{
			$prices->sale = $this->priceFormart($price[$i]);
			return $prices;
		}
		
		for($j=0; $j<($i + 1); $j++)
		{
			if ( $quantity >= $mins[$j] && $quantity <= $maxs[$j]  )
			{
				$prices->sale = $this->priceFormart($price[$j]);
				return $prices;
			}			
		}
		return $prices;
	}
	
	function settingPrint($setting, $type, $paper, $value = 0){
		if (empty($setting->prints))
			return $value;
		
		if (empty($setting->prints->$type))
			return $value;
		
		if (empty($setting->prints->$type->$paper))
			return $value;
			
		return $setting->prints->$type->$paper;
	}

	// get price of art
	public function getPriceArt($cliparts)
	{
		$ids = array();
		foreach($cliparts as $view => $arts)
		{
			for($i=0; $i<try_to_count($arts); $i++)
			{
				if(!isset($arts[$i]))
					continue;
				if (!in_array($arts[$i], $ids))
				{
					$ids[] = str_replace('22222', '', $arts[$i]);
				}
			}
		}
		
		if (try_to_count($ids) == 0) return array();
		
		$file = ROOT .DS. 'data' .DS. 'arts.json';
		if (!file_exists($file)) return array();
		
		$str 		= file_get_contents($file);
		$rows 	= json_decode($str);
		
		if (empty($rows->count) || $rows->count == 0 || empty($rows->arts)) return array();
		
		$prices = array();
		foreach($rows->arts as $art)
		{
			if (in_array($art->clipart_id, $ids))
			{
				$prices[$art->clipart_id] = $this->priceFormart($art->price);
			}
		}		
		return $prices;
	}
	
	// get printingType
	function printingType($printing_code, $data, $quantity)
	{
		$price = 0;	
		
		// get list printing method
		$file 			= ROOT .DS. 'data' .DS. 'printings.json';
		if ( file_exists($file) )
		{
			$content 	= file_get_contents($file);			
			if ($content != false && $content != '')
			{
				$printings = json_decode($content);				
				if ( try_to_count($printings) )
				{
					foreach ($printings as $printing)
					{
						// check printing type of product
						if ( $printing->printing_code == $printing_code )
						{
							$code_type	= ROOT .DS. 'addons' .DS. 'printings' .DS. $printing->price_type.'.json';
							
							if ( file_exists ($code_type) && isset($printing->printing_code))
							{
								$control = ROOT .DS. 'addons' .DS. 'printings' .DS. 'control' .DS. $printing->price_type.'.php';								
								if ( file_exists($control) )
								{
									include_once($control);
									if (function_exists('getPricePrinting'))
									{
										$price	= getPricePrinting($printing, $data, $quantity);
									}
								}
								
							}
							break;
						}
					}
				}
			}
		}
		return $price;
	}
	
	// get price of printing
	function getPricePrint($print_type, $setting, $print, $quantity)
	{
		$price = 0;	
		
		// check other printing
		if ($print_type != 'DTG' && $print_type != 'screen' && $print_type != 'sublimation' && $print_type != 'embroidery')
		{
			$price = $this->printingType($print_type, $print, $quantity);
			return $price;
		}
		
		if ($print['sizes'] == '{}') return 0;
		
		// get price with size		
		$sizes = json_decode($print['sizes']);
		$colors = json_decode($print['colors']);
		foreach($sizes as $view=>$value)
		{
			$price_print 	= $this->settingPrint($setting, $print_type, $value->size, 0);
			$price_print	= $this->priceFormart($price_print);
			if ($print_type == 'DTG' || $print_type == 'sublimation')
				$price = $price + $price_print;
			else
				$price = $price + ($price_print * try_to_count($colors->$view));			
		}
		
		return $price;
	}
	/*
	 * $fields is all attribute get from post
	 * $attributes get attribute from database
	*/
	function getPriceAttributes($attributes, $fields, $quantity)
	{
		$total 			= 0;
		$data 			= new stdClass();
		$data->prices 		= 0;
		$data->fields 		= array();
		
		if (is_string($attributes->prices))
			$prices 	= json_decode($attributes->prices);
		else
			$prices 	= $attributes->prices;
		
		if (is_string($attributes->type))
			$types 	= json_decode($attributes->type);
		else
			$types 	= $attributes->type;
		
		if (is_string($attributes->name))
			$names 	= json_decode($attributes->name);
		else
			$names 	= $attributes->name;
		
		if (is_string($attributes->titles))
			$titles 	= json_decode($attributes->titles);
		else
			$titles 	= $attributes->titles;	
	
		if (try_to_count($prices) == 0)
		{
			return $data;
		}
		else
		{
			foreach($types as $i=>$type)
			{
				if ( isset($fields[$i]) )
				{
					$data->fields[$i] = array();
					$data->fields[$i]['name'] = $names[$i];
					$data->fields[$i]['type'] = $types[$i];
					$data->fields[$i]['value'] = array();
					if ($type == 'selectbox' || $type == 'radio')
					{
						if($fields[$i] == '') $fields[$i] = 0;
						$price = $this->priceFormart($prices[$i][$fields[$i]]);
						$total = $total + ($price * $quantity);
						
						$data->fields[$i]['value'] = $titles[$i][$fields[$i]];
					}
					elseif ($type == 'textlist') // product size
					{						
						foreach($fields[$i] as $j=>$value)
						{
							if ($value == '' || $value == 0) continue;
							$value = (float) $value;
							$price = $this->priceFormart($prices[$i][$j]);
							$total = $total + ($price * (float)$value);
							$data->fields[$i]['value'][$titles[$i][$j]] = $value;
						}
					}
					elseif ($type == 'checkbox')
					{						
						foreach($fields[$i] as $j=>$value)
						{
							if ($value == '') continue;
							if (isset($prices[$i][$value]))
							{
								$price = $this->priceFormart($prices[$i][$value]);
								$total = $total + ($price * $quantity);
							}
							else
							{
								$total = $total;
							}
							
							$data->fields[$i]['value'][$j] = $titles[$i][$j];							
						}
					}
				}
			}
		}
		
		$data->prices = $total;
		
		return $data;
	}
	
	function totalPrice($product, $post, $setting)
	{		
		$data 		= new stdClass();
		
		$this->setting	= $setting;
		
		// get base price of product
		// get base price of product
		if (isset($product->prices) && is_object($product->prices) > 0)
		{
			$prices 	= $product->prices;		
			$data->price = $this->getPrice($product, $prices, $post['quantity']);
		}
		else
		{
			if( isset($post['variation_id']) && isset($product->prices_variations) )
			{
				if(is_string($product->prices_variations))
					$prices_variations = json_decode($product->prices_variations, true);
				else
					$prices_variations = json_decode( json_encode($product->prices_variations), true);

				if( isset($prices_variations[$post['variation_id']]) )
				{
					$data->price = new stdClass();
					$data->price->base = $this->priceFormart($prices_variations[$post['variation_id']]);
					$data->price->sale = $this->priceFormart($prices_variations[$post['variation_id']]);
				}
			}
			if(!isset($data->price))
			{
				$prices			= new stdClass();
				$data->price 	= $this->getPrice($product, $prices, $post['quantity']);
			}
		}	
		if(empty($data->price))
		{
			$data->price = new stdClass();
			$data->price->base = 0;
			$data->price->sale = 0;
		}
		
		// get price of product color
		$design = $product->design;		
		if ($design == false)
		{
			$data->price->colors = 0;
		}
		else
		{
			$data->price->colors 	= 0;
			$color_hex				= $design->color_hex;
			if (isset($design->price))
			{
				$color_price		= $design->price;
				foreach($color_hex as $keyvl=>$hexvl)
				{
					if( isset($color_hex[$keyvl]) && isset($post['colors'][key($post['colors'])]) && $color_hex[$keyvl] == $post['colors'][key($post['colors'])])
						$data->price->colors = $color_price[$keyvl];
				}
			}
		}
		
		// get price of print
		if (is_object($setting) > 0)
		{
			if ($product->print_type == '')
				$print_type = 'screen';
			else
				$print_type = $product->print_type;
			
			$data->price->prints = $this->getPricePrint($print_type, $setting, $post['print'], $post['quantity']);
			$data->price->prints_not_discount = $this->getPricePrint($print_type, $setting, $post['print'], 1);
		}
		else
		{
			$data->price->prints = 0;
			$data->price->prints_not_discount = 0;
		}
		
		// get price attribute
		if ($post['attribute'] == false)
		{
			$data->price->attribute = 0;
		}
		else
		{
			$attributes	= $product->attributes;
			if( is_object($attributes) == 0)
			{
				$data->price->attribute = 0;
				$data->options = false;
			}
			else
			{									
				$customField 			= $this->getPriceAttributes($attributes, $post['attribute'], $post['quantity']);			
				$data->price->attribute = $customField->prices;
				$data->options 			= $customField->fields;							
			}
		}
		return $data;
	}
	
	public function priceFormart($price)
	{
		if(isset($this->setting) && is_object($this->setting) > 0)
		{			
			$price_decimal 		= setValue($this->setting, 'price_decimal', '.');

			$price = str_replace($price_decimal, '.', $price);
		}
		$price = str_replace(',','.',$price);
		return (float)$price;
	}
}
?>