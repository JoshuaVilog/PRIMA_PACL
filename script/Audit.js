class Audit extends Main{

    constructor() {
        super()
        this.tableDisplay = null;
    }

    GetAuditMasterlistByDate(tableElem, startDate, endDate) {
        let self = this;
        let auditList = JSON.parse(localStorage.getItem(self.lsAuditList));

        $("#spinner").show();
        $.ajax({
            url: "php/controllers/Audit/AuditMasterlistRecords.php",
            method: "POST",
            data: {
                startDate: startDate,
                endDate: endDate,
            },
            datatype: "json",
            success: function(response){
                console.log(response);
                let list = response.data;

                let columns = [];
                let issueList = [];

                list.forEach(function (row) {
                    let auditCheckList = JSON.parse(row.AUDIT_CHECKLIST);
                    let operatorList = JSON.parse(row.OPERATOR);

                    for(let i = 0; i < auditList.length; i++) {
                        let checked = false;

                        for(let j = 0; j < auditCheckList.length; j++) {
                           if(auditList[i].RID == auditCheckList[j]) {
                                checked = true;
                                break;
                            }
                        }

                        row[auditList[i].AUDIT_CODE] = (checked == true) ? "O" : "X"; 

                        //I-CHECHECK KUNG YUNG AUDIT_CODE AY NASA ISSUE LIST NA
                        // if(auditList[i].RID in issueList == false){
                        if(issueList.some(item => item.RID == auditList[i].RID) == false) {
                            // issueList[auditList[i].RID] = 0;
                            issueList.push({
                                RID: auditList[i].RID,
                                CODE: auditList[i].AUDIT_CODE,
                                DESC: auditList[i].AUDIT_DESC,
                                CATEGORY: auditList[i].CATEGORY,
                                ISSUE: 0,
                            });
                        }
                        //KUNG HINDI CHECKED, MAGDADAGDAG NG +1 SA AUDIT_CODE NG ISSUE LIST
                        if(checked == false) {
                            // issueList[auditList[i].RID]++;
                            let result = issueList.find(item => item.RID == auditList[i].RID);
                            result.ISSUE += 1;
                        }

                    }

                    //OPERATOR
                    for(let i = 0; i < operatorList.length; i++) {
                        row["OPERATOR_"+(i+1)] = self.SetEmployeeNameByRFID(operatorList[i]);
                    }


                    row.SHIFT = self.SetShift(parseInt(row.SHIFT));
                    row.JUDGE = self.SetJudge(parseInt(row.JUDGE));
                    row.LINE_LEADER = self.SetEmployeeNameByRFID(row.LINE_LEADER);
                    row.CREATED_BY = self.SetEmployeeNameByRFID(row.CREATED_BY);
                    row.IPQC = self.SetEmployeeNameByRFID(row.IPQC);
                    row.TECHNICIAN = self.SetEmployeeNameByRFID(row.TECHNICIAN);
                    row.AUDIT_DATE = row.CREATED_AT.split(" ")[0];
                    row.AUDIT_TIME = row.CREATED_AT.split(" ")[1];
                });

                // console.log(issueList);
                self.DisplayAuditCheckList(issueList)

                columns.push(
                    {title: "#", formatter: "rownum", frozen: true},
                    {title: "MC", field: "MACHINE", headerFilter:true, frozen: true, headerHozAlign: "center", formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    }, },
                    {title: "ITEM_CODE", field: "ITEM_CODE", headerFilter:true, headerHozAlign: "center", frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    },},
                    {title: "ITEM_NAME", field: "ITEM_NAME", headerFilter:true, headerHozAlign: "center", frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    },},
                );

                let auditCategory = self.GetAuditCategory();

                for(let i = 0; i < auditCategory.length; i++) {
                    let auditColumn = [];

                    for(let j = 0; j < auditList.length; j++) {
                        
                        if(auditCategory[i].a == auditList[j].CATEGORY) {
                            auditColumn.push({
                                title: auditList[j].AUDIT_CODE, 
                                field: auditList[j].AUDIT_CODE, 
                                headerSort: false,
                                headerHozAlign: "center",
                                headerFilterPlaceholder: "Select",
                                headerFilter: "list", 
                                titleFormatter: function(cell) {
                                    cell.getElement().style.backgroundColor = auditCategory[i].c;
                                    cell.getElement().style.color = "#ffffff";
                                    cell.getElement().style.padding = "5px";
                                    return cell.getColumn().getDefinition().title;
                                },
                                headerFilterParams: {
                                    values:{
                                        "":"-Select-",
                                        "O":"O",
                                        "X":"X",
                                    }
                                },
                                hozAlign: "center",
                                formatter: function(cell){
                                    let value = cell.getValue();

                                    if(value == "O"){
                                        cell.getElement().style.color = "#000000";
                                        cell.getElement().style.backgroundColor = "#ffffff";
                                    } else if(value == "X") {
                                        cell.getElement().style.color = "#ff0000";
                                        cell.getElement().style.backgroundColor = "#ffff00";
                                    } else {
                                        cell.getElement().style.color = "#000000";
                                        cell.getElement().style.backgroundColor = "#ffffff";
                                    }

                                    return "<b>"+value+"</b>";
                                }
                                
                            })
                        }
                    }
                    columns.push({
                        title: auditCategory[i].b,
                        headerHozAlign: "center",
                        columns: auditColumn,
                        titleFormatter: function(cell) {
                            cell.getElement().style.backgroundColor = auditCategory[i].c;
                            cell.getElement().style.color = "#ffffff";
                            cell.getElement().style.padding = "5px";
                            return cell.getColumn().getDefinition().title;
                        },
                    })
                }

                columns.push(
                    {title: "JUDGE", field: "JUDGE", headerFilter:true, hozAlign:"center", headerHozAlign: "center", formatter: function(cell){
                        let value = cell.getValue();

                        if(value == "PASSED"){
                            cell.getElement().style.color = "#000000";
                            cell.getElement().style.backgroundColor = "#6fc78d";
                            
                        } else if(value == "FAILED") {
                            cell.getElement().style.color = "#ffffff";
                            cell.getElement().style.backgroundColor = "#ff0000";
                        }

                        
                        return '<strong>'+value+'</strong>';
                    }},
                    {title: "SHIFT", field: "SHIFT", headerFilter:true, headerHozAlign: "center", },
                    {title: "DATE", field: "AUDIT_DATE", headerFilter:true, headerHozAlign: "center",},
                    {title: "TIME", field: "AUDIT_TIME", headerFilter:true, headerHozAlign: "center",},
                    {title: "AUDIT BY", field: "CREATED_BY", headerFilter:true, headerHozAlign: "center",},
                    {title: "IPQC", field: "IPQC", headerFilter:true, headerHozAlign: "center",},
                    {title: "TECHNICIAN", field: "TECHNICIAN", headerFilter:true, headerHozAlign: "center",},
                    {title: "LINE LEADER", field: "LINE_LEADER", headerFilter:true, headerHozAlign: "center",},
                );

                for(let i = 0; i < 2; i++) {
                    columns.push(
                        {title: "OPERATOR "+(i+1), field:"OPERATOR_"+(i+1)},
                    )
                }

                //generate tabulator
                self.tableDisplay = new Tabulator(tableElem,{
                    data: list,
                    pagination: "local",
                    paginationSize: 50,
                    paginationSizeSelector: [25, 50, 100],
                    page: 1,
                    // layout: "fitColumns",
                    layout:"fitDataFill",
                    columns: columns,
                    downloadConfig: {
                        // Enable CSV export
                        csv: true,
                        // Enable Excel export
                        excel: true,
                        // Enable JSON export
                        json: true,
                        // Enable PDF export
                        pdf: true,
                        columnHeaders:true, //do not include column headers in downloaded table
                        columnGroups:false, //do not include column groups in column headers for downloaded table
                        rowGroups:false, //do not include row groups in downloaded table W
                        columnCalcs:false, //do not include column calcs in downloaded table
                        dataTree:false, //do not include data tree in downloaded table
                    },
                });
                
                $("#spinner").hide();
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    ExportTable(){
        let filename = "Audit_" + main.GetPhilippinesDateTime()+".xlsx";
        this.tableDisplay.download("xlsx", filename, { sheetName: "Sheet1" });
    }

    DisplayAuditCheckList(list){
        let self = this;
        let auditCategory = this.GetAuditCategory();
        let auditList = JSON.parse(localStorage.getItem(this.lsAuditList));
        
        list.sort((a, b) => a.CATEGORY - b.CATEGORY);

        let last1 = "";
        const tableBody1 = document.querySelector("#tbodyAuditList1");

        tableBody1.innerHTML = ""; // Clear previous content

        for(let i = 0; i < list.length; i++) {
            const rowTr = document.createElement("tr");

            if(last1 != list[i].CATEGORY){
                let elemCategory = document.createElement("td");
                elemCategory.textContent = self.SetAuditCategory(parseInt(list[i].CATEGORY));
                elemCategory.rowSpan = auditList.filter(item => item.CATEGORY === list[i].CATEGORY).length;
                elemCategory.style.backgroundColor = auditCategory.find(item => item.a === parseInt(list[i].CATEGORY)).c;
                elemCategory.style.color = "#ffffff";
                rowTr.appendChild(elemCategory);

                last1 = list[i].CATEGORY;
            }

            const elemKeyCode = document.createElement("td");
            elemKeyCode.textContent = list[i].CODE;
            elemKeyCode.className = "border-black";
            rowTr.appendChild(elemKeyCode);

            const elemKeyDesc = document.createElement("td");
            elemKeyDesc.textContent = list[i].DESC;
            elemKeyDesc.className = "border-black";
            rowTr.appendChild(elemKeyDesc);

            const elemKeyIssues = document.createElement("td");
            elemKeyIssues.textContent = list[i].ISSUE;
            elemKeyIssues.className = "border-black";
            rowTr.appendChild(elemKeyIssues);

            tableBody1.appendChild(rowTr);

        }
        /* 
        let last2 = "";
        const tableBody2 = document.querySelector("#tbodyAuditList2");

        tableBody2.innerHTML = ""; // Clear previous content

        for(let i = 8; i < list.length; i++) {
            const rowTr = document.createElement("tr");

            if(last2 != list[i].CATEGORY){
                let elemCategory = document.createElement("td");
                elemCategory.textContent = self.SetAuditCategory(parseInt(list[i].CATEGORY));
                elemCategory.rowSpan = auditList.filter(item => item.CATEGORY === list[i].CATEGORY).length;
                elemCategory.style.backgroundColor = auditCategory.find(item => item.a === parseInt(list[i].CATEGORY)).c;
                elemCategory.style.color = "#ffffff";
                rowTr.appendChild(elemCategory);

                last2 = list[i].CATEGORY;
            }

            const elemKeyCode = document.createElement("td");
            elemKeyCode.textContent = list[i].CODE;
            elemKeyCode.className = "border-black";
            rowTr.appendChild(elemKeyCode);

            const elemKeyDesc = document.createElement("td");
            elemKeyDesc.textContent = list[i].DESC;
            elemKeyDesc.className = "border-black";
            rowTr.appendChild(elemKeyDesc);

            const elemKeyIssues = document.createElement("td");
            elemKeyIssues.textContent = list[i].ISSUE;
            elemKeyIssues.className = "border-black";
            rowTr.appendChild(elemKeyIssues);

            tableBody2.appendChild(rowTr);

        } */
    }
    GetPlanRecords(date, callback){
        let self = this;

        $.ajax({
            url: "php/controllers/Audit/PlanRecords.php",
            method: "POST",
            data: {
                date: date,
            },
            datatype: "json",
            success: function(response){
                console.log(response);
                self.DisplayChart1(response.data, date)
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });

    }
    DisplayChart1(list, date){
        let arrayComplete = [
            {
              value: 0,
              name: "S"
            },
            {
              value: 0,
              name: "M"
            },
            {
              value: 0,
              name: "L"
            },
            {
              value: 0,
              name: "V"
            },
        ];
        let arrayIncomplete = [
            {
              value: 0,
              name: "S"
            },
            {
              value: 0,
              name: "M"
            },
            {
              value: 0,
              name: "L"
            },
            {
              value: 0,
              name: "V"
            },
        ];

        for(let i = 0; i < list.length; i++) {
            let machineType = list[i].MACHINE[0];
            let judge = (list[i].JUDGE != 0) ? "COMPLETE" : "INCOMPLETE";

            if(judge == "COMPLETE") {

                arrayComplete.find(obj => obj.name === machineType).value += 1;
            } else if(judge == "INCOMPLETE") {
                arrayIncomplete.find(obj => obj.name === machineType).value += 1;
            }
            // arrayV.find(obj => obj.label === judge).value += 1;
        }

        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
                type: "stackedcolumn2d",
                renderAt: "chart",
                width: "100%",
                height: "460",
                dataFormat: "json",
                dataSource: {
                    chart: 
                    {
                        caption: "Audit Status as of "+date,
                        subcaption: "",
                        decimals: "1",
                        theme: "fusion",
                        showLegend: "0",
                        palettecolors: "#6fc78d, #ff0000",
                    },
                    categories: [
                        {
                          category: [
                            {
                              label: "SMALL"
                            },
                            {
                              label: "MEDIUM"
                            },
                            {
                              label: "LARGE"
                            },
                            {
                              label: "VERTICAL"
                            },
                          ]
                        }
                      ],
                      dataset: [
                        {
                          seriesname: "COMPLETE",
                          data: arrayComplete,
                        },
                        {
                          seriesname: "INCOMPLETE",
                          data: arrayIncomplete,
                        },
                    ]
                }
            }).render();
        });


        /* let arrayS = [
            {label: "COMPLETE", value: 0,},
            {label: "INCOMPLETE", value: 0,},
        ];
        let arrayM = [
            {label: "COMPLETE", value: 0,},
            {label: "INCOMPLETE", value: 0,},
        ];
        let arrayL = [
            {label: "COMPLETE", value: 0,},
            {label: "INCOMPLETE", value: 0,},
        ];
        let arrayV = [
            {label: "COMPLETE", value: 0,},
            {label: "INCOMPLETE", value: 0,},
        ];

        for(let i = 0; i < list.length; i++) {
            let machineType = list[i].MACHINE[0];
            let judge = (list[i].JUDGE != 0) ? "COMPLETE" : "INCOMPLETE";

            if(machineType == "S"){
                arrayS.find(obj => obj.label === judge).value += 1;
            } else if(machineType == "M"){
                arrayM.find(obj => obj.label === judge).value += 1;
            } else if(machineType == "L"){
                arrayL.find(obj => obj.label === judge).value += 1;
            } else if(machineType == "V"){
                arrayV.find(obj => obj.label === judge).value += 1;
            }
        }

        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
                type: "pie2d",
                renderAt: "chart1S",
                width: "100%",
                height: "260",
                dataFormat: "json",
                dataSource: {
                    chart: 
                    {
                        caption: "Audit Status of SMALL",
                        subcaption: "",
                        decimals: "1",
                        theme: "fusion",
                        showLegend: "0",
                        palettecolors: "#6fc78d, #ff0000",
                    },
                    data: arrayS
                }
            }).render();
        });
        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
                type: "pie2d",
                renderAt: "chart1M",
                width: "100%",
                height: "260",
                dataFormat: "json",
                dataSource: {
                    chart: 
                    {
                        caption: "Audit Status of MEDIUM",
                        subcaption: "",
                        decimals: "1",
                        theme: "fusion",
                        showLegend: "0",
                        palettecolors: "#6fc78d, #ff0000",
                    },
                    data: arrayM
                }
            }).render();
        });
        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
                type: "pie2d",
                renderAt: "chart1L",
                width: "100%",
                height: "260",
                dataFormat: "json",
                dataSource: {
                    chart: 
                    {
                        caption: "Audit Status of LARGE",
                        subcaption: "",
                        decimals: "1",
                        theme: "fusion",
                        showLegend: "0",
                        palettecolors: "#6fc78d, #ff0000",
                    },
                    data: arrayL
                }
            }).render();
        });
        FusionCharts.ready(function() {
            var myChart = new FusionCharts({
                type: "pie2d",
                renderAt: "chart1V",
                width: "100%",
                height: "260",
                dataFormat: "json",
                dataSource: {
                    chart: 
                    {
                        caption: "Audit Status of VERTICAL",
                        subcaption: "",
                        decimals: "1",
                        theme: "fusion",
                        showLegend: "0",
                        palettecolors: "#6fc78d, #ff0000",
                    },
                    data: arrayV
                }
            }).render();
        });
 */
    }

    //CRUD
    DisplayRecords(tableElem){

        $.ajax({
            url: "php/controllers/Audit/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){

                // console.log(response);
                //map response data to Tabulator format

                response.data.forEach(function (row) {
                    row.CATEGORY = main.SetAuditCategory(parseInt(row.CATEGORY));
                });

                var table = new Tabulator(tableElem, {
                    data: response.data,
                    pagination: "local",
                    paginationSize: 10,
                    paginationSizeSelector: [10, 25, 50, 100],
                    page: 1,
                    ajaxURL: "your_data_endpoint_here.json",
                    layout: "fitDataFill",
                    columns: [
                        {title: "ID", field: "RID", headerFilter: "input", visible: false},
                        {title: "ID", formatter: "rownum"},
                        {title: "DESCRIPTION", field: "AUDIT_DESC", headerFilter: "input"},
                        {title: "CODE", field: "AUDIT_CODE", headerFilter: "input"},
                        {title: "CATEGORY", field: "CATEGORY", headerFilter: "input"},
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
    PopulateAuditCategory(selectElem, id){
        let auditCategory = this.GetAuditCategory();
        let options = '<option value="">-Select-</option>';

        for(let i = 0; i < auditCategory.length; i++) {
            options += `<option value="${auditCategory[i].a}" ${id == auditCategory[i].a && id != undefined ? "selected" : ""}>${auditCategory[i].b}</option>`;
        }

        selectElem.html(options);
    }
    SetRecord(record){
        let self = this;

        $.ajax({
            url: "php/controllers/Audit/GetAuditRecord.php",
            method: "POST",
            data: {
                id: record.id,
            },
            datatype: "json",
            success: function(data){
                // console.log(data);
                record.modal.modal("show");
                record.desc.val(data.AUDIT_DESC);
                record.code.val(data.AUDIT_CODE);
                self.PopulateAuditCategory(record.category, data.CATEGORY);
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
        let code = record.code;
        let category = record.category;
        
        if(desc.val() == "" || code.val() == "" || category.val() == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the form.',
                icon: 'warning'
            })
        } else {
            $.ajax({
                url: "php/controllers/Audit/InsertAuditRecord.php",
                method: "POST",
                data: {
                    desc: desc.val(),
                    code: code.val(),
                    category: category.val(),
                },
                success: function(response){
                    // console.log(response);
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
                        record.code.val("");
                        self.PopulateAuditCategory(record.category)
    
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
        let code = record.code;
        let category = record.category;
        let id = record.id;
        
        if(desc.val() == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the form.',
                icon: 'warning'
            })
        } else {
            $.ajax({
                url: "php/controllers/Audit/UpdateAuditRecord.php",
                method: "POST",
                data: {
                    desc: desc.val(),
                    code: code.val(),
                    category: category.val(),
                    id: id.val(),
                },
                success: function(response){
                    // console.log(response);
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
                        record.code.val("");
                        self.PopulateAuditCategory(record.category)

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
                    url: 'php/controllers/Audit/RemoveAuditRecord.php', // Replace with your server-side script URL
                    type: 'POST',
                    data: {
                        id: record.id,
                    },
                    success: function(response) {
                        console.log(response);

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
