<?php
require_once __DIR__ . '/../../config/db.php';

class RecordModel {
    
    public static function DisplayRecords() {
        $db = DB::connection1();
        $sql = "SELECT * FROM record WHERE COALESCE(DELETED_AT, '') = '' ORDER BY RID DESC";
        $result = $db->query($sql);

        $records = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
        }

        return $records;
    }

    public static function GetRecord($id){
        $db = DB::connection1();

        $sql = "SELECT * FROM record WHERE RID = $id";
        $result = mysqli_query($db,$sql);

        if(mysqli_num_rows($result) == 0){
            return null;
        } else {
            $row = mysqli_fetch_assoc($result);

            return $row;
        }
    }
    public static function CheckDuplicate($desc){
        $db = DB::connection1();

        $sql = "SELECT RID FROM record WHERE CONCAT(DESCRIPTION, COALESCE(DELETED_AT, '')) = '$desc' ";
        $result = mysqli_query($db,$sql);

        if(mysqli_num_rows($result) == 0){
            return false;
        } else {
            return true;
        }
    }

    public static function InsertRecord($records){
        $db = DB::connection1();
        $userCode = $_SESSION['USER_CODE'];

        $desc = $db->real_escape_string($records->desc);

        $sql = "INSERT INTO `record`(
            `RID`,
            `DESCRIPTION`,
            `CREATED_BY`
        )
        VALUES(
            DEFAULT,
            '$desc',
            '$userCode'
        )";
        return $db->query($sql);
    }
    public static function UpdateRecord($records){
        $db = DB::connection1();
        $userCode = $_SESSION['USER_CODE'];

        $desc = $db->real_escape_string($records->desc);
        $id = $records->id;

        $sql = "UPDATE
            `record`
        SET
            `DESCRIPTION` = '$desc',
            `UPDATED_BY` = '$userCode'
        WHERE
            `RID` = $id";
        return $db->query($sql);
    }
    public static function RemoveRecord($id){
        $db = DB::connection1();
        $userCode = $_SESSION['USER_CODE'];

        date_default_timezone_set('Asia/Manila');
        $createdAt = date("Y-m-d H:i:s");

        $sql = "UPDATE
            `record`
        SET
            `DELETED_AT` = '$createdAt',
            `DELETED_BY` = '$userCode'
        WHERE
            `RID` = $id";
        
        return $db->query($sql);


    }


}

?>