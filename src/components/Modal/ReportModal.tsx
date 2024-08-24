import { Button, Form, Input, Row, Col, DatePicker, InputNumber } from "antd";

import type { Anexo } from "../../types/Anexo";

interface ReportModalProps {
  onSave: (anexo: Anexo) => void;
  data: Anexo | undefined;
}

const formatReportSubmit = (data: Anexo) => {
  return {
    ...data,
    PrecioFinal: data?.PrecioFinal?.toString(),
  };
};

const ReportModal: React.FC<ReportModalProps> = ({ onSave, data }) => {
  const onFinish = (values: Anexo) => {
    onSave(formatReportSubmit(values));
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="mt-4"
      initialValues={data}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item key="Código" name="Código" label="Código">
            <Input placeholder="Ingrese Código" disabled />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item key="Detalle" name="Detalle" label="Detalle">
            <Input placeholder="Ingrese Detalle" />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            key="PrecioFinal"
            name="PrecioFinal"
            label="Precio Final ($)"
          >
            <InputNumber
              placeholder="Ingrese Precio Final"
              className="w-full"
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item key="Fecha" name="Fecha" label="Fecha">
            <DatePicker
              placeholder="Ingrese Fecha"
              className="w-full"
              format="DD/MM/YYYY"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" className="mt-4">
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Row>
    </Form>
  );
};

export default ReportModal;
