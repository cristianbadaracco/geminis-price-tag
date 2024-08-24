import type { Anexo, AnexoOriginal } from "../types/Anexo";

export const formatTableData = (data: Anexo[] | undefined) => {
  return data?.map((anexo) => ({
    ...anexo,
    key: anexo?.Código,
  }));
};

export const transformCurrency = (currencyString: string) => {
  const normalizedString = currencyString.replace(/\./g, "").replace(/,/g, ".");
  return parseFloat(normalizedString);
};

export const cleanAnexoOriginalData = (data: string[][]) => {
  return data
    .slice(3)
    .filter((row: string[]) => row[0])
    .map((row: string[]) => {
      const precioSinIVA = transformCurrency(row[3]);
      const divisor = transformCurrency(row[5]);

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
