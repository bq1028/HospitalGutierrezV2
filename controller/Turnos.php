<?php
class TurnosController
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

    public function getTurnos($fecha)
    {
        $matchFecha = $this->validateFecha($fecha);

        $fechaTime = strtotime($fecha);
        $todayTime = strtotime(date('d-m-Y'));
        if ($fechaTime < $todayTime) {
            return $this->badDate('La fecha ingresada ya paso.');
        }

        $nowTime = strtotime(date('H:i:s'));
        require_once 'model/Horario.php';
        $lastTurno = Horario::last();
        $lastTurnoTime = strtotime($lastTurno->comienzo);
        if ($fechaTime == $todayTime && $currentTime >= $lastTurnoTime) {
            return $this->badDate('La fecha seleccionada es la de hoy y ya comenzo el ultimo turno del dia.');
        }

        require_once 'model/Turno.php';
        $turnos = Turno::fecha(date('Y-m-d', strtotime($fecha)));
        $horarios = Horario::all();
        $libres = [];

        foreach ($horarios as $horario) {
            if (!isset($turnos[$horario->idHorario]) && ($fechaTime != $todayTime || !$horario->yaPaso())) {
                $libres[] = $horario->comienzo;
            }
        }

        return json_encode($libres);
    }

    private function error($type, $msg)
    {
        require_once 'JsonError.php';
        $error = new JsonError($type, $msg);
        return json_encode($error);
    }

    public function newTurno($dni, $fecha, $hora)
    {
        if ($matchDni = $this->validateDni($dni)) {
            return $matchDni;
        }
        if ($matchFecha = $this->validateFecha($fecha)) {
            return $matchFecha;
        }
        if ($matchHora = $this->validateHora($hora)) {
            return $matchHora;
        }

        $hora = $hora.'-00';
        $hora = str_replace('-', ':', $hora);

        $fecha = date('Y-m-d', strtotime($fecha));
        require_once 'model/Horario.php';
        require_once 'model/Turno.php';

        $horario = Horario::hora($hora);
        $result = Turno::reservar($dni, $horario->idHorario, $fecha);

        return $result;
    }

    public function validateFecha($fecha)
    {
        $pattern = '/(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/';
        $match = preg_match($pattern, $fecha);

        if (!$match) {
            return $this->error('DateError', 'Formato de fecha invalido. Formato aceptado: dd-mm-yyyy');
        }
        return false;
    }
    public function validateDni($dni)
    {
        $pattern = '/\d{8}/';
        $match = preg_match($pattern, $dni);

        if (!$match) {
            return $this->error('DniError', 'Formato de dni invalido. Formato aceptado: 8 digitos');
        }
        return false;
    }
    public function validateHora($hora)
    {
        $pattern = '/(0[89]|1[0-9])-[03]0/';
        $match = preg_match($pattern, $hora);

        if (!$match) {
            return $this->error('TimeError', 'Formato de hora invalido. Formato aceptado: hh-mm, de 08-00 a 19-30');
        }
        return false;
    }
}
