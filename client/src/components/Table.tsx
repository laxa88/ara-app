import * as React from 'react';
import styled from '../css/styled';

interface ITableRow {
  cells: React.ReactNode[];
}

interface ITableData {
  headers: React.ReactNode[];
  rows: ITableRow[];
}

const Container = styled.div`
  display: block;
`;

const HeaderRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: solid 1px black;
`;

const CellRow = styled.div`
  display: flex;
  padding: 10px;
`;

const Header = styled.div`
  font-weight: bold;
  width: 100%;
`;

const Cell = styled.div`
  width: 100%;
`;

export interface IProps {
  data: ITableData;
}

class Table extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { data } = this.props;

    const headers = data.headers.map((header, hi) => (
      <Header key={hi}>{header}</Header>
    ));

    const rows = data.rows.map((row, ri) => {
      const cells = row.cells.map((cell, ci) => <Cell key={ci}>{cell}</Cell>);

      return <CellRow key={ri}>{cells}</CellRow>;
    });

    return (
      <Container>
        <HeaderRow>{headers}</HeaderRow>
        {rows}
      </Container>
    );
  }
}

export default Table;
