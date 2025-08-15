<?php
require_once __DIR__ . '/../../models/EmployeeModel.php';

header('Content-Type: application/json');

try {
    $records = EmployeeModel::DisplayEmployeeRecords();
    echo json_encode(['status' => 'success', 'data' => $records]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
