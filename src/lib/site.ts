/**
 * Single source of truth for every piece of copy on the page.
 * Sections read from here so the client can revise wording without touching JSX.
 */

/** WhatsApp number in international format, digits only. */
export const WHATSAPP_NUMBER = '5511000000000'

export const SITE = {
  brand: 'Jefferson Filipim',
  tagline: 'Fisioterapia com Propósito',
  cta: 'Agendar uma avaliação domiciliar',
  nav: [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre mim', href: '#sobre' },
    { label: 'Atendimento', href: '#atendimento' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Dúvidas', href: '#faq' },
  ],
  hero: {
    eyebrow:
      'Ajudo seu pai ou sua mãe a recuperar a autonomia para continuar vivendo com segurança, dignidade e qualidade de vida, no conforto de casa.',
    title: 'A melhor idade continua sendo boa quando existe autonomia para viver.',
    subtitle:
      'A fisioterapia domiciliar vai muito além de aliviar dores. Ela ajuda quem você ama a voltar a realizar as pequenas atividades que fazem toda a diferença no dia a dia.',
    photo: 'Jefferson conversando com um idoso e um familiar na sala de casa, em ambiente acolhedor.',
  },
  decline: {
    eyebrow: 'Quando a independência começa a desaparecer',
    title: 'Talvez tudo tenha começado de forma discreta.',
    steps: [
      'Primeiro veio a dificuldade para levantar da cadeira.',
      'Depois o medo de caminhar sozinho.',
      'Logo subir escadas deixou de ser uma opção.',
      'Tomar banho passou a exigir ajuda.',
      'As caminhadas diminuíram.',
      'As visitas aos amigos ficaram mais raras.',
      'E, sem perceber, a rotina da família inteira começou a mudar.',
    ],
    quotesLead: 'Você começa a ouvir frases como:',
    quotes: ['"Tenho medo de cair."', '"Hoje prefiro ficar sentado."', '"Não quero dar trabalho para vocês."'],
    close:
      'É nesse momento que muitos acreditam que "é a idade". Mas, na maioria das vezes, o problema não é envelhecer — é perder movimento, força e confiança sem receber o cuidado adequado.',
    photo: 'Um filho observando o pai com dificuldade para levantar do sofá.',
  },
  story: {
    eyebrow: 'Um objetivo. Um fisioterapeuta. Do início ao fim.',
    title: 'Quando comecei minha carreira, atendi uma paciente de 97 anos.',
    body: ['Hoje ela já passou dos 100.', 'Foi com ela que aprendi a maior lição da minha profissão.'],
    role: 'Fisioterapeuta especialista em Geriatria',
    crefito: 'CREFITO-3: 371949-F',
  },
  philosophy: {
    eyebrow: 'Mais do que tratar a dor',
    title: 'Tratar o que ainda faz a vida valer a pena.',
    body: [
      'A fisioterapia não existe para tratar um joelho. Nem um quadril. Nem uma coluna. Ela existe para devolver aquilo que faz sentido para cada pessoa.',
      'Já acompanhei uma paciente em tratamento contra o câncer cujo maior sonho não era eliminar a dor. Ela queria subir os quinze degraus da própria casa para voltar a tomar banho no chuveiro. Esse se tornou nosso objetivo. Depois de semanas de trabalho, ela conseguiu.',
    ],
    question: 'O que você quer voltar a conseguir fazer?',
    questionNote: 'A resposta guia todo o restante.',
    photo: 'Jefferson atendendo um paciente em casa, olhando nos olhos e conversando antes do tratamento.',
  },
  plan: {
    eyebrow: 'Um plano feito para a vida real',
    title: 'Cada pessoa possui uma história, uma rotina, uma limitação e um objetivo diferente.',
    body: 'Por isso não seguimos protocolos prontos. Primeiro entendemos como seu familiar vive. Depois identificamos quais movimentos limitam sua independência. Só então construímos um plano de tratamento totalmente individualizado.',
    goals: [
      { icon: 'Footprints', text: 'Segurança para caminhar' },
      { icon: 'Armchair', text: 'Confiança para levantar' },
      { icon: 'Scale', text: 'Equilíbrio para evitar quedas' },
      { icon: 'PersonStanding', text: 'Autonomia para continuar vivendo da forma mais independente possível' },
    ],
  },
  expect: {
    eyebrow: 'O que você pode esperar',
    title: 'Resultados que a família inteira sente.',
    cards: [
      {
        icon: 'ShieldCheck',
        title: 'Mais segurança dentro de casa',
        desc: 'Trabalhamos equilíbrio, força e coordenação para reduzir o risco de quedas e aumentar a confiança durante as atividades do dia a dia.',
      },
      {
        icon: 'PersonStanding',
        title: 'Mais autonomia nas tarefas diárias',
        desc: 'Nosso objetivo é ajudar seu familiar a voltar a realizar sozinho aquilo que ainda faz parte da sua rotina: levantar, caminhar, vestir-se, tomar banho, subir escadas.',
      },
      {
        icon: 'HeartHandshake',
        title: 'Mais tranquilidade para toda a família',
        desc: 'Quando um idoso recupera funcionalidade, toda a família sente a diferença. Você ganha mais segurança sabendo que existe um profissional acompanhando essa evolução de perto.',
      },
    ],
  },
  whyHome: {
    eyebrow: 'Por que o atendimento é domiciliar?',
    title: 'Porque a recuperação acontece exatamente onde a vida acontece.',
    body: 'Na própria casa é onde identificamos barreiras, adaptamos movimentos, treinamos atividades reais e tornamos cada sessão muito mais funcional — além do conforto de evitar deslocamentos desnecessários.',
    photo: 'Sessão acontecendo na sala da residência.',
  },
  testimonials: {
    eyebrow: 'O que as famílias dizem',
    title: 'Histórias que voltaram a acontecer em casa.',
    items: [
      { quote: 'Hoje ele voltou a caminhar pela casa sozinho.', who: 'Família de paciente · São Paulo' },
      { quote: 'Voltou a tomar banho sem precisar da nossa ajuda.', who: 'Filha de paciente · São Paulo' },
      { quote: 'Recuperou a confiança para sair novamente.', who: 'Família de paciente · São Paulo' },
      { quote: 'Hoje vivemos muito mais tranquilos.', who: 'Filho de paciente · São Paulo' },
    ],
    note: 'Depoimentos ilustrativos — substituir por avaliações reais do Google e fotos autorizadas dos pacientes.',
  },
  whoFor: {
    eyebrow: 'Para quem é esse atendimento?',
    title: 'Cuidado pensado para cada fase.',
    items: [
      'Idosos que perderam força, equilíbrio ou mobilidade',
      'Pessoas em recuperação após internações ou cirurgias',
      'Pacientes com doenças neurológicas',
      'Pessoas que desejam prevenir quedas',
    ],
  },
  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Ainda com dúvidas?',
    items: [
      {
        q: 'A fisioterapia é realizada na residência?',
        a: 'Sim. Todo o atendimento acontece no conforto da casa do paciente, permitindo um tratamento muito mais funcional e personalizado.',
      },
      {
        q: 'O tratamento serve apenas para quem sente dor?',
        a: 'Não. Muitos pacientes procuram atendimento para recuperar mobilidade, prevenir quedas, melhorar o equilíbrio e preservar a independência.',
      },
      {
        q: 'Como funciona a primeira consulta?',
        a: 'Realizamos uma avaliação completa para entender a história do paciente, seus objetivos e suas limitações. A partir dela é elaborado um plano de tratamento totalmente individualizado.',
      },
    ],
  },
  finalCta: {
    title: 'O tempo passa para todos. Perder a autonomia não precisa fazer parte do envelhecimento.',
    subtitle:
      'Quanto antes o tratamento começar, maiores as chances de preservar movimentos, confiança e independência. Não espere que pequenas dificuldades se transformem em grandes limitações.',
    cta: 'Quero agendar uma avaliação domiciliar',
  },
  footer: 'Fisioterapia Domiciliar para a Terceira Idade — Jefferson Filipim · CREFITO-3: 371949-F',
} as const
