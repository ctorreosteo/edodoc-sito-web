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
  // Link per scaricare il libro: finché è vuoto la pagina /libro mostra l'avviso di manutenzione
  libro: null,
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
    headline: 'Mangi e ti sazi.',
    angle: -60,
    text: "Cibi naturali, proteine di qualità, meno carboidrati raffinati: un'alimentazione low-carb flessibile che sazia davvero. Niente calorie da contare, niente grammi da pesare, niente piatti tristi da sopportare fino alla prossima ricaduta.",
    strong: 'Il cibo smette di essere il nemico.',
  },
  {
    key: 'movimento',
    title: 'Movimento',
    headline: 'Più forza, più energia.',
    angle: 60,
    text: "Non ti serve l'allenamento estremo che abbandoni dopo tre settimane. Ti serve un'attività mirata, sostenibile, compatibile con la tua agenda: quella che regge anche nelle settimane peggiori.",
    strong: 'Senza stravolgere l\'agenda, senza sensi di colpa.',
  },
  {
    key: 'coaching',
    title: 'Coaching',
    headline: 'Reggi anche nei giorni storti.',
    angle: 180,
    text: "Sapere cosa mangiare è la parte facile. Quella difficile è la cena dopo una giornata storta, lo stress, l'autosabotaggio che arriva puntuale. È qui che ogni dieta si rompe, ed è qui che lavoriamo insieme.",
    strong: 'Senza affiancamento ti perdi. La bussola ti riporta sulla rotta.',
  },
]

export const PROBLEMI = [
  {
    title: '«Stringi i denti, è solo un periodo»',
    text: 'Fame, rinunce, cene saltate. Hai resistito finché hai potuto, poi la vita è tornata e il peso con lei. Non hai ceduto: quel piano non era fatto per durare.',
  },
  {
    title: '«Se non funziona, è colpa tua»',
    text: "Dopo l'ennesimo tentativo inizi a crederci: non hai disciplina, con te le diete non funzionano. È la conclusione più comoda per un metodo che ha fallito.",
  },
  {
    title: '«Basta seguire lo schema»',
    text: 'Uno schema non sa che lavori fino a tardi, che viaggi, che ceni fuori. Al primo imprevisto salta, e resti solo con mille consigli contrastanti e nessuno a cui chiedere.',
  },
]

export const PROTOCOLLO = [
  {
    title: 'Capisci perché finora non ha funzionato',
    text: 'Rileggiamo insieme i tentativi passati: cosa ha funzionato per un po\', perché si è fermato, quali schemi si ripetono. La parte che di solito nessuno si ferma ad analizzare.',
  },
  {
    title: 'Dai un nome a quello che ti blocca',
    text: 'Individuiamo il loop che nel tuo caso ti riporta sempre al punto di partenza: alimentare, comportamentale o mentale. Sapere qual è cambia già il modo in cui ti guardi.',
  },
  {
    title: 'Sai subito se il percorso fa per te',
    text: 'Ti dico con chiarezza se il percorso è adatto alla tua situazione. Se non lo è, te lo dico ugualmente. Non accetto tutti: accetto chi posso aiutare davvero.',
  },
]

export const PER_TE = [
  ['Hai già provato nutrizionisti, dietologi, app e piani', 'hai perso peso, lo hai ripreso, e nessuno ti ha mai spiegato perché'],
  ['Hai tra i 35 e i 60 anni e convivi da anni con il ciclo yo-yo', 'ti senti spento, gonfio, stanco, e non ti riconosci più allo specchio'],
  ["Senti che il problema non è solo l'alimentazione", 'sai già cosa dovresti fare: ti manca chi ti aiuta a farlo quando la vita si mette di traverso'],
]

export const NON_PER_TE = [
  ['Cerchi la dieta lampo per perdere peso in tre settimane', 'qui si costruisce qualcosa che deve reggere dopo, non solo durante'],
  ['Vuoi uno schema da seguire senza metterti in discussione', 'il percorso lavora anche su abitudini e comportamenti, e chiede la tua parte'],
  ['Stai cercando la pillola o il trucco che faccia il lavoro al posto tuo', 'non vendo scorciatoie: ti affianco mentre impari a orientarti da solo'],
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
