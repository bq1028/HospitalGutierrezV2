<?php
    require_once './model/User.php';
    class ReportesController
    {
        private static $instance;

        public static function getInstance()
        {
            if (!isset(self::$instance)) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        private function __construct()
        {
        }

        public function index()
        {
            AppController::allowed('paciente_index');

            if (isset($_GET['idPaciente']) && ($paciente = $_GET['idPaciente']) != "") {
                $paciente = $_GET['idPaciente'];
            } else {
                AppController::req_fields();
                die;
            }

            require_once 'model/Consulta.php';

            $consultas = Consulta::all($paciente);

            $pcs = [];
            $pesos = [];
            $tallas = [];

            foreach ($consultas as $consulta) {
                $genero = $consulta->paciente->idGenero;
                $pcs[$consulta->semanas] = $consulta->pc;
                $pesos[$consulta->semanas] = $consulta->peso;
                $tallas[$consulta->semanas] = $consulta->talla;
            }

            $datos = [
                'genero' => $genero,
                'PCs' => $pcs,
                'Pesos' => $pesos,
                'Tallas' => $tallas
            ];

            header('Content-Type: application/json');
            echo json_encode($datos, JSON_PRETTY_PRINT);
            die;
        }
    }
