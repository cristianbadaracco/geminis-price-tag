import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Input,
  Tooltip,
  UploadFile,
  type TableProps,
} from "antd";
import Table from "../../components/Table/Table";
import CSVUploader from "../../components/Uploader";

import type { Anexo } from "../../types/Anexo";

import { getColumnsDefAnexo } from "../../utils/table";
import { formatTableData } from "../../utils/format";

import {
  SearchOutlined,
  FileAddOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

function Home() {
  const [data, setData] = useState<Anexo[] | undefined | null>(
    JSON.parse(localStorage.getItem("products") || "[]")
  );
  const [uploadedFile, setUploadedFile] = useState<UploadFile | undefined>(
    undefined
  );
  const [filteredData, setFilteredData] = useState<Anexo[] | undefined>(
    undefined
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    JSON.parse(localStorage.getItem("selectedRowKeys") || "[]") ?? []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const formattedTableData = formatTableData(data);
      setFilteredData(formattedTableData);

      localStorage.setItem("products", JSON.stringify(data));
    }
  }, [data]);

  const handleSearch = (value: string) => {
    const filtered = data?.filter(
      (item) =>
        item?.Código?.toLowerCase().includes(value.toLowerCase()) ||
        item?.Detalle?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(formatTableData(filtered));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    localStorage.setItem("selectedRowKeys", JSON.stringify(newSelectedRowKeys));
  };

  const rowSelection: TableRowSelection<Anexo> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOnPrint = () => {
    const selectedRows = selectedRowKeys.map((key) => {
      return data?.find((item) => item.Código === key);
    });
    localStorage.setItem("selectedRows", JSON.stringify(selectedRows));
    navigate("/report");
  };

  const handleOpenNewFile = () => {
    setData(undefined);
    setUploadedFile(undefined);
    setSelectedRowKeys([]);
    localStorage.removeItem("selectedRowKeys");
    localStorage.removeItem("products");
  };

  const columnsDef = getColumnsDefAnexo;

  if (data === null) {
    return (
      <Card className="m-4 flex flex-row" hoverable>
        <span>El formato del archivo cargado no es correcto.</span>
        <div className="mt-4">
          <CSVUploader
            onFileParsed={setData}
            uploadedFile={(file) => {
              setUploadedFile(file);
            }}
          >
            <Button icon={<FileAddOutlined />}>Subir otro archivo</Button>
          </CSVUploader>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-4 my-8">
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-2xl uppercase font-weight-bold">Géminis</span>
          <span>{uploadedFile?.name ? ` - (${uploadedFile.name})` : ""}</span>
        </div>
        <div className="flex flex-row gap-2 justify-between mt-2 items-center">
          <div className="w-80">
            <Input.Search
              placeholder="Buscar por código o detalle"
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              width={200}
              size="large"
            />
          </div>
          <div className="flex flex-row gap-2">
            <CSVUploader
              onFileParsed={setData}
              uploadedFile={(file) => {
                setUploadedFile(file);
              }}
            >
              <Tooltip title="Cargar archivo">
                <Button
                  onClick={handleOpenNewFile}
                  icon={<FileAddOutlined />}
                />
              </Tooltip>
            </CSVUploader>
            <Tooltip title="Imprimir">
              <Button
                icon={<PrinterOutlined />}
                onClick={handleOnPrint}
                disabled={selectedRowKeys.length === 0}
              />
            </Tooltip>
          </div>
        </div>
        <div>
          <Table<Anexo>
            dataSource={filteredData ?? []}
            columns={columnsDef()}
            rowSelection={rowSelection}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
