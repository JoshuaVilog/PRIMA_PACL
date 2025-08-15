
<body class="no-skin">
<?php include "partials/navbar.php";?>

<div class="main-container ace-save-state" id="main-container">
    <script type="text/javascript">
        try{ace.settings.loadState('main-container')}catch(e){}
    </script>

    <?php include "partials/sidebar.php";?>
    <div class="main-content">
        <div class="main-content-inner">
            <div class="page-content">
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="">
                                    <strong>Date:</strong>
                                </label>
                                <input type="date" id="txtDate" class="form-control">
                            </div>
                        </div>
                        <div class="col-sm-6"></div>
                        <style>
                            #tableAuditList th, #tableAuditList td{
                                border: 1px solid #000000;
                                padding: 2px;
                            }
                        </style>
                        <div class="col-sm-4">
                            <!-- <table id="tableAuditList">
                                <tr>
                                    <th>TEST</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>qwe</td>
                                </tr>
                            </table> -->
                        </div>
                    </div>
                    <div id="table-records"></div>

                </div>
            </div>
        </div>
    </div>
    <?php include "partials/footer.php";?>
    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>

    <!-- MODAL  -->
    <?php
    //include "modal/modalAdd.php";
    //include "modal/modalEdit.php";
    ?>
</div>
<script src="/<?php echo $rootFolder; ?>/script/Audit.js?v=<?php echo $generateRandomNumber; ?>"></script>

<script>
    $("#txtDate").val(main.GetCurrentDate());

    let audit = new Audit();
    let date = $("#txtDate").val();

    setTimeout(() => {
        audit.GetAuditMasterlistByDate("#table-records", date);
    }, 1000);

    setInterval(() => {
        audit.GetAuditMasterlistByDate("#table-records", date);
    }, 60000);



</script>
