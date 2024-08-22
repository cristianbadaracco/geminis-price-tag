import type { TableColumnsType } from "antd";

import { Anexo } from "../types/Anexo";

export const getColumnsDef = (type: string): TableColumnsType<Anexo> => {
  const anexoDef = [
    {
      title: "CODIGO",
      dataIndex: "Código",
      key: "Código",
      width: 120,
      sorter: (a: Anexo, b: Anexo) => {
        const aAnexo = typeof a?.Código === "string" ? a?.Código : "";
        const bAnexo = typeof b?.Código === "string" ? b?.Código : "";
        return aAnexo.localeCompare(bAnexo);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "DETALLE",
      dataIndex: "Detalle",
      key: "Detalle",
      sorter: (a: Anexo, b: Anexo) => {
        const aAnexos = typeof a.Detalle === "string" ? a.Detalle : "";
        const bAnexos = typeof b.Detalle === "string" ? b.Detalle : "";
        return aAnexos.localeCompare(bAnexos);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "PRECIO",
      dataIndex: "Precio",
      key: "Precio",
      width: 170,
      sorter: (a: Anexo, b: Anexo) => {
        const aAnexos = typeof a.Precio === "string" ? a.Precio : "";
        const bAnexos = typeof b.Precio === "string" ? b.Precio : "";
        return aAnexos.localeCompare(bAnexos);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "PRECIO CON IVA",
      dataIndex: "Precio c/iva",
      key: "Precio c/iva",
      width: 170,
      sorter: (a: Anexo, b: Anexo) => {
        const aAnexos =
          typeof a?.["Precio c/iva"] === "string" ? a?.["Precio c/iva"] : "";
        const bAnexos =
          typeof b?.["Precio c/iva"] === "string" ? b?.["Precio c/iva"] : "";
        return aAnexos.localeCompare(bAnexos);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "PRECIO FINAL",
      dataIndex: "PrecioFinal",
      key: "PrecioFinal",
      width: 170,
      render: (value: number) => value?.toFixed(2)?.toString(),
      sorter: (a: Anexo, b: Anexo) => {
        const aAnexos = typeof a.PrecioFinal === "number" ? a.PrecioFinal : 0;
        const bAnexos = typeof b.PrecioFinal === "number" ? b.PrecioFinal : 0;
        return aAnexos - bAnexos;
      },
      sortDirections: ["ascend", "descend"],
    },
  ];
  if (type === "anexo") {
    return anexoDef;
  } else {
    return anexoDef;
  }
};
