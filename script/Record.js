class Record {
    constructor(){}

    DisplayRecords(tableElem){

        $.ajax({
            url: "php/controllers/Record/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){

                // console.log(response);

                var table = new Tabulator(tableElem, {
                    data: response.data,
                    pagination: "local",
                    paginationSize: 10,
                    paginationSizeSelector: [10, 25, 50, 100],
                    page: 1,
                    ajaxURL: "your_data_endpoint_here.json",
                    layout: "fitDataFill",
                    columns: [
                        {title: "ID", field: "RID", headerFilter: "input"},
                        {title: "DESCRIPTION", field: "DESCRIPTION", headerFilter: "input"},
                        {title: "CREATED AT", field: "CREATED_AT", headerFilter: "input"},
                        {title: "ACTION", field:"RID", width: 300, hozAlign: "left", headerSort: false, frozen:true, formatter:function(cell){
                            let id = cell.getValue();
                            let edit = '<button class="btn btn-primary btn-minier btnEditRecord" value="'+id+'">Edit</button>';
                            let remove = '<button class="btn btn-danger btn-minier btnRemoveRecord" value="'+id+'">Remove</button>';

                            return edit + " " + remove;
                        }},
                    ],
                });
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    SetRecord(record){
        $.ajax({
            url: "php/controllers/Record/GetRecord.php",
            method: "POST",
            data: {
                id: record.id,
            },
            datatype: "json",
            success: function(data){
                // console.log(data);
                record.modal.modal("show");
                record.desc.val(data.DESCRIPTION);
                record.hiddenID.val(record.id);

                if(record.btnAdd != undefined || record.btnCancel != undefined || record.btnUpdate != undefined){
                    record.btnAdd.hide();
                    record.btnCancel.show();
                    record.btnUpdate.show();
                }
                
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    InsertRecord(record){
        let self = this;
        let desc = record.desc;
        
        if(desc.val() == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the form.',
                icon: 'warning'
            })
        } else {
            $.ajax({
                url: "php/controllers/Record/InsertRecord.php",
                method: "POST",
                data: {
                    desc: desc.val(),
                },
                success: function(response){
                    response = JSON.parse(response);

                    if(response.status == "duplicate"){

                        Swal.fire({
                            title: 'Duplicate.',
                            text: 'Please input an unique description.',
                            icon: 'warning'
                        })
                    } else if(response.status == "success"){
                        record.modal.modal("hide");
                        record.desc.val("");
    
                        Swal.fire({
                            title: 'Record added successfully!',
                            text: '',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Proceed!',
                            timer: 2000,
                            willClose: () => {
                                self.DisplayRecords(record.table);
                            },
                        })
                    }
                    
                },
                error: function(err){
                    console.log("Error:"+JSON.stringify(err));
                },
            });

            //REFRESH RECORD
            this.DisplayRecords(record.table);
            
        }
    }
    UpdateRecord(record){
        let self = this;
        let desc = record.desc;
        let id = record.id;
        
        if(desc.val() == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the form.',
                icon: 'warning'
            })
        } else {
            $.ajax({
                url: "php/controllers/Record/UpdateRecord.php",
                method: "POST",
                data: {
                    desc: desc.val(),
                    id: id.val(),
                },
                success: function(response){
                    response = JSON.parse(response);

                    if(response.status == "duplicate"){

                        Swal.fire({
                            title: 'Duplicate.',
                            text: 'Please input an unique description.',
                            icon: 'warning'
                        })
                    } else if(response.status == "success"){

                        record.modal.modal("hide");
                        record.desc.val("");

                        if(record.btnAdd != undefined || record.btnCancel != undefined || record.btnUpdate != undefined){
                            record.btnAdd.show();
                            record.btnCancel.hide();
                            record.btnUpdate.hide();
                        }

                        Swal.fire({
                            title: 'Record updated successfully!',
                            text: '',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Proceed!',
                            timer: 2000,
                            willClose: () => {
                                self.DisplayRecords(record.table);
                            },
                        })
                    }
                    
                },
                error: function(err){
                    console.log("Error:"+JSON.stringify(err));
                },
            });

            //REFRESH RECORD
            this.DisplayRecords(record.table);
        }
    }
    RemoveRecord(record){
        let self = this;
        Swal.fire({
            title: 'Are you sure you want to remove the record?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'php/controllers/Record/RemoveRecord.php', // Replace with your server-side script URL
                    type: 'POST',
                    data: {
                        id: record.id,
                    },
                    success: function(response) {
                        // console.log(response);

                        self.DisplayRecords(record.table);
                        Swal.fire({
                            title: 'Record removed successfully!',
                            text: '',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Proceed!',
                            timer: 2000,
                            willClose: () => {
                                // window.location.href = "dashboard";
                            },
                        })
            
                    }
                });  
                this.DisplayRecords(record.table); 
            }
        })

    }

}