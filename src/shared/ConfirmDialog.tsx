import React from 'react';

import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

type ConfirmDialogProps = {
    open: boolean,
    handleClose(): void,
    handleDelete(): void
}

function ConfirmDialog({ open, handleClose, handleDelete }: ConfirmDialogProps) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            aria-labelledby="confirm-delete-dialog"
            open={open}
        >
            <DialogTitle
                id="confirm-delete-dialog"
            >
                Are you sure you want to delete this record?
            </DialogTitle>
            <DialogActions>
                <Button autoFocus variant="contained" color="secondary" onClick={handleDelete}>
                    Yes
          </Button>
                <Button color="primary" variant="outlined" onClick={handleClose}>
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;

