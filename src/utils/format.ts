import { Anexo } from "../types/Anexo";

export const formatTableData = (data: Anexo[] | undefined) => {
  return data?.map((anexo) => ({
    ...anexo,
    key: anexo?.Código,
  }));
};
