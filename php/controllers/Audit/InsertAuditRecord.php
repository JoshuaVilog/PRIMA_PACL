<?php
require_once __DIR__ . '/../../models/AuditModel.php';

// header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $desc = $_POST['desc'];
    $code = $_POST['code'];
    $category = $_POST['category'];

    try {
        $record = new AuditModel();

        $record->desc = $desc;
        $record->code = $code;
        $record->category = $category;
        
        $isDuplicate = $record::CheckDuplicateAudit($record);

        if($isDuplicate == true){

            echo json_encode(['status' => 'duplicate', 'message' => '']);
        } else if($isDuplicate == false){

            $record::InsertAuditRecord($record);
            echo json_encode(['status' => 'success', 'message' => '']);
        }

    } catch (Exception $e){
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

}