<?php
/* gets the contents of a file if it exists, otherwise grabs and caches */
function get_content($file,$url,$hours = 24,$fn = '',$fn_args = '') {
    //vars
	$current_time = time(); $expire_time = $hours * 60 * 60; $file_time = filemtime($file);
	//decisions, decisions
	if(file_exists($file) && ($current_time - $expire_time < $file_time)) {
		//echo 'returning from cached file';
		return file_get_contents($file);
	}
	else {
		$content = get_url($url);
		if($fn) { $content = $fn($content,$fn_args); }
		$content.= '<!-- cached:  '.time().'-->';
		file_put_contents($file,$content);
		//echo 'retrieved fresh from '.$url.':: '.$content;
		return $content;
	}
}

/* gets content from a URL via curl */
function get_url($url) {
    
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); 
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,5);
	$content = curl_exec($ch);
	curl_close($ch);
	return $content;
}



$f = 'cache/iplayer.txt';
$u = 'http://www.bbc.co.uk/iplayer';

//$c = get_content($f, $u);

$dom = get_content($f, $u);

// add the script in the bottom seamlessly before the closing body tag
$js = '<script src="js/app.js"></script>';
$find = '</body>';
$pos = strpos($dom, $find);

$result = substr_replace($dom, $js, $pos, 0);

echo $result;
?>