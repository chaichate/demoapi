<?php

#require 'vendor/autoload.php';
   class Foo
    {
        private $_url ;
        var $func_array=[];
        public function add($url,$func,$json=null)
        {
            var_dump($url);
            $url = ltrim($url, '/');
            $url_param  =explode("/", $url);
            
            var_dump($url_param);
            
            $this->{$url_param[0]} = $func;
            $this->func_array[] = array(
                "name"=> $url_param[0],
                //"func" => $func
            );
        }
        public function __call($func,$arguments){
            
            //var_dump($func);
            call_user_func_array($this->{$func}, $arguments); 
        }
        
        
        public function run(){
         
           // var_dump($_SERVER['REQUEST_URI']);
            $url = isset($_GET['url']) ? $_GET['url'] : null;
            $url = rtrim($url, '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $this->_url = explode('/', $url);
            
            var_dump( $this->_url);
            $arr =$this->func_array[1];
            var_dump($arr['name']);
            
            //$callableFunc = $arr->func;
           $this->{$arr['name']}($this->_url[1]) ;
            
        }
    }
    
    
    $Foo = new Foo();
    // $Foo->add(function($parameterone=null){
    //     echo "Hello World<br/>";
    // },"helloWorldFunction");
    
    $Foo->add('/books/:id:5555:5555', function ($one)  {
        
        echo "The first parameter is " . $one;
        //var_dump(get_class($Foo));
        
    });
    
    
    $Foo->add('/books2/:id:5555:5555', function ($one)  {
        
        echo "The first parameter is 2 " . $one;
        //var_dump(get_class($Foo));
        
    });
    
    
    
    // $Foo->add(function($parameterone){
    //     echo $parameterone;
    // },"exampleFunction");
    
   echo "<pre>"; 
   $Foo->run(); 
  // $Foo->helloWorldFunction(1); /*Output : Hello World*/
   // $Foo->exampleFunction("Hello PHP"); /*Output : Hello PHP*/

