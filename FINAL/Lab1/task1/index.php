<?php
$stringVar = "Hello World";
$intVar = 100;
$floatVar = 10.5;
$boolVar = true;

$sum = $intVar + $floatVar;
$sub = $intVar - 20;
$mul = $floatVar * 2;
$div = $intVar / 5;

echo "Sum: " . $sum . "<br>";
echo "Subtraction: " . $sub . "<br>";
echo "Multiplication: " . $mul . "<br>";
echo "Division: " . $div . "<br>";

echo "Sum using echo: " . $sum . "<br>";
print "Sum using print: " . $sum . "<br>";

var_dump($stringVar);
var_dump($intVar);
var_dump($floatVar);
var_dump($boolVar);
?>