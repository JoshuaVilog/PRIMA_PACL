
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
                    <hr>
                    <div class="row">
                        <div class="col-sm-1">
                            <div class="form-group">
                                <label for="">
                                    <strong>START DATE:</strong>
                                </label>
                                <input type="date" id="txtStartDate" class="form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <div class="form-group">
                                <label for="">
                                    <strong>END DATE:</strong>
                                </label>
                                <input type="date" id="txtEndDate" class="form-control">
                            </div>
                        </div>
                        <div class="col-sm-4"></div>
                        <style>
                            .tableAuditList {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            .tableAuditList th, .tableAuditList td{
                                border: 1px solid #000000;
                                padding: 2px;
                                font-size: 12px;
                                text-align: center;
                            }
                        </style>
                        <div class="col-sm-3">
                            <table id="tableAuditList1" class="tableAuditList">
                                <thead>
                                    <tr>
                                        <th>PIC</th>
                                        <th>CODE</th>
                                        <th>SUBJECT</th>
                                        <th>ISSUES</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyAuditList1">
                                </tbody>
                            </table>
                        </div>
                        <div class="col-sm-3">
                            <table id="tableAuditList2" class="tableAuditList">
                                <thead>
                                    <tr>
                                        <th>PIC</th>
                                        <th>CODE</th>
                                        <th>SUBJECT</th>
                                        <th>ISSUES</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyAuditList2">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <i class="ace-icon fa fa-spinner fa-spin blue bigger-125" id="spinner" style="display: none;"></i>
                    <button class="btn btn-primary btn-sm" id="btnExport">Download</button>
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
    $("#txtStartDate").val(main.GetCurrentDate(1));
    $("#txtEndDate").val(main.GetCurrentDate());

    let audit = new Audit();

    // let startDate = $("#txtStartDate").val();
    // let endDate = $("#txtEndDate").val();

    setTimeout(() => {
        let startDate = $("#txtStartDate").val();
        let endDate = $("#txtEndDate").val();

        $("#txtStartDate").prop("max", startDate);
        $("#txtEndDate").prop("min", endDate);

        audit.GetAuditMasterlistByDate("#table-records", startDate, endDate);
        // audit.DisplayAuditCheckList();
        // audit.DisplayAuditCheckList("#table-audit-list");
    }, 1000);

    setInterval(() => {
        let startDate = $("#txtStartDate").val();
        let endDate = $("#txtEndDate").val();

        audit.GetAuditMasterlistByDate("#table-records", startDate, endDate);
    }, 120000);

    $("#txtStartDate").change(function () {
        let startDate = $(this).val();
        let endDate = $("#txtEndDate").val();
        $("#txtEndDate").prop("min", startDate);

        audit.GetAuditMasterlistByDate("#table-records", startDate, endDate);
    });
    $("#txtEndDate").change(function () {
        let endDate = $(this).val();
        let startDate = $("#txtStartDate").val();
        $("#txtStartDate").prop("max", endDate);

        audit.GetAuditMasterlistByDate("#table-records", startDate, endDate);
    });
    $("#btnExport").click(function(){
        audit.ExportTable();
    });


</script>
