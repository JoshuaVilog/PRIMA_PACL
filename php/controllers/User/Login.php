<?php
require_once __DIR__ . '/../../models/EmployeeModel.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $users = EmployeeModel::CheckAccount($username, $password);
        
        if($users == null){

            echo json_encode(['status' => 'incorrect', 'data' => "incorrect"]);
        } else {
            $status = $users['ACTIVE'];
            $userID = $users['RFID'];
            $userFLname = $users['EMPLOYEE_NAME'];
            $userRole = $users['ROLE'];

            if($status == "2"){
                echo json_encode(['status' => 'inactive', 'data' => "inactive"]);
            } else {

                $_SESSION['USER_CODE'] = $userID;
                $_SESSION['USER_FULLNAME'] = $userFLname;
                $_SESSION['USER_ROLE'] = $userRole;

                echo json_encode(['status' => 'success', 'data' => $users]);

                /* 
                if($userRole == "1"){
                    $_SESSION['USER_CODE'] = $userID;
                    $_SESSION['USER_FULLNAME'] = $userFLname;
                    $_SESSION['USER_ROLE'] = $userRole;
    
                    echo json_encode(['status' => 'success', 'data' => $users]);
                } else {
                    echo json_encode(['status' => 'inactive', 'data' => "inactive"]);
                }
                 */
            }
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

?>
