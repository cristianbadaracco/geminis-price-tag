import { Table, type TableColumnsType, type TableProps } from "antd";
import { type AnyObject } from "antd/es/_util/type";

import tableBtnExpandible from "../../assets/icons/tableBtnExpandible.svg";
import tableBtnNotExpandible from "../../assets/icons/tableBtnNotExpandible.svg";
import tableBtnExpandibleOpen from "../../assets/icons/tableBtnExpandibleOpen.svg";

import { isNumber, isUndefined } from "lodash";

export type AnyObjectWrapper = AnyObject;

export interface TableWrapperProps<T extends AnyObject> {
  dataSource: T[] | undefined;
  columns: TableColumnsType<T>;
  loading: boolean;
  expandable?: boolean;
  expandedRowComponent?: (record: T) => JSX.Element;
  scrollX?: number | true;
  rowSelection?: boolean;
}

interface ExpandIconProps<T extends AnyObject> {
  expanded: boolean;
  onExpand: (record: T, e: React.MouseEvent<HTMLElement>) => void;
  record: T;
}

const TableWrapper = <T extends AnyObject>({
  dataSource,
  columns,
  expandable,
  expandedRowComponent,
  scrollX,
  rowSelection = false,
  ...rest
}: TableWrapperProps<T>): JSX.Element => {
  const scroll = isUndefined(scrollX)
    ? undefined
    : isNumber(scrollX)
    ? { x: scrollX }
    : { x: "max-content" };
  const ExpandIcon: React.FC<ExpandIconProps<T>> = ({
    expanded,
    onExpand,
    record,
  }) => {
    if (!("isExpandable" in record) || record.isExpandable === false) {
      return <img src={tableBtnNotExpandible} alt="Btn Not Expandible" />;
    }

    return expanded ? (
      <img
        src={tableBtnExpandibleOpen}
        alt="Btn Expandible"
        onClick={(e) => {
          onExpand(record, e);
        }}
        className="icon-expandible"
      />
    ) : (
      <img
        src={tableBtnExpandible}
        alt="Btn Not Expandible"
        onClick={(e) => {
          onExpand(record, e);
        }}
        className="icon-expandible"
      />
    );
  };

  const ExpandedRowRender = (record: T): JSX.Element => {
    if (expandedRowComponent !== undefined) {
      return expandedRowComponent(record);
    }
    return (
      <div className="expanded-row">
        {record.description !== undefined &&
          Object.entries(record?.description as Record<string, string>).map(
            ([key, value]) => {
              return (
                <div key={crypto.randomUUID()} style={{ display: "flex" }}>
                  <span className="key">
                    <b>
                      {key.replace(/_/g, " ")}
                      <span style={{ marginRight: 10 }}>:</span>
                    </b>
                  </span>
                  <span className="value">{value}</span>
                </div>
              );
            }
          )}
      </div>
    );
  };
  const expandableConfig = {
    expandIcon: (props: ExpandIconProps<T>) => <ExpandIcon {...props} />,
    expandedRowRender: (record: T) => <ExpandedRowRender {...record} />,
    rowExpandable: (record: T) => record.description !== undefined,
  };

  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      size="small"
      tableLayout="fixed"
      expandable={expandable ?? false ? expandableConfig : undefined}
      scroll={scroll}
      pagination={{
        pageSize: 25,
        position: ["bottomRight"],
        showTotal: (total, range) =>
          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
      }}
      rowClassName={(_, index): string => (index % 2 !== 0 ? "stripe-row" : "")}
      rowSelection={rowSelection ? { type: "checkbox" } : undefined}
      {...rest}
    />
  );
};

export default TableWrapper;
