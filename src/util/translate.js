const dictonary = {
  brazil: {
    'sunday': 'domingo',
    'monday': 'segunda-feira',
    'tuesday': 'terça-feira',
    'wednesday': 'quarta-feira',
    'thursday': 'quinta-feira',
    'friday': 'sexta-feira',
    'saturday': 'sabado',
    'january': 'janeiro',
    'february': 'fevereiro',
    'march': 'março',
    'april': 'abril',
    'may': 'maio',
    'june': 'junho',
    'july': 'julho',
    'august': 'agosto',
    'september': 'setembro',
    'october': 'outubro',
    'november': 'novembro',
    'december': 'dezembro',
  },
}


export function translate(englishTo='', idiom='brazil') {
  const lowercaseEnglishTo = englishTo.toLowerCase();
  return dictonary[idiom][lowercaseEnglishTo]
}