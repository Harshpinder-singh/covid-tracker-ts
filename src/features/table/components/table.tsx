import React from "react";

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
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
