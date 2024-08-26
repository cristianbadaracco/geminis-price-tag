import type { Anexo, AnexoOriginal } from "../types/Anexo";

export const formatTableData = (data: Anexo[] | undefined) => {
  if (!data) return [];

  return data?.map((anexo) => ({
    ...anexo,
    key: anexo?.Código,
  }));
};

export const transformCurrency = (currencyString: string): number => {
  const normalizedString = currencyString
    ?.replace(/\./g, "")
    ?.replace(/,/g, ".");
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
        Divisor: row[5],
        Envase: row[6],
        Precio: row[3],
        "Precio c/iva": row[4],
      };

      const anexo: Anexo = {
        ...anexoOriginal,
        PrecioFinal: Math.ceil((precioSinIVA * 2) / divisor)?.toFixed(2),
      };

      return anexo;
    });
};

const cleanCompletoData = (data: string[][]) => {
  if (!data || data.length === 0) return [];

  return data?.slice(1)?.map((row) => {
    const completo: AnexoOriginal = {
      Código: row[0],
      Detalle: row[1],
      Envase: row[2],
      Precio: row[3],
      "Precio c/iva": row[4],
      Divisor: row[8],
    };

    const precioSinIVA = transformCurrency(row[3]);
    const divisor = transformCurrency(row[8]);

    const completoFinal: Anexo = {
      ...completo,
      PrecioFinal: Math.ceil((precioSinIVA * 2) / divisor)?.toFixed(2),
    };
    return completoFinal;
  });
};

export const cleanData = (data: string[][], type: string): Anexo[] => {
  return type === "anexo"
    ? cleanAnexoOriginalData(data)
    : cleanCompletoData(data);
};
