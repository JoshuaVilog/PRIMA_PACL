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
                    }

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

    DisplayAuditCheckList(tableElem){
        let auditCategory = this.GetAuditCategory();
        let auditList = JSON.parse(localStorage.getItem(this.lsAuditList));
        let element = "";

        for(let j = 0; j < auditList.length; j++) {

            element += '<tr> <td>'+auditList[j].AUDIT_CODE+'</td> <td>'+auditList[j].AUDIT_DESC+'</td> </tr>';

        }

        tableElem.html(element);

        /* var table = new Tabulator(tableElem, {
            data: auditList,
            layout: "fitDataFill",
            columns: [
                {title: "ID", field: "RID", headerFilter: "input", visible: false,},
                {title: "CODE", field: "AUDIT_CODE", headerFilter: "input"},
                {title: "SUBJECT", field: "AUDIT_DESC", headerFilter: "input"},
            ],
        }); */
       /*  for(let i = 0; i < auditCategory.length; i++) {
            for(let j = 0; j < auditList.length; j++) {


            }
        }      */  
    }
}