<?php

// Gets the iPlayer content and checks first if there is a copy in the cache 
function get_content($file,$url,$hours = 1,$fn = '',$fn_args = '') {
    
    // check the time
	$current_time = time(); $expire_time = $hours * 60 * 60; $file_time = filemtime($file);
	
    // check if we can get the cached version
	if(file_exists($file) && ($current_time - $expire_time < $file_time)) {
		//echo 'returning from cached file';
		return file_get_contents($file);
	}
    // otherwise get a fresh one
	else {
		$content = get_url($url);
		if($fn) { $content = $fn($content,$fn_args); }
		$content.= '<!-- cached:  '.time().'-->';
		file_put_contents($file,$content);
		return $content;
	}
}

// Returns the content of a given url 
function get_url($url) {
    
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); 
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,5);
	$content = curl_exec($ch);
	curl_close($ch);
	return $content;
}


$f = 'cache/iplayer.txt';               // cache
$u = 'http://www.bbc.co.uk/iplayer';    // source

$dom = get_content($f, $u);             // dom

// add the script in the bottom seamlessly before the closing body tag
$js = '<script src="js/app.min.js"></script>';
$find = '</body>';
$pos = strpos($dom, $find);
$result = substr_replace($dom, $js, $pos, 0);

// fix urls so they link to the correct site
$fixed = str_replace('href="/iplayer','href="https://bbc.co.uk/iplayer',$result);

echo $fixed;
?>