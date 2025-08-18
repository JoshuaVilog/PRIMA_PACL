<?php
require_once __DIR__ . '/../../models/AuditModel.php';

header('Content-Type: application/json');

$date = $_POST['date'];

try {
    $records = AuditModel::AuditMasterlistRecordsByDate($date);
    echo json_encode(['status' => 'success', 'data' => $records]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
