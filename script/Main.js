
class Main {

    constructor(){
        this.systemLocalStorageTitle = "template";
        this.lsEmployeeList = this.systemLocalStorageTitle +"-employee-list";
        this.lsAuditList = this.systemLocalStorageTitle +"-audit-list";

    }

    GetCurrentDate(){
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        let day = currentDate.getDate().toString().padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;

        // Outputs something like: 2024-05-29
        return formattedDate;
    }

    GetPhilippinesDateTime(){
        const options = {
            timeZone: "Asia/Manila", 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit",
            hour12: false
        };
    
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const parts = formatter.formatToParts(new Date());
    
        // Format to YYYY-MM-DD HH:MM:SS
        const year = parts.find(p => p.type === "year").value;
        const month = parts.find(p => p.type === "month").value;
        const day = parts.find(p => p.type === "day").value;
        const hour = parts.find(p => p.type === "hour").value;
        const minute = parts.find(p => p.type === "minute").value;
        const second = parts.find(p => p.type === "second").value;
    
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    GetDateOnly(datetime){
        return datetime.split(' ')[0];
    }

    GetDurationMinutes(IN, OUT) {
        if (IN == null || OUT == null) {
            return 0;
        } else {
            // Parse the input strings into Date objects
            const inDate = new Date(IN);
            const outDate = new Date(OUT);
            
            // Calculate the difference in milliseconds
            const diffMs = outDate - inDate;
            
            // Convert milliseconds to minutes (with decimals)
            const diffMinutes = diffMs / 60000; // 1 minute = 60,000 ms
            
            return diffMinutes.toFixed(2);
        }
    }
    //================================================================================//
    GetShiftRecord(){
        let list = [
            {a:1, b:"DAYSHIFT", c:"DS"},
            {a:1, b:"NIGHTSHIFT", c:"NS"},
        ];

        return list;
    }
    GetJudgeRecord(){
        let list = [
            {a:1, b:"PASSED"},
            {a:2, b:"FAILED"},
        ];

        return list;
    }
    GetAuditCategory(){
        let list = [
            {a:1, b:"PRODUCTION"},
            {a:2, b:"TPM"},
            {a:3, b:"TECHNICIAN"},
            {a:4, b:"MATERIAL HANDLER"},
            {a:5, b:"PQC"},
            {a:6, b:"OPERATOR"},
        ];

        return list;
    }

    GetEmployeeRecords(){
        let self = this;
        $.ajax({
            url: "php/controllers/Employee/EmployeeRecords.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsEmployeeList, JSON.stringify(list));
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    GetAuditRecords(){
        let self = this;
        $.ajax({
            url: "php/controllers/Audit/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(list){

                localStorage.setItem(self.lsAuditList, JSON.stringify(list.data));
                // console.log(list.data);
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    
    SetEmployeeNameByID(id){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        
        if(id == 1){
            return "SYSTEM ADMIN"
        } else {
            let result = list.find(element => element.EMPLOYEE_ID === id);

            return result ? result.EMPLOYEE_NAME: "";
        }
    }
    SetEmployeeNameByRFID(id){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        
        if(id == "ADMIN"){
            return "SYSTEM ADMIN";
        } else {
            let result = list.find(element => element.RFID === id);

            return result ? result.F_NAME + " " + result.L_NAME: "";
        }
    }

    SetAudit(id){
        let list = JSON.parse(localStorage.getItem(this.lsAuditList));
        let result = list.find(element => element.a === id);

        return result ? result.b: "";
    }
    SetShift(id){
        let list = this.GetShiftRecord();
        let result = list.find(element => element.a === id);

        return result ? result.b: "";
    }
    SetJudge(id){
        let list = this.GetJudgeRecord();
        let result = list.find(element => element.a === id);

        return result ? result.b: "";
    }

    

}


let main = new Main();

main.GetEmployeeRecords();
main.GetAuditRecords();
