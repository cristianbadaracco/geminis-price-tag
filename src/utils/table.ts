import type { TableColumnsType } from "antd";

import { Anexo } from "../types/Anexo";
import { transformCurrency } from "./format";

export const getColumnsDef = (): TableColumnsType<Anexo> => [
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
    title: "DIVISOR",
    dataIndex: "Divisor",
    key: "Divisor",
    width: 90,
    sorter: (a: Anexo, b: Anexo) => {
      const aAnexos = typeof a.Divisor === "string" ? a.Divisor : "";
      const bAnexos = typeof b.Divisor === "string" ? b.Divisor : "";
      return aAnexos.localeCompare(bAnexos);
    },
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "ENVASE",
    dataIndex: "Envase",
    key: "Envase",
    width: 100,
    sorter: (a: Anexo, b: Anexo) => {
      const aAnexos = typeof a.Envase === "string" ? a.Envase : "";
      const bAnexos = typeof b.Envase === "string" ? b.Envase : "";
      return aAnexos.localeCompare(bAnexos);
    },
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "PRECIO",
    dataIndex: "Precio",
    key: "Precio",
    width: 170,
    render: (value) => `$ ${transformCurrency(value)}`,
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
    render: (value) => `$ ${transformCurrency(value)}`,
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
    title: "PRECIO/UNIDAD",
    dataIndex: "PrecioFinal",
    key: "PrecioFinal",
    width: 170,
    render: (value) => `$ ${value}`,
    sorter: (a: Anexo, b: Anexo) => {
      const aAnexos = typeof a.PrecioFinal === "number" ? a.PrecioFinal : 0;
      const bAnexos = typeof b.PrecioFinal === "number" ? b.PrecioFinal : 0;
      return aAnexos - bAnexos;
    },
    sortDirections: ["ascend", "descend"],
  },
];
