// Dati del sito: link, numeri e stato dei posti stanno tutti qui

export const SITE = {
  url: 'https://www.edodoc.it',
  name: 'Dr. Edoardo Bo',
  role: 'Biologo Nutrizionista · Mental Coach Certificato',
  booking: 'https://zcal.co/dr-edoardobo/chiamata-conoscitiva',
  instagram: 'https://www.instagram.com/edodoc_/',
  youtube: 'https://www.youtube.com/@edodoc',
  privacy: 'https://www.iubenda.com/privacy-policy/23796137',
  // Form MailerLite della masterclass (lo stesso del sito Shopify)
  masterclassForm: 'https://assets.mailerlite.com/jsonp/1264236/forms/180484059996095718/subscribe',
  // Il libro oggi passa dal checkout Shopify: va sostituito con un form prima di spostare il dominio
  libro: 'https://www.edodoc.it/products/libro',
}

export const STATS = {
  percorsi: 500,
  mesi: 6,
}

// Quando riaprono i posti: esauriti a false e il sito torna alla consulenza standard
export const POSTI = {
  esauriti: true,
  mese: 'gennaio',
}

export const NAV = [
  { label: 'Metodo Bussola', to: '/metodo-bussola' },
  { label: 'Chi sono', to: '/chi-sono' },
  { label: 'Testimonianze', to: '/testimonianze' },
  { label: 'Il libro', to: '/libro' },
  { label: 'Masterclass', to: '/masterclass' },
]

export const PILASTRI = [
  {
    key: 'nutrizione',
    title: 'Nutrizione',
    angle: -60,
    text: "Non è la classica dieta restrittiva che ti costringe a contare calorie e a convivere con la fame. È un metodo innovativo e sartoriale, pensato per fornire al tuo corpo l'energia e i nutrienti essenziali di cui ha realmente bisogno.",
    strong: 'Imparerai a vedere il cibo come un alleato prezioso.',
  },
  {
    key: 'movimento',
    title: 'Movimento',
    angle: 60,
    text: "Non ti serve un allenamento estremo, ma un'attività mirata e sostenibile per riattivare il tuo corpo. Ogni passo che faremo sarà progettato per rafforzarti e ridarti vitalità.",
    strong: 'Ti sentirai più forte, agile e pronto ad affrontare la giornata.',
  },
  {
    key: 'coaching',
    title: 'Coaching',
    angle: 180,
    text: 'Il coaching sarà la tua guida costante verso il successo. Lavoreremo insieme su strategie personalizzate per superare ogni ostacolo, con un supporto continuo in ogni fase del percorso.',
    strong: 'Non sarai mai solo.',
  },
]

export const PROBLEMI = [
  {
    title: 'Paura delle rinunce e della fame costante',
    text: 'Dieta significa privarsi dei cibi che ami, soffrire la fame e vivere con una sensazione di sacrificio continuo. Così si molla prima di vedere risultati.',
  },
  {
    title: 'Sfiducia nei risultati e fallimenti passati',
    text: 'Diete che non hanno funzionato o che hanno dato risultati solo temporanei, fino a convincersi che «le diete non funzionano per me».',
  },
  {
    title: 'Confusione e mancanza di personalizzazione',
    text: 'Tante informazioni contrastanti e soluzioni generiche che non considerano le tue reali esigenze. Difficile sapere da dove iniziare.',
  },
]

export const PROTOCOLLO = [
  {
    title: 'Anamnesi clinica e comportamentale',
    text: 'Analizzo la tua storia metabolica, i tentativi precedenti e i pattern di autosabotaggio specifici che ti hanno bloccato fino ad oggi.',
  },
  {
    title: 'Identificazione del blocco reale',
    text: 'Individuo il loop specifico (metabolico, ormonale, comportamentale o mentale) che genera il ciclo di fallimento ripetuto nel tuo caso.',
  },
  {
    title: 'Valutazione di compatibilità col Metodo Bussola',
    text: 'Ti dico con chiarezza se il percorso è adatto alla tua situazione. Se non lo è, te lo dico ugualmente. Non accetto tutti.',
  },
]

export const PER_TE = [
  ['Hai già consultato nutrizionisti, dietologi o specialisti', 'ma sei sempre al punto di partenza dopo pochi mesi'],
  ['Hai tra i 35 e i 60 anni e convivi da anni con il ciclo yo-yo', 'perdi peso, lo riprendi, ricominci, e non capisci perché'],
  ["Senti che il problema non è solo l'alimentazione", 'ma qualcosa di comportamentale e mentale che nessun piano dietetico ha mai affrontato'],
]

export const CITAZIONI = [
  {
    slug: 'alessandro-imprenditoria-e-dimagrimento',
    text: 'Avevo provato tutto. Diete, personal trainer, app. Riprendevo sempre peso. Con il Metodo Bussola ho capito finalmente il perché, e sono uscito dal loop per sempre.',
    who: 'Alessandro, 50 anni',
    job: 'Imprenditore',
  },
  {
    slug: 'claudia-13-kg-e-nuova-autostima',
    text: 'Meno 13 kg e una nuova autostima. Non mi sentivo così bene da anni. Non è stata una dieta: è stato un cambiamento di prospettiva.',
    who: 'Claudia, 52 anni',
    job: 'Manager',
  },
  {
    slug: 'giuseppe-focus-e-salute',
    text: 'Pensavo fosse solo una questione di alimentazione. Invece era la testa. Lavorare su entrambe le cose insieme ha fatto tutta la differenza.',
    who: 'Giuseppe, 33 anni',
    job: 'Imprenditore',
  },
]
