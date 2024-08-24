import { Anexo } from "../../types/Anexo";

interface TagProps {
  item: Anexo;
}

const Tag: React.FC<TagProps> = ({ item: { Detalle, PrecioFinal } }) => {
  return (
    <div
      id="tag"
      className="flex flex-col w-[250px] h-[102px] border-black border justify-between"
    >
      <div className="flex flex-row justify-center p-1 h-1/4">
        <span className="text-xs truncate underline">{Detalle}</span>
      </div>
      <div className="flex flex-row justify-center items-center p-1 flex-1">
        <span className="text-4xl line-height-1 font-bold truncate">{`$ ${PrecioFinal}`}</span>
      </div>
      <div className="flex flex-row justify-between p-1 items-center h-1/4 border-t">
        <span className="text-sm font-bold ">Géminis</span>
        <span className="text-xs">
          {new Date().toLocaleDateString("es-ES")}
        </span>
      </div>
    </div>
  );
};

export default Tag;
