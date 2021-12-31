import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

// Table data is an array of arrays where each array is a seperate item
// Column data is an array of strings. Each string is a new column head
export default function DataTable(props) {
  const [responsive, setResponsive] = useState('vertical');
  const [tableBodyHeight, setTableBodyHeight] = useState('600px');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');

  // Gets the keys of the first column
  const columns = Object.keys(props.data[0]);

  // Gets the values of the passed data. Converts from object to array
  const tableValues = props.data.map(Object.values);

  // Stringifys each individual Value
  const tableData = tableValues.map((item) =>
    item.map((value) => {
      let stringedItem = value;
      if (typeof value !== 'string') {
        stringedItem = JSON.stringify(value);
      }
      return stringedItem;
    })
  );

  // https://www.npmjs.com/package/mui-datatables?activeTab=readme#api
  const options = {
    filter: true,
    filterType: 'dropdown',
    searchOpen: true,
    selectableRowsHideCheckboxes: true,
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowClick: (rowData, rowState) => {
      console.log(parseInt(rowData[0], 10));
      // TODO: Make api call for clicked item. console.log value gets the OID as a int.
      // make route
    }
  };

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <MUIDataTable data={tableData} columns={columns} options={options} />
      </div>
    </>
  );
}
