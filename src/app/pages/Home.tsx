import { useEffect, useState } from "react";
import { Button, Input, Tooltip, UploadFile } from "antd";

import CSVUploader from "../../components/Uploader";
import DataTable from "../../components/Table/Table";

import type { Anexo } from "../../types/Anexo";

import { getColumnsDef } from "../../utils/table";
import { formatTableData } from "../../utils/format";

import {
  SearchOutlined,
  FileAddOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

function Home() {
  const [data, setData] = useState<Anexo[] | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<UploadFile | undefined>(
    undefined
  );
  const [selectedType, setSelectedType] = useState<"anexo" | "completo">(
    "anexo"
  );
  const [filteredData, setFilteredData] = useState<Anexo[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      setSelectedType("anexo");
      setFilteredData(formatTableData(data));
    }
  }, [data]);

  const handleSearch = (value: string) => {
    const filtered = data?.filter(
      (item) =>
        item.Código.toLowerCase().includes(value.toLowerCase()) ||
        item.Detalle.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(formatTableData(filtered));
  };

  const columnsDef = getColumnsDef(selectedType);

  return (
    <div>
      {data && data.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-2xl uppercase font-weight-bold">
              {`${selectedType} `}
            </span>
            <span>{uploadedFile?.name ? `(${uploadedFile.name})` : ""}</span>
          </div>
          <div className="flex flex-row gap-2 justify-between mt-2 items-center">
            <div className="w-80">
              <Input.Search
                placeholder="Buscar por código o detalle"
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={handleSearch}
                width={200}
                size="large"
              />
            </div>
            <div className="flex flex-row gap-2">
              <Tooltip title="Cargar otro archivo">
                <Button
                  onClick={() => {
                    setData(undefined);
                  }}
                  icon={<FileAddOutlined />}
                />
              </Tooltip>
              <Tooltip title="Imprimir">
                <Button icon={<PrinterOutlined />} />
              </Tooltip>
            </div>
          </div>
          <div>
            <DataTable<Anexo>
              dataSource={filteredData ?? []}
              columns={columnsDef}
              loading={false}
              rowSelection
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <CSVUploader
            onFileParsed={setData}
            uploadedFile={setUploadedFile}
            label="Subir Anexo"
          />
          {/* <CSVUploader onFileParsed={setData} label="Subir Completo" /> */}
        </div>
      )}
    </div>
  );
}

export default Home;
