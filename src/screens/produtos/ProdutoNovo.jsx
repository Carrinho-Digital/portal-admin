import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import ProdutoForm from './ProdutoForm'
import { insertProduto } from '../../store/produtos/actions'
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap'
import ProdutoImageUpload from './ProdutoImageUpload'
import { saveProductImage } from '../../store/produtos/actions'

const ProdutoNovo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (e) => {
    await dispatch(insertProduto(e))
    history.push('/produtos')
  }

  const handleOnProductImageSaved = async (formData) => {
    const savedProductImage = await dispatch(saveProductImage(formData))
    history.push(`/produtos/editar/${savedProductImage.data._id}`)
  }

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/produtos">
              Produtos
            </BreadcrumbItem>
            <BreadcrumbItem>Novo Produto</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <ProdutoImageUpload onSave={handleOnProductImageSaved} />
      <ProdutoForm initialValues={{ tags: [] }} onSubmit={handleSubmit} />
    </Container>
  )
}

export default ProdutoNovo
