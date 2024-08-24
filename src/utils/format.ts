import type { Anexo, AnexoOriginal } from "../types/Anexo";

export const formatTableData = (data: Anexo[] | undefined) => {
  return data?.map((anexo) => ({
    ...anexo,
    key: anexo?.Código,
  }));
};

export const cleanAnexoOriginalData = (data: string[][]) => {
  return data
    .slice(3)
    .filter((row: string[]) => row[0])
    .map((row: string[]) => {
      const precioSinIVA = parseFloat(row[3].replace(/,/g, ""));
      const divisor = parseFloat(row[5].replace(/,/g, ""));

      const anexoOriginal: AnexoOriginal = {
        Código: row[0],
        Detalle: row[2],
        Precio: row[3],
        "Precio c/iva": row[4],
        Divisor: row[5],
        Envase: row[6],
        PN: row[7],
      };

      const anexo: Anexo = {
        ...anexoOriginal,
        PrecioFinal: Math.ceil((precioSinIVA * 2) / divisor)?.toFixed(2),
      };

      return anexo;
    });
};
