import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../services/api';

const DeleteDialog = ({ dialog, setDialog, data, setData }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const setCloseDialogCallback = useCallback(() => {
    setData(null);
    setDialog(!dialog);
  }, [dialog]);

  async function handleDelete(e) {
    e.preventDefault();

    try {
      await api.delete(`/products/${data.id}`, {
        headers: {
          token,
        },
      });

      dispatch({
        type: 'DELETE_PRODUCT',
        id: data.id,
      });

      setCloseDialogCallback();
    } catch (err) {
      alert('Erro ao deletar o produto, tente novamente.');
    }
  }

  return (
    <Dialog
      open={dialog}
      onClose={setCloseDialogCallback}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {data && <span>Deletar {data?.title} ? </span>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja deletar o produto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCloseDialogCallback} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="secondary" autoFocus>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
