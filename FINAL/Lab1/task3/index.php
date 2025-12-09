<?php
for ($i = 1; $i <= 20; $i++) {
    echo $i . " ";
}
echo "<br>";

$j = 2;
while ($j <= 20) {
    echo $j . " ";
    $j += 2;
}
echo "<br>";

$fruits = [
    "Apple" => "Red",
    "Banana" => "Yellow",
    "Grape" => "Purple",
    "Orange" => "Orange",
    "Lime" => "Green",
    "Blueberry" => "Blue"
];

$count = 0;
foreach ($fruits as $name => $color) {
    echo $name . " is " . $color . "<br>";
    $count++;
    if ($count == 5) {
        break;
    }
}
?>