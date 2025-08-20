<?php
require_once __DIR__ . '/../../models/AuditModel.php';

header('Content-Type: application/json');

$jobOrderNo = $_POST['jobOrderNo'];

try {
    $records = AuditModel::AuditMasterlistRecordsByJobOrder($jobOrderNo);
    echo json_encode(['status' => 'success', 'data' => $records]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
