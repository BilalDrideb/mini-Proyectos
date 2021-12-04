<?php
// mini base de datos ^-^
$actividades=[
    'yoga'=>35,
    'zumba'=>40,
    'karate'=>60,
    "pesas"=>30,
    "pilates"=>35,
    "cardioBox"=>45

];

$actividad=$_REQUEST['actividad'];
echo $actividades[$actividad];
?>