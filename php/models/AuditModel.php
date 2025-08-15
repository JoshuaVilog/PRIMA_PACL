<?php
require_once __DIR__ . '/../../config/db.php';

class AuditModel {
    
    public static function DisplayRecords() {
        $db = DB::connectionPACL();
        $sql = "SELECT * FROM list_audit WHERE COALESCE(DELETED_AT, '') = '' ORDER BY RID DESC";
        $result = $db->query($sql);

        $records = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
        }

        return $records;
    }
    public static function AuditMasterlistRecords() {
        $db = DB::connectionPACL();
        $sql = "SELECT `RID`, `JOB_ORDER_NO`, `MACHINE`, `ITEM_CODE`, `ITEM_NAME`, `MODEL`, `CUSTOMER`, `SHIFT`, `LINE_LEADER`, `OPERATOR`, `IPQC`, `TECHNICIAN`, `JUDGE`, `AUDIT_CHECKLIST`, `CREATED_AT`, `CREATED_BY` FROM pacl_masterlist ORDER BY RID DESC";
        $result = $db->query($sql);

        $records = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
        }

        return $records;
    }
    public static function PlanMasterlistRecords($date) {
        $db = DB::connectionMES();
        $sql = "SELECT `JOB_ORDER_NO`,`DATE_`, `ITEM_CODE`, `ITEM_NAME`, `MACHINE_CODE`, `CUSTOMER_NAME` FROM masterdatabase.mis_prod_plan_dl WHERE `DATE_` = '$date' ORDER BY ID DESC";
        $result = $db->query($sql);

        $records = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
        }

        return $records;
    }
    public static function CheckDuplicatePlanMasterlist($record){
        $db = DB::connectionPACL();

        $jobOrderNo = $db->real_escape_string($record->jobOrderNo);
        $shift = $db->real_escape_string($record->shift);
        $id = $db->real_escape_string($record->id);

        $find = $jobOrderNo . '-' . $shift;
        $sql = "SELECT RID FROM pacl_masterlist WHERE CONCAT(JOB_ORDER_NO,'-', SHIFT, COALESCE(DELETED_AT, '')) = '$find' AND RID != $id";
        $result = mysqli_query($db,$sql);

        if(mysqli_num_rows($result) == 0){
            return false;
        } else {
            return true;
        }
    }
    
    public static function InsertPlanMasterlist($records){
        $db = DB::connectionPACL();
        // $userCode = $_SESSION['USER_CODE'];

        $machine = $db->real_escape_string($records->machine);
        $jobOrderNo = $db->real_escape_string($records->jobOrderNo);
        $itemCode = $db->real_escape_string($records->itemCode);
        $itemName = $db->real_escape_string($records->itemName);
        $model = $db->real_escape_string($records->model);
        $date = $db->real_escape_string($records->date);
        $shift = $db->real_escape_string($records->shift);
        $judge = $db->real_escape_string($records->judge);
        $lineLeader = $db->real_escape_string($records->lineLeader);
        $ipqc = $db->real_escape_string($records->ipqc);
        $technician = $db->real_escape_string($records->technician);
        $operator = $db->real_escape_string($records->operator);
        $auditList = $db->real_escape_string($records->auditList);
        $userCode = $db->real_escape_string($records->userCode);

        $sql = "INSERT INTO `pacl_masterlist`(
            `RID`,
            `JOB_ORDER_NO`,
            `DATE`,
            `MACHINE`,
            `ITEM_CODE`,
            `ITEM_NAME`,
            `MODEL`,
            `CUSTOMER`,
            `SHIFT`,
            `LINE_LEADER`,
            `IPQC`,
            `TECHNICIAN`,
            `OPERATOR`,
            `JUDGE`,
            `AUDIT_CHECKLIST`,
            `CREATED_BY`
        )
        VALUES(
            DEFAULT,
            '$jobOrderNo',
            '$date',
            '$machine',
            '$itemCode',
            '$itemName',
            '$model',
            '',
            '$shift',
            '$lineLeader',
            '$ipqc',
            '$technician',
            '$operator',
            '$judge',
            '$auditList',
            '$userCode'
        )";
        return $db->query($sql);
    }
    public static function UpdatePlanMasterlist($records){
        $db = DB::connectionPACL();
        // $userCode = $_SESSION['USER_CODE'];
        
        $id = $db->real_escape_string($records->id);
        $shift = $db->real_escape_string($records->shift);
        $judge = $db->real_escape_string($records->judge);
        $lineLeader = $db->real_escape_string($records->lineLeader);
        $operator = $db->real_escape_string($records->operator);
        $auditList = $db->real_escape_string($records->auditList);
        $userCode = $db->real_escape_string($records->userCode);

        $sql = "UPDATE
            `pacl_masterlist`
        SET
            `SHIFT` = '$shift',
            `LINE_LEADER` = '$lineLeader',
            `OPERATOR` = '$operator',
            `JUDGE` = '$judge',
            `AUDIT_CHECKLIST` = '$auditList',
            `UPDATED_BY` = '$userCode',
        WHERE
            `RID` = $id";
        return $db->query($sql);
    }

    /*
    public static function RemoveRecord($id){
        $db = DB::connectionPACL();
        // $userCode = $_SESSION['USER_CODE'];

        date_default_timezone_set('Asia/Manila');
        $createdAt = date("Y-m-d H:i:s");

        $sql = "UPDATE
            `list_audit`
        SET
            `DELETED_AT` = '$createdAt'
        WHERE
            `RID` = $id";
        
        return $db->query($sql);


    }

 */
}

?>