import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { Col, Container, Row, BreadcrumbItem, Breadcrumb } from "reactstrap";

import {
  getProdutoById,
  updateProduto,
  removeProductImage,
  saveProductImage,
} from "../../store/produtos/actions";
import ProdutoForm from "./ProdutoForm";
import ProdutoImageUpload from "./ProdutoImageUpload";
import ProdutoListaPromocoes from "./ProdutoListaPromocoes";

const ProdutoAlterar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const produtoAtual = useSelector((state) => state.produtos.produtoAtual);

  React.useEffect(() => {
    const getProductToEdit = async () => {
      const productExists = await dispatch(getProdutoById(id));

      if (!productExists) {
        history.push("/produtos");
      }
    };

    getProductToEdit();
  }, [id, dispatch, history]);

  const handleSubmit = async (e) => {
    await dispatch(updateProduto(e));
    history.goBack();
  };

  if (!produtoAtual) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Carregando...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleOnProductImageSaved = async (formData) => {
    await dispatch(saveProductImage(formData, produtoAtual._id));
  };

  const handleOnProductImageRemove = async ({ preview }) => {
    await dispatch(removeProductImage(preview, produtoAtual._id));
  };

  const normalizeImages = (images = []) => {
    return images.map((image) => ({ preview: image, file: null }));
  };

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/produtos">
              Produtos
            </BreadcrumbItem>
            <BreadcrumbItem>Alterar</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col>
          <ProdutoImageUpload
            currentImages={normalizeImages(produtoAtual.images)}
            onSave={handleOnProductImageSaved}
            onRemove={handleOnProductImageRemove}
          />
        </Col>
        <Col>
          <ProdutoListaPromocoes id={id} />
        </Col>
      </Row>
      <ProdutoForm initialValues={produtoAtual} onSubmit={handleSubmit} />
    </Container>
  );
};

export default ProdutoAlterar;
