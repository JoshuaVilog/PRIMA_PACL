<?php
require_once __DIR__ . '/../../models/AuditModel.php';

// header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = $_POST['id'];
    $shift = $_POST['shift'];
    $judge = $_POST['judge'];
    $lineLeader = $_POST['lineLeader'];
    $operator = $_POST['operator'];
    $auditList = $_POST['auditList'];
    $userCode = $_POST['userCode'];

    try {
        $record = new AuditModel();

        $record->id = $id;
        $record->shift = $shift;
        $record->judge = $judge;
        $record->lineLeader = $lineLeader;
        $record->operator = $operator;
        $record->auditList = $auditList;
        $record->userCode = $userCode;
        
        $isDuplicate = $record::CheckDuplicatePlanMasterlist($record);

        if($isDuplicate == true){

            echo json_encode(['status' => 'duplicate', 'message' => '']);
        } else if($isDuplicate == false){

            $record::UpdatePlanMasterlist($record);
            echo json_encode(['status' => 'success', 'message' => '']);
        }

    } catch (Exception $e){
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

}