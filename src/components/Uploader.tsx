import { useState, useEffect, useCallback } from "react";
import { Upload, Button, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

import { Anexo, AnexoOriginal } from "../types/Anexo";

interface CSVUploaderProps {
  onFileParsed: (data: Anexo[]) => void;
  label?: string;
  uploadedFile?: (data: UploadFile | undefined) => void;
}
const CSVUploader: React.FC<CSVUploaderProps> = ({
  onFileParsed,
  label = "Subir CSV",
  uploadedFile,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) =>
    setFileList(fileList);

  const handleParse = useCallback(() => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      uploadedFile(file);
      Papa.parse(file, {
        complete: (result) => {
          const cleanedData = result.data
            .slice(3)
            .filter((row: string[]) => row[0])
            .map((row: string[]) => {
              const precioConIVA = parseFloat(row[4].replace(/,/g, ""));

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
                PrecioFinal: precioConIVA * 2,
              };

              return anexo;
            });
          onFileParsed(cleanedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  }, [fileList, onFileParsed]);

  useEffect(() => {
    if (fileList.length > 0) {
      handleParse();
    }
  }, [fileList, handleParse]);

  return (
    <div>
      <Upload
        onChange={handleChange}
        beforeUpload={() => false}
        fileList={fileList}
        accept="text/csv"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>{label}</Button>
      </Upload>
    </div>
  );
};

export default CSVUploader;
