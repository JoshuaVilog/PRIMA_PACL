
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
                        <h1>List</h1>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-sm-12 pricing-box">
                            <div class="widget-box widget-color-orange">
                                <div class="widget-header">
                                    <h5 class="widget-title bigger lighter">List</h5>
                                </div>
                                <div class="widget-body">
                                    <div class="widget-main">
                                    <div class="col">
                                        <button type="button" class="btn btn-primary" id="btnOpenModalAdd">New</button>
                                    </div>
                                        <div id="table-records"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        include "partials/modals/modalAddRecord.php";
        include "partials/modals/modalEditRecord.php";
        ?>
    </div>
    <!-- JavaScript -->
    <script src="/<?php echo $rootFolder; ?>/script/Record.js?v=<?php echo $generateRandomNumber; ?>"></script>
    <script>
        let record = new Record();

        //DISPLAY RECORDS
        record.DisplayRecords("#table-records");

        $("#btnOpenModalAdd").click(function(){
            
            $("#modalAdd").modal("show");

        });
        $("#btnAdd").click(function(){

            record.desc = $("#txtDesc");
            record.modal = $("#modalAdd");
            record.table = "#table-records";

            record.InsertRecord(record);

        });
        $("#table-records").on("click", ".btnEditRecord", function(){
            let id = $(this).val();

            record.id = id;
            record.desc = $("#txtEditDesc");
            record.modal = $("#modalEdit");
            record.table = "#table-records";
            record.hiddenID = $("#hiddenID");

            record.SetRecord(record);
        });
        $("#btnUpdate").click(function(){

            record.desc = $("#txtEditDesc");
            record.id = $("#hiddenID");
            record.modal = $("#modalEdit");
            record.table = "#table-records";

            record.UpdateRecord(record);
        });
        $("#table-records").on("click", ".btnRemoveRecord", function(){
            let id = $(this).val();

            record.table = "#table-records";
            record.id = id;
            
            record.RemoveRecord(record);

        });

        


    </script>

