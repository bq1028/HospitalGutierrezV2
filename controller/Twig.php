<?php
class TwigController{
    private static $twig, $loader;
    
    public static function getInstance() {
        if (!isset(self::$twig)) {
            self::$loader = new Twig_Loader_Filesystem('view');
            self::$twig = new Twig_Environment(self::$loader, array());
        }

        return self::$twig;
    }

    public static function renderTwig($path, $context = []) {
        $config = ConfigController::getConfiguration();

        if (!isset($context['stylesheets'])) {
            $context['stylesheets'] = [];
        }
        if (!isset($context['javascripts'])) {
            $context['javascripts'] = [];
        }
        /*
        if (!isset($context['titulo'])) {
            $context['titulo'] = $config->titulo;
        }
        else {
            $context['titulo'] = $config->titulo.' - '.$context['titulo'];
        }
        */
        $context['titulo'] = $config->titulo;
        $context['email'] = $config->email;
        $context['elementos'] = $config->elementos;
        $context['isLogged'] = AppController::isLogged();
        
        $template = self::getInstance()->loadTemplate($path);
        echo $template->render($context);
    }

    private function __construct() {}
        
}
