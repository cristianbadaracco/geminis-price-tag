export interface AnexoOriginal {
  Código: string;
  Detalle: string;
  Divisor: string;
  Envase: string;
  Precio: string;
  "Precio c/iva": string;
}

export interface Anexo extends AnexoOriginal {
  PrecioFinal: string;
}
