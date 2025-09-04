import React from "react";

function TableHead({ headTitle }) {
  return (
    <tr>
      {headTitle.map((title) => (
        <th key={title} className="p-4">
          {title}
        </th>
      ))}
    </tr>
  );
}

export default TableHead;
