<?php
require_once __DIR__ . '/../../models/AuditModel.php';

header('Content-Type: application/json');

$date = $_POST['date'];

try {
    $AuditRecords = AuditModel::AuditMasterlistRecords();
    $PlanRecords = AuditModel::PlanMasterlistRecords($date);

    $records = [];

    foreach ($PlanRecords as $plan){

        $newRow = array();

        $auditRID = 0;
        $auditShift = 0;
        $auditJudge = 0;
        $auditCreatedBy = 0;
        $auditCreatedAt = "";

        foreach($AuditRecords as $audit){
            if($plan['JOB_ORDER_NO'] == $audit['JOB_ORDER_NO']){

                $auditRID = $audit['RID'];
                $auditShift = $audit['SHIFT'];
                $auditJudge = $audit['JUDGE'];
                $auditCreatedBy = $audit['CREATED_BY'];
                $auditCreatedAt = $audit['CREATED_AT'];
                break;

            }    
        }

        $newRow['id'] = (int)$plan['JOB_ORDER_NO'];
        $newRow['JOB_ORDER_NO'] = $plan['JOB_ORDER_NO'];
        $newRow['ITEM_CODE'] = $plan['ITEM_CODE'];
        $newRow['ITEM_NAME'] = $plan['ITEM_NAME']; 
        // $newRow['MODEL'] = $plan['MODEL']; 
        $newRow['MODEL'] = ""; 
        $newRow['DATE'] = $plan['DATE_']; 
        $newRow['MACHINE'] = $plan['MACHINE_CODE'];
        $newRow['CUSTOMER_NAME'] = $plan['CUSTOMER_NAME'];
        $newRow['SHIFT'] = $auditShift;
        $newRow['JUDGE'] = $auditJudge;
        $newRow['CREATED_AT'] = $auditCreatedAt;
        $newRow['CREATED_BY'] = $auditCreatedBy;
        $newRow['AUDIT_RID'] = $auditRID;

        $records[] = $newRow;

    }

    echo json_encode(['status' => 'success', 'data' => $records]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
