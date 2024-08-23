import { useEffect } from "react";

import Tag from "../../components/Tag/Tag";

import type { Anexo } from "../../types/Anexo";

const Report = () => {
  const selectedRows = JSON.parse(localStorage.getItem("selectedRows") || "[]");

  /*   useEffect(() => {
    return () => {
      localStorage.removeItem("selectedRows");
    };
  }, []); */

  return (
    <div className="grid grid-cols-4 gap-2 m-2">
      {selectedRows &&
        selectedRows?.map((item: Anexo) => (
          <Tag key={item.Código} description={item.Detalle} />
        ))}
    </div>
  );
};

export default Report;
