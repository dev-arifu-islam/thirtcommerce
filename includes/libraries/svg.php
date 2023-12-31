<?php
/**
 * @author tshirtecommerce - www.tshirtecommerce.com
 * @date: 2015-01-10
 * 
 * @copyright  Copyright (C) 2015 tshirtecommerce.com. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 *
 */
 
class svg{
	
	public $file = '';
	public $xml = '';
	
	function __construct($file = '', $xml = false)
	{
		if($file != '')
		{
			$this->file = $file;
			
			if($xml === true)
			{
				$this->xml = false;
				
				$host = $_SERVER['HTTP_HOST'];
				if(strpos($file, $host) !== false)
				{
					$temp = explode('tshirtecommerce/', $file);
					if(try_to_count($temp) > 1)
					{
						$path = ROOT .DS. str_replace('/', DS, $temp[1]);
						if(file_exists($path))
						{
							$content = file_get_contents($path);
							$this->xml = simplexml_load_string($content);
						}
					}
				}
				
				if (function_exists('simplexml_load_file') && $this->xml === false)
				{
					$this->xml = @simplexml_load_file($file);
				}
				
				if ($this->xml === false)
				{
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, $file);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					$data = curl_exec($ch);
					curl_close($ch);
					
					$this->xml = simplexml_load_string($data);
				}
			}
		}
	}
	
	/*
	 * return colors of file svg
	*/
	public function getColors($file = '')
	{
		if($file != '') $this->file = $file;
		
		if(file_exists($this->file))
		{
			$data 	= file_get_contents($this->file);

			preg_match_all('/stroke="(.*)"/Ui', $data, $stroke, PREG_SET_ORDER);
			preg_match_all('/fill="(.*)"/Ui', $data, $fill, PREG_SET_ORDER);

			$colors = array();
			
			// boder
			for($i=0; $i<try_to_count($stroke); $i++)
			{
				$color = $stroke[$i][1];
				if($color != 'none' && !in_array($color, $colors))
					$colors[] 	= $color;
			}

			// color
			for($i=0; $i<try_to_count($fill); $i++)
			{
				$color = $fill[$i][1];
				if($color != 'none' && !in_array($color, $colors))
					$colors[] 	= $color;
			}
			return $colors;
		}
		
		return false;
	}
	
	/*
	 * convert svg to image 
	 * create thumb
	 * $file: path of file save
	*/
	public function svgToImage($file, $size = array('width'=>100, 'height'=>100), $type = 'png', $fixed = false)
	{
		$image 	= new Imagick();
		$image->setBackgroundColor(new ImagickPixel('transparent'));
		
		$data 	= file_get_contents($this->file);
		$image->readImageBlob($data);		
		$image->setImageFormat($type);
		
		if($fixed === true)
		{
			$newWidth	= $size['width'];
			$newHeight	= $size['height'];
		}
		else
		{
			$imageprops = $image->getImageGeometry();
			$width 		= $imageprops['width'];
			$height 	= $imageprops['height'];
			if($width > $height){
				$newHeight = $size['height'];
				$newWidth = ($size['height'] / $height) * $width;
			}else{
				$newWidth = $size['width'];
				$newHeight = ($size['width'] / $width) * $height;
			}
		}
		
		$image->resizeImage($newWidth, $newHeight, imagick::FILTER_LANCZOS, 1); 
		$image->writeImage(dirname(__FILE__).'/image.png');	
		$image->clear();
		$image->destroy();
	}
	
	
	/**
     * Returns add image to svg
     *
     * @return string is content of svg file
     */
	function imageToSvg($url, $size)
	{
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink">';
		
		$svg .= '<image x="0" y="0" width="'.$size['width'].'" height="'.$size['height'].'" xlink:href="'.$url.'" />';
	 
		$svg .= '</svg>';
		
		return $svg;
	}
	
	 /**
     * Returns the xml
     *
     * @return convert file to array
     */
	function svgToXml($file = null)
	{
		if($file  == null)
			$file = $this->file;
		$this->xml = simplexml_load_file($file);
	}
	
	 /**
     * Returns the width of page
     *
     * @return string the width of page
     */
	function getWidth()
	{
		$width = (int) $this->xml->attributes()->width;

		if($width == 0)
		{
			$viewbox = $this->getviewBox();
			if(isset($viewbox[2]))
			{
				$width = $viewbox[2];
			}
		}
		$width = $width;

		return $width;
	}
	
	
	 /**
     * Returns the height of page
     *
     * @return height the width of page
     */
	function getHeight()
	{
		$height = (int) $this->xml->attributes()->height;

		if($height == 0)
		{
			$viewbox = $this->getviewBox();
			if(isset($viewbox[3]))
			{
				$height = $viewbox[3];
			}
		}
		$height = $height;

		return $height;
	}

	 /**
     * Returns the viewBox of page
     *
     * @return array the viewbox of page
     */
	function getviewBox()
	{
		$viewBox = $this->xml->attributes()->viewBox;

		$options = explode(' ', $viewBox);

		return $options;
	}
	
	
	/**
     * Export the object as xml text.
     *    
     *
     * @return string the xml string
     */
	function asXML()
	{
		return $this->xml->asXML();
	}
	
	
	/**
     * Define the height of page.
     *
     * @param string $height
     *
     * @example setHeight('350mm');
     * @example setHeight('350px');
     */
	function setHeight($height)
	{
		$this->xml->attributes()->height = $height;
	}
	
	/**
     * Define the width of page.
     *
     * @param string $width
     *
     * @example setWidth('350mm');
     * @example setWidth('350px');
     */
	function setWidth($width)
	{
		$this->xml->attributes()->width = $width;
	}
}