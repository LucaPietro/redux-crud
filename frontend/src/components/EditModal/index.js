import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    margin: '10px',
    width: '80%',
  },
}));

const InsertProducts = ({ modal, setModal, data, setData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  const setCloseModalCallback = useCallback(() => {
    setData(null);
    setModal(!modal);
  }, [modal]);

  async function onFormSubmit(e) {
    e.preventDefault();

    const formattedPrice = e.target.price.value.split('.').join('').replace(/,/g, '.');

    const newData = {
      title: e.target.title.value,
      description: e.target.description.value,
      amount: Math.floor(e.target.amount.value),
      price: formattedPrice,
    };

    try {
      if (e.target.amount.value.length === 0) {
        throw new Error('Quantidade precisa ser um número inteiro.');
      }

      if (data) {
        newData.id = data.id;
        await api.put(`/products/${data.id}`, newData, {
          headers: {
            token,
          },
        });
        dispatch({
          type: 'UPDATE_PRODUCT',
          newData,
        });
      } else {
        await api.post(`/products/${user_id}`, newData, {
          headers: {
            token,
          },
        });

        dispatch({
          type: 'CREATE_PRODUCT',
          newData,
        });
      }
      setCloseModalCallback();
    } catch (err) {
      alert(err);
    }
  }

  const inputProps = { inputmode: 'numeric', pattern: '[0-9]*' };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modal}
      onClose={setCloseModalCallback}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modal}>
        <div className={classes.paper}>
          <h2 className={classes.item} id="transition-modal-title">
            {data && modal && <span>Editar {data?.title}</span>}
            {!data && modal && <span>Cadastrar Produto</span>}
          </h2>
          <form className={classes.form} onSubmit={onFormSubmit} noValidate autoComplete="off">
            <TextField
              className={classes.item}
              id="title"
              type="text"
              name="title"
              label="Nome"
              defaultValue={data?.title}
              variant="outlined"
            />
            <TextField
              className={classes.item}
              id="description"
              type="text"
              name="description"
              label="Descrição"
              defaultValue={data?.description}
              variant="outlined"
            />
            <TextField
              className={classes.item}
              id="amount"
              type="number"
              min="1"
              step="1"
              name="amount"
              label="Quantidade"
              defaultValue={data?.amount}
              inputProps={inputProps}
              variant="outlined"
            />
            <CurrencyTextField
              className={classes.item}
              id="price"
              type="text"
              name="price"
              currencySymbol="R$"
              outputFormat="number"
              decimalCharacter=","
              digitGroupSeparator="."
              label="Valor"
              defaultValue={data?.price}
              variant="outlined"
            />
            <Button
              className={classes.item}
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >
              Salvar
            </Button>
          </form>

          <p id="transition-modal-description"></p>
        </div>
      </Fade>
    </Modal>
  );
};

export default InsertProducts;
