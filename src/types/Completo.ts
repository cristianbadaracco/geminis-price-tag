export interface CompletoOriginal {
  Código: string;
  Descripción: string;
  Empaque: string;
  "$ S/IVA": string;
  "$ C/IVA": string;
  "Utilidad %": string;
  "$ C/IVA y Utilidad": string;
  "Unidades Por Paquete": number;
  "$ C/IVA y Utilidad Unidad": string;
}

export interface Completo extends CompletoOriginal {
  PrecioFinal: string;
}
