import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import PromocaoForm from './PromocaoForm';
import { insertPromocao } from '../../store/promocoes/actions';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody } from 'reactstrap';
import { filtrarPorPeriodosDeAnalise, PeriodoAnaliseTypes, toDateTimeLocal } from '../../util/date';

const PromocaoNovo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        await dispatch(insertPromocao(e))
        history.push("/promocoes")
    }

    const [startDate, endDate] = filtrarPorPeriodosDeAnalise(PeriodoAnaliseTypes.Hoje)

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
                <PromocaoForm initialValues={{tags:[], undefinedTime:false, startDate: toDateTimeLocal(startDate), endDate: toDateTimeLocal(endDate)}} onSubmit={handleSubmit} />
            </CardBody>
        </Card>

    </Container>
}

export default PromocaoNovo