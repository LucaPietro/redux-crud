import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { fetchProducts } from '../../sagas/actions';

import InsertProducts from '../EditModal';
import DeleteDialog from '../DeleteDialog';

const useStyles = makeStyles((theme) => ({
  productDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: '10px',
  },
}));

const ProductTable = () => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [productData, setProductData] = useState(null);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    dispatch(fetchProducts(token, user_id));
  }, [dispatch, token, user_id, modal, dialog]);

  const { productList } = state.productData;

  const setModalEditCallback = useCallback(
    (product = null) => () => {
      setProductData(product);
      setModal(true);
    },
    []
  );

  const setDialogEditCallback = useCallback(
    (product = null) => () => {
      setProductData(product);
      setDialog(true);
    },
    []
  );

  return (
    <div className={classes.productDiv}>
      <div className={classes.header}>
        <h1>Lista de Produtos: </h1>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={setModalEditCallback()}
        >
          Cadastrar Produto
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Valor Unitário</TableCell>
              <TableCell align="right">Valor Total</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.amount}</TableCell>
                <TableCell align="right">
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.price
                  )}
                </TableCell>
                <TableCell align="right">
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.price * product.amount
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={setModalEditCallback(product)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={setDialogEditCallback(product)}>
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InsertProducts
        modal={modal}
        setModal={setModal}
        data={productData}
        setData={setProductData}
      />
      <DeleteDialog
        dialog={dialog}
        setDialog={setDialog}
        data={productData}
        setData={setProductData}
      />
    </div>
  );
};

export default ProductTable;
