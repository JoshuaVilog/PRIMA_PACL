<?php
require_once __DIR__ . '/../../models/UserModel.php';

header('Content-Type: application/json');

try {
    $users = UserModel::getAllUsers();
    echo json_encode(['status' => 'success', 'data' => $users]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
