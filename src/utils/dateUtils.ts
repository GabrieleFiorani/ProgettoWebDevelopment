export type ExpiryStatusType = 'fresco' | 'in_scadenza' | 'scaduto'; // Tipo di stato di scadenza

export interface ExpiryStatus { // Interfaccia per lo stato di scadenza
  daysLeft: number; // Numero di giorni rimanenti alla scadenza
  label: string; // Etichetta descrittiva dello stato di scadenza
  status: ExpiryStatusType; // Stato di scadenza (fresco, in_scadenza, scaduto)
  colorClass: string; // Classe CSS per il colore dello stato di scadenza
}


export function getExpiryStatus(expirationDateStr: string): ExpiryStatus { // Funzione per ottenere lo stato di scadenza a partire dalla data di scadenza
  const today = new Date(); // Ottieni la data odierna
  today.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte per confronti accurati

  const expDate = new Date(expirationDateStr); // Crea un oggetto Date dalla stringa della data di scadenza
  expDate.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte per confronti accurati

  const diffTime = expDate.getTime() - today.getTime(); // Calcola la differenza in millisecondi tra la data di scadenza e oggi
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte la differenza in giorni

  if (daysLeft < 0) { // Se la data di scadenza è passata
    return { // Restituisci lo stato di scadenza come "scaduto"
      daysLeft,
      status: 'scaduto',
      label: `Scaduto da ${Math.abs(daysLeft)} ${Math.abs(daysLeft) === 1 ? 'giorno' : 'giorni'}`, 
      colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    };
  }

  if (daysLeft <= 3) { // Se la data di scadenza è entro 3 giorni
    return {
      daysLeft,
      status: 'in_scadenza',
      label: daysLeft === 0 ? 'Scade oggi!' : `Scade in ${daysLeft} ${daysLeft === 1 ? 'giorno' : 'giorni'}`,
      colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    };
  }

  return { // Se la data di scadenza è oltre 3 giorni
    daysLeft,
    status: 'fresco',
    label: `Scade tra ${daysLeft} giorni`,
    colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };
}