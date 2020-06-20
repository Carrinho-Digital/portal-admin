import React from 'react'
import moment from 'moment'
import { Col, Button } from 'reactstrap'
import { translate } from '../../util/translate'
import { Link } from 'react-router-dom'

export function formatDiaDaEntrega(diaDaEntrega = '') {
  if (!diaDaEntrega) return '--'

  const momentDiaDaEntrega = moment(diaDaEntrega)

  const translateDiaDaEntrega = translate(
    momentDiaDaEntrega.format('dddd'),
    'brazil',
  )

  return `${momentDiaDaEntrega.format('DD/MM/YYYY')} (${translateDiaDaEntrega})`
}

export function formatHorarioDaEntrega(de = '', ate = '') {
  if (!de || !ate) return '--'

  const momentDe = moment(de)
  const momentAte = moment(ate)

  return `das ${momentDe.format('HH:mm')} até às ${momentAte.format(
    'HH:mm',
  )} (${momentDe.format('Z')})`
}

export function formatHorarioFechamento(horarioFechamento = '') {
  if (!horarioFechamento) return '--'

  const momentHorarioFechamento = moment(horarioFechamento)

  return `${momentHorarioFechamento.format(
    'DD/MM/YYYY',
  )} às ${momentHorarioFechamento.format('HH:mm')}`
}

function NovaVenda({ venda, isRealtime }) {
  if (!venda) return <></>

  function headerStyle() {
    const background = !isRealtime ? 'bg-success' : 'bg-primary'
    return `card-header text-white ${background}`
  }

  function userPhones(phones) {
    if (!phones || phones.length < 1) {
      return '--'
    }

    return phones[0]
  }

  return (
    <Col sm="12" md="6" xl="6" className="mb-4">
      <div className="card">
        <div className={headerStyle()}>
          <b>Cliente</b>: {venda.user.name.toUpperCase()}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <span className="font-weight-bold d-block">Fechada em:</span>
              <p>{formatHorarioFechamento(venda.updatedAt)}</p>

              <span className="font-weight-bold d-block">Telefones:</span>
              <p>{userPhones(venda.user.phones)}</p>
            </div>

            <div>
              <span className="font-weight-bold d-block">Entrega:</span>
              <p>
                {venda.delivery ? venda.delivery.method.toUpperCase() : '--'}
              </p>

              <span className="font-weight-bold d-block">Pagamento:</span>
              <p>{venda.payment ? venda.payment.method.toUpperCase() : '--'}</p>
            </div>

            <div>
              <span className="font-weight-bold d-block">Dia da Entrega:</span>
              <p>
                {venda.availability
                  ? formatDiaDaEntrega(venda.availability.from)
                  : '--'}
              </p>

              <span className="font-weight-bold d-block">
                Horário da Entrega:
              </span>
              <p>
                {venda.availability
                  ? `${formatHorarioDaEntrega(
                      venda.availability.from,
                      venda.availability.to,
                    )}`
                  : '--'}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer text-white d-flex justify-content-between align-items-center">
          <span>
            <b>Produtos</b>: {venda.products.length}
          </span>

          <div>
            <Button
              tag={Link}
              to={`/vendas/detalhes/${venda._id}`}
              color="primary"
            >
              Detalhes
            </Button>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default NovaVenda
