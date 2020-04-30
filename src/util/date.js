import moment from 'moment';

export function addDays (date, days) {
  return moment(date)
    .add(days, 'days')
    .toDate()
}

/**
 * Retorna data e hora no formato local do navegador
 * @param value instância de Date
 */
export function toDateTimeString (value) {
  if (!value) {
    return 'Sem data'
  }
  const date = mapDate(value)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export function toDateString (value) {
  const date = mapDate(value)
  return `${date.toLocaleDateString()}`
}

/**
 * Retorna o valor de data no formato do input datetime-local
 * @param value instância de Date
 */
export function toDateTimeLocal (value) {
  if (!value) return null
  return moment(value).format('YYYY-MM-DDTHH:mm:ss')
}

/**
 * Retorna o valor de data no formato do input datetime-local
 * @param value instância de Date
 */
export function toDateFullString (value) {
  if (!value) return null
  moment.locale('pt-br')
  const data = moment(value)
  const retorno = `${data.format('dddd').toLowerCase()}, ${data.format(
    'DD'
  )} de ${data.format('MMMM')} de ${data.format('YYYY')}`

  return retorno
}

/**
 * Retorna o valor de data no formato do input date-local
 * @param value instância de Date
 */
export function toDateLocal (value) {
  if (!value) return null
  return moment(value).format('YYYY-MM-DD')
}

/**
 * Retorna a data com horário zerado
 * @param value data no formato string
 */
export function toServerLowDateTime (value) {
  return `${value} 00:00:00`
}

/**
 * Retorna a data com o horário máximo
 * @param value data no formato string
 */
export function toServerHighDateTime (value) {
  return `${value} 23:59:59`
}

/**
 * Recebe uma string e retorna a instancia em Date
 * correta
 * @param value string a ser convertida
 */
export function fromStringToDate (value){
  try {
    const values = value.split('-')
    if (values.length < 1) throw new Error('Não possui o formato YYYY-MM-DD')

    return new Date(
      Number(values[0]),
      Number(values[1]) - 1,
      Number(values[2])
    )
  } catch (e) {
    return null
  }
}

export class PeriodoAnaliseTypes {
  static Hoje = "Hoje"
  static Ontem = "Ontem"
  static Ontem = "Ontem"
  static SemanaAtual = "SemanaAtual"
  static SemanaAnterior = "SemanaAnterior"
  static MesAtual = "MesAtual"
  static MesAnterior = "MesAnterior"
  static AnoAtual = "AnoAtual"
  static AnoAnterior = "AnoAnterior"
}

/**
 * Retorna uma lista de KeyValuePair com os períodos
 */
export const getPeriodoAnaliseSelectList = () =>
  [
    {
      label: 'Hoje',
      value: PeriodoAnaliseTypes.Hoje
    },
    {
      label: 'Ontem',
      value: PeriodoAnaliseTypes.Ontem
    },
    {
      label: 'Semana atual',
      value: PeriodoAnaliseTypes.SemanaAtual
    },
    {
      label: 'Semana anterior',
      value: PeriodoAnaliseTypes.SemanaAnterior
    },
    {
      label: 'Mês atual',
      value: PeriodoAnaliseTypes.MesAtual
    },
    {
      label: 'Mês anterior',
      value: PeriodoAnaliseTypes.MesAnterior
    },
    {
      label: 'Ano atual',
      value: PeriodoAnaliseTypes.AnoAtual
    },
    {
      label: 'Ano anterior',
      value: PeriodoAnaliseTypes.AnoAnterior
    }
  ]

/**
 * Retorna um array com a data inicial e final, a partir do período solicitado
 * @param periodo valor do enum PeriodoAnaliseTypes
 */
export function filtrarPorPeriodosDeAnalise (periodo) {
  const dataArray = new Array()
  let dataInicial = new Date()
  let dataFinal = new Date()

  switch (periodo) {
    case PeriodoAnaliseTypes.Hoje:
      dataInicial = moment()
        .startOf('day')
        .toDate()
      dataFinal = moment()
        .endOf('day')
        .toDate()
      break
    case PeriodoAnaliseTypes.Ontem:
      dataInicial = moment()
        .startOf('day')
        .subtract(1, 'day')
        .toDate()
      dataFinal = moment()
        .endOf('day')
        .subtract(1, 'day')
        .toDate()
      break
    case PeriodoAnaliseTypes.SemanaAtual:
      dataInicial = moment()
        .startOf('week')
        .toDate()
      dataFinal = moment()
        .endOf('week')
        .toDate()
      break
    case PeriodoAnaliseTypes.SemanaAnterior:
      dataInicial = moment()
        .startOf('week')
        .subtract(1, 'week')
        .toDate()
      dataFinal = moment()
        .endOf('week')
        .subtract(1, 'week')
        .toDate()
      break
    case PeriodoAnaliseTypes.MesAtual:
      dataInicial = moment()
        .startOf('month')
        .toDate()
      dataFinal = moment()
        .endOf('month')
        .toDate()
      break
    case PeriodoAnaliseTypes.MesAnterior:
      dataInicial = moment()
        .startOf('month')
        .subtract(1, 'month')
        .toDate()
      dataFinal = moment()
        .endOf('month')
        .subtract(1, 'month')
        .toDate()
      break
    case PeriodoAnaliseTypes.AnoAtual:
      dataInicial = moment()
        .startOf('year')
        .toDate()
      dataFinal = moment()
        .endOf('year')
        .toDate()
      break
    case PeriodoAnaliseTypes.AnoAnterior:
      dataInicial = moment()
        .startOf('year')
        .subtract(1, 'year')
        .toDate()
      dataFinal = moment()
        .endOf('year')
        .subtract(1, 'year')
        .toDate()
      break
    default:
      break
  }

  dataArray.push(toDateTimeLocal(dataInicial))
  dataArray.push(toDateTimeLocal(dataFinal))

  return dataArray
}

/**
 * Retorna uma instância de data com o valor ou dispara exceção
 * @param data recebe um valor de data com vários tipos possíveis
 */
export function mapDate (data) {
  if (!data) {
    return null
  }
  let retorno

  if (typeof data === 'string') {
    retorno = new Date(data)
    // retorno.setMinutes(retorno.getMinutes() + retorno.getTimezoneOffset())
  } else {
    retorno = data
  }

  return retorno
}

export function getMonthsSelectModel () {
  return [
    {
      label: 'Janeiro',
      value: 1
    },
    {
      label: 'Fevereiro',
      value: 2
    },
    {
      label: 'Março',
      value: 3
    },
    {
      label: 'Abril',
      value: 4
    },
    {
      label: 'Maio',
      value: 5
    },
    {
      label: 'Junho',
      value: 6
    },
    {
      label: 'Julho',
      value: 7
    },
    {
      label: 'Agosto',
      value: 8
    },
    {
      label: 'Setembro',
      value: 9
    },
    {
      label: 'Outubro',
      value: 10
    },
    {
      label: 'Novembro',
      value: 11
    },
    {
      label: 'Dezembro',
      value: 12
    }
  ]
}

export function monthCaption (mes) {
  return getMonthsSelectModel().find(q => q.value == mes).label
}
