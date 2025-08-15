<div id="modalEdit" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit Record</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Description:</label>
                    <input type="text" class="form-control" id="txtEditDesc" oninput="this.value = this.value.toUpperCase()">
                </div>
            </div>
            <input type="hidden" id="hiddenID">
            <div class="modal-footer">
                <button class="btn btn-primary" id="btnUpdate">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>