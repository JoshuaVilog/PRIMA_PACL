<?php
require_once __DIR__ . '/../../models/AuditModel.php';

header('Content-Type: application/json');

$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

try {
    $records = AuditModel::AuditMasterlistRecordsByDate($startDate, $endDate);
    echo json_encode(['status' => 'success', 'data' => $records]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
