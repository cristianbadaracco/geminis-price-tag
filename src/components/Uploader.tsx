/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Upload, Button, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

import { Anexo } from "../types/Anexo";

import { cleanData } from "../utils/format";

interface CSVUploaderProps {
  onFileParsed: (data: Anexo[] | undefined) => void;
  label?: string;
  uploadedFile?: (data: UploadFile) => void;
  type?: "anexo" | "completo";
}
const CSVUploader: React.FC<CSVUploaderProps> = ({
  onFileParsed,
  label = "Subir CSV",
  uploadedFile = () => {},
  type = "anexo",
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
          const cleanedData = cleanData(result?.data as string[][], type);
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
