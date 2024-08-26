import { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import Tag from "../../components/Tag/Tag";

import type { Anexo } from "../../types/Anexo";

import useModal from "../../hooks/useModal";
import ReportModal from "../../components/Modal/ReportModal";

const Report = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("selectedRows") || "[]")
  );
  const [selectedProduct, setSelectedProduct] = useState<Anexo | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();

  const onProductUpdate = (updatedProduct: Anexo) => {
    setProducts((prevProducts: Anexo[]) =>
      prevProducts.map((product) =>
        product.Código === updatedProduct.Código ? updatedProduct : product
      )
    );
    handleOk();
  };

  const handleEdit = (product: Anexo) => {
    setSelectedProduct(product);
    showModal();
  };

  console.log(products);

  return (
    <>
      <Modal
        title="Editar Producto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={400}
        centered
      >
        <ReportModal onSave={onProductUpdate} data={selectedProduct} />
      </Modal>
      <div className="grid grid-cols-3 gap-2 m-2 cursor-pointer">
        {products &&
          products.map((item: Anexo, index: number) => (
            <div
              key={item?.Código}
              className={`${
                index !== 0 && index > 3 && index % 30 < 3 ? "mt-4" : ""
              }`}
              onClick={() => handleEdit(item)}
            >
              <Tag item={item} />
            </div>
          ))}
      </div>
      <Button className="my-8 ml-2 print:hidden" onClick={() => navigate(-1)}>
        Volver atras
      </Button>
    </>
  );
};

export default Report;
