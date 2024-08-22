import TableWrapper, { type TableWrapperProps, type AnyObjectWrapper } from './_TableWrapper'

export type { TableWrapperProps }

const Table = <T extends AnyObjectWrapper>(props: TableWrapperProps<T>): JSX.Element => {
  return <TableWrapper {...props} />
}

export default Table
