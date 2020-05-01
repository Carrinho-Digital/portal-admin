import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';

const ProdutoImageUpload = ({ onSave, onRemove, currentImages }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(currentImages || []);
  }, [currentImages])

  const onFileUploadChange = async (index, { target }) => {
    const newImage = {
      file: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    }
    const addedImages = [...images]
    addedImages[index] = newImage
    setImages(addedImages)
  }

  const onFileUploadRemove = async (imageIndex) => {
    if (!window.confirm('Deseja remover esta imagem?')) {
      return;
    }

    const addedImages = [...images]
    const imageToRemove = {...addedImages[imageIndex]};
    addedImages[imageIndex] = null
    setImages(addedImages)
    onRemove(imageToRemove)
  }

  const onFileUploadSave = async (imageIndex) => {
    const image = images[imageIndex]

    if (!image) {
      alert('Não é possível salvar a imagem')
      return
    }

    const formData = new FormData()
    formData.append('images', image.file)

    onSave(formData);
  }

  return (
    <>
      <h4>Imagens do produto</h4>
    <hr />
    <Row className="mb-4">
      <Col sm="6" md="3" xl="3">
        <div className="card">
          {images[0] ? (
            <img
              alt="preview second"
              src={images[0].preview}
              width="190"
              style={{ minWidth: '190px' }}
            />
          ) : (
            <div class="form-group files">
              <input
                type="file"
                class="form-control"
                onChange={(e) => onFileUploadChange(0, e)}
              />
            </div>
          )}
          <div className="card-body d-flex justify-content-center">
            <Button
              onClick={() => onFileUploadSave(0)}
              disabled={!images[0] || !images[0].file}
              className="mr-2"
              type="button"
              color="success"
            >
              Salvar
            </Button>

            <Button
              onClick={() => onFileUploadRemove(0)}
              disabled={!images[0]}
              className="mr-2"
              type="button"
              color="danger"
            >
              Remover
            </Button>
          </div>
        </div>
      </Col>
      <Col sm="6" md="3" xl="3">
        <div className="card">
          {images[1] ? (
            <img alt="preview second" src={images[1].preview} width="190" />
          ) : (
            <div class="form-group files">
              <input
                type="file"
                class="form-control"
                onChange={(e) => onFileUploadChange(1, e)}
              />
            </div>
          )}
          <div className="card-body d-flex justify-content-center">
            <Button
              onClick={() => onFileUploadSave(1)}
              disabled={!images[1] || !images[1].file}
              className="mr-2"
              type="button"
              color="success"
            >
              Salvar
            </Button>

            <Button
              onClick={() => onFileUploadRemove(1)}
              disabled={!images[1]}
              className="mr-2"
              type="button"
              color="danger"
            >
              Remover
            </Button>
          </div>
        </div>
      </Col>
    </Row>
    </>
  )
};

export default ProdutoImageUpload;