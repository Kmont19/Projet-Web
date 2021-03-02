
<?php

$regex_Vide_OUI = "((^([\s\t\0]?)$){1})";
$regex_String_Unique_OUI = "((^[A-Z a-z - ' \ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})";
$regex_Numerique_Int_OUI = "((^[0-9]+$){1})";
$regex_Numerique_Decimal_OUI = "(^(([0-9]+)([,.]?)([0-9]+)){1}$)";
$regex_CodePostal_OUI = "((^([a-zA-z]{1})([0-9]{1})([a-zA-z]{1})([ ]*)([0-9]{1})([a-zA-z]{1})([0-9]{1})$){1})";
$regex_Telephone_OUI = "((^([(]*)(([0-9]{3}){1})([)]*)([ -]*)(([0-9]{3}){1})([ -]*)(([0-9]{4}){1})$){1})";
$regex_Courriel_OUI = "(^(.+)(@)((.+)([\.]{1})(.+))+$)";
$regex_MotDePasse_OUI = "((^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#!\"$%?&*()_+|=\/*]).{8,}$))";
$regex_StringTousCaracteres_OUI = "((^[A-Z a-z 0-9 |(){}\[\]#!%?&*-+\/=,.;:`'\"«»°_\ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})";


?>