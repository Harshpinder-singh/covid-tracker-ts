import React from "react";
import numeral from "numeral";

import "./table.css";

interface TableProps {
  countries: any[];
}

const Table: React.FC<TableProps> = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }: any) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
