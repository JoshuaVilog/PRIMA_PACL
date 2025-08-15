<?php 
// include "path.php";
include "config/path.php";

?>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title><?php echo $systemTitle;?></title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/<?php echo $pluginFolder; ?>/images/gallery/icon.png" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Joshua Vilog">
    <!-- <meta name="generator" content="HDS v1.0"> -->
    <meta name="description" content="overview &amp; stats" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">

    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/bootstrap.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/font-awesome/4.5.0/css/font-awesome.min.css?v=<?php echo $generateRandomNumber; ?>" />

    <!-- ace styles -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace.min.css?v=<?php echo $generateRandomNumber; ?>" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace-skins.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/ace-rtl.min.css?v=<?php echo $generateRandomNumber; ?>" />
    <link rel="stylesheet" href="/<?php echo $pluginFolder; ?>/css/select2.min.css?v=<?php echo $generateRandomNumber; ?>" />

    <!-- ace settings handler -->
    <script src="/<?php echo $pluginFolder; ?>/js/ace-extra.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Tabulator -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder;?>/tabulator-master/dist/css/tabulator_bootstrap3.min.css?v=<?php echo $generateRandomNumber; ?>">
    <script src="/<?php echo $pluginFolder;?>/tabulator-master/dist/js/tabulator.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Sweet Alert 2 -->
    <link rel="stylesheet" href="/<?php echo $pluginFolder;?>/sweetalert/dist/sweetalert2.min.css?v=<?php echo $generateRandomNumber; ?>">
    <script src="/<?php echo $pluginFolder;?>/sweetalert/dist/sweetalert2.min.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <!-- Include fusioncharts core library -->
    <script type="text/javascript" src="/<?php echo $pluginFolder; ?>/fusioncharts/fusioncharts.js?v=<?php echo $generateRandomNumber; ?>"></script>
    <!-- Include fusion theme -->
    <script type="text/javascript" src="/<?php echo $pluginFolder; ?>/fusioncharts/themes/fusioncharts.theme.fusion.js?v=<?php echo $generateRandomNumber; ?>"></script>

    <style>
        body {
            font-family: Tahoma, sans-serif;
        }
        .disabled {
            pointer-events: none; /* Disable pointer events, preventing interaction */
            background-color: #ffffff; /* Set the background color to match the enabled field */
            border: 1px solid #ced4da; /* Add a border to mimic the enabled field */
            color: #212529; /* Set the text color to match the enabled field */
            cursor: text; /* Set the cursor to text to mimic an enabled field */
        }

        #loginBody {
            background-image: url('/<?php echo $pluginFolder; ?>/images/gallery/PRIMATECHPHILSFRONT.jpg');
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            
        }
        #imgLogo{
            /* width:300px */
            max-width: 100%;     /* Prevents image from overflowing horizontally */
            height: auto;        /* Maintains aspect ratio */
            display: block;      /* Ensures proper alignment */
            margin: 0 auto 20px; /* Centers image and adds spacing below */
        }
        g .raquel-groupDyzKxlLt {
            background-color: aqua;
        }

        #span-brand-mobile {
            display: none;
        }

        @media (max-width: 768px) {

            #span-brand-web {
                display: none;
            }

            #span-brand-mobile {
                display: inline;
            }
        }

        /* ===================================================== */
        /* TYPE YOUR CODES HERE */



    </style>

</head>