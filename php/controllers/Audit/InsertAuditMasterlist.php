<?php
require_once __DIR__ . '/../../models/AuditModel.php';

// header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // $data = json_decode(file_get_contents("php://input"), true);

    $machine = $_POST['machine'];
    $jobOrderNo = $_POST['jobOrderNo'];
    $itemCode = $_POST['itemCode'];
    $itemName = $_POST['itemName'];
    $model = $_POST['model'];
    $date = $_POST['date'];
    $shift = $_POST['shift'];
    $judge = $_POST['judge'];
    $lineLeader = $_POST['lineLeader'];
    $operator = $_POST['operator'];
    $auditList = $_POST['auditList'];
    $userCode = $_POST['userCode'];
    $id = $_POST['id'];

    try {
        $record = new AuditModel();

        $record->machine = $machine;
        $record->jobOrderNo = $jobOrderNo;
        $record->itemCode = $itemCode;
        $record->itemName = $itemName;
        $record->model = $model;
        $record->date = $date;
        $record->shift = $shift;
        $record->judge = $judge;
        $record->lineLeader = $lineLeader;
        $record->operator = $operator;
        $record->auditList = $auditList;
        $record->userCode = $userCode;
        $record->id = $id;
        
        $isDuplicate = $record::CheckDuplicatePlanMasterlist($record);

        if($isDuplicate == true){

            echo json_encode(['status' => 'duplicate', 'message' => '']);
        } else if($isDuplicate == false){

            $record::InsertPlanMasterlist($record);
            echo json_encode(['status' => 'success', 'message' => '']);
        }

    } catch (Exception $e){
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

}