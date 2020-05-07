import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Col, Container, Row, BreadcrumbItem, Breadcrumb, Card, CardBody } from 'reactstrap';

import { getPromocaoById, updatePromocao } from '../../store/promocoes/actions';
import PromocaoForm from './PromocaoForm';
import { toDateTimeLocal, mapDate } from '../../util/date';

const PromocaoAlterar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();
    const promocaoAtual = useSelector(state => state.promocoes.promocaoAtual)

    React.useEffect(() => {
        dispatch(getPromocaoById(id))
    }, [id])

    const handleSubmit = async e => {
        await dispatch(updatePromocao(e))
        history.goBack()
    }

    if (!promocaoAtual) {
        return <Container>
            <Row>
                <Col>
                    <h1>Carregando...</h1>
                </Col>
            </Row>
        </Container>
    }
    
    const { startDate, endDate, product, ...rest } = promocaoAtual
    const payload = {
        ...rest,
        productId: product,
        promotionPerPrice: rest.discountInPrice > 0,
        promotionPerProduct: product != null,
        startDate: toDateTimeLocal(mapDate(startDate)),
        endDate: toDateTimeLocal(mapDate(endDate))
    }

    return <Container>
        <Row>
            <Col xl="12">
                <Breadcrumb>
                    <BreadcrumbItem tag={Link} to="/promocoes">
                        Promoções
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Alterar
                    </BreadcrumbItem>
                </Breadcrumb>
            </Col>
        </Row>
        <Card>
            <CardBody>
                <PromocaoForm initialValues={payload} onSubmit={handleSubmit} />
            </CardBody>
        </Card>

    </Container>
    return
}

export default PromocaoAlterar