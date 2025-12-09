<?php
function sum($a, $b) {
    return $a + $b;
}

echo sum(10, 5) . "<br>";
echo sum(3.5, 2.5) . "<br>";

function factorial($n) {
    if ($n <= 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}

echo factorial(5) . "<br>";

function is_prime($n) {
    if ($n < 2) {
        return false;
    }
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) {
            return false;
        }
    }
    return true;
}

echo is_prime(7) ? "Prime" : "Not Prime";
echo "<br>";
echo is_prime(10) ? "Prime" : "Not Prime";
?>