export type StorageLocation = 'dispensa' | 'frigo' | 'freezer'; // Luogo di stoccaggio
export type UnitType = 'pz' | 'g' | 'kg' | 'ml' | 'l'; // Tipo di unità di misura

export interface PantryItem { // Interfaccia per un elemento della dispensa
  id?: string;  // ID univoco dell'elemento della dispensa
  userId: string; // ID dell'utente proprietario dell'elemento
  name: string; // Nome dell'elemento della dispensa
  category: string; // Categoria dell'elemento della dispensa (es. frutta, verdura, carne, ecc.)
  quantity: number; // Quantità dell'elemento della dispensa
  unit: UnitType; // Unità di misura dell'elemento della dispensa
  location: StorageLocation; // Luogo di stoccaggio dell'elemento della dispensa
  expirationDate: string; // Data di scadenza dell'elemento della dispensa
  imageUrl?: string; // URL dell'immagine dell'elemento della dispensa (opzionale)
  createdAt: number; // Timestamp di creazione dell'elemento della dispensa
}