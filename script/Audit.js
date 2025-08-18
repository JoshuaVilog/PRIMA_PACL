class Audit extends Main{

    constructor() {
        super()
        this.tableDisplay = null;
    }

    GetAuditMasterlistByDate(tableElem, date) {
        let self = this;
        let auditList = JSON.parse(localStorage.getItem(self.lsAuditList));

        $.ajax({
            url: "php/controllers/Audit/AuditMasterlistRecords.php",
            method: "POST",
            data: {
                date: date,
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
                });

                columns.push(
                    {title: "#", formatter: "rownum"},
                    {title: "MC", field: "MACHINE", headerFilter:true, frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    }, },
                    {title: "ITEM_CODE", field: "ITEM_CODE", headerFilter:true, frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    },},
                    {title: "ITEM_NAME", field: "ITEM_NAME", headerFilter:true, frozen: true, formatter: function(cell){
                        cell.getElement().style.backgroundColor = "#ffffff";
                        return cell.getValue();
                    },},
                );

                for(let i = 0; i < auditList.length; i++) {
                    columns.push({
                        title: auditList[i].AUDIT_CODE,
                        field: auditList[i].AUDIT_CODE, 
                        headerSort: false,
                    },)
                }

                columns.push(
                    {title: "JUDGE", field: "JUDGE", headerFilter:true, formatter: function(cell){
                        let value = cell.getValue();

                        if(value == "PASSED"){
                            cell.getElement().style.backgroundColor = "#08A04B";
                        } else if(value == "FAILED") {
                            cell.getElement().style.backgroundColor = "#F75D59";
                        }

                        cell.getElement().style.color = "#F5F5F5";
                        return '<span>'+value+'</span>';
                    }},
                    {title: "SHIFT", field: "SHIFT", headerFilter:true,},
                    {title: "DATETIME", field: "CREATED_AT", headerFilter:true,},
                    {title: "AUDIT BY", field: "CREATED_BY", headerFilter:true,},
                    {title: "IPQC", field: "IPQC", headerFilter:true,},
                    {title: "TECHNICIAN", field: "TECHNICIAN", headerFilter:true,},
                    {title: "LINE LEADER", field: "LINE_LEADER", headerFilter:true,},
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
                    paginationSize: 25,
                    paginationSizeSelector: [25, 50, 100],
                    page: 1,
                    // layout: "fitColumns",
                    layout:"fitDataFill",
                    columns: columns,
                });
                
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    ExportTable(){

        this.tableDisplay.download("xlsx", "Audit.xlsx", { sheetName: "Sheet1" });
    }
}