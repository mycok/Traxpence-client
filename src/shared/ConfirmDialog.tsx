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
            fullWidth
            aria-labelledby="confirm-delete-dialog"
            open={open}
        >
            <DialogTitle
                id="confirm-delete-dialog"
            >
                Are you sure you want to delete this record?
            </DialogTitle>
            <DialogActions>
                <Button autoFocus variant="outlined" color="primary" onClick={handleDelete}>
                    Yes
          </Button>
                <Button color="secondary" onClick={handleClose}>
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;

