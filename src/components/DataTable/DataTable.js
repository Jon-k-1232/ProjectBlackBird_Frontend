import { useNavigate } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';

/**
 * @param {*} props props.tableData, props.tableHeaders, props.route
 * Column data is an array of strings. Each string is a new column head
 * Table data is an array of arrays where each array is a seperate item
 */
export default function DataTable(props) {
  const navigate = useNavigate();

  const responsive = 'vertical';
  const tableBodyHeight = '600px';
  const tableBodyMaxHeight = '';

  // https://github.com/gregnb/mui-datatables#api
  const options = {
    filter: true,
    filterType: 'dropdown',
    searchOpen: true,
    selectableRowsHideCheckboxes: true,
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowClick: (rowData) => {
      // Whole row of data will be stored in router state
      navigate(`${props.route}`, { state: { rowData } });
    },
  };

  return (
    <>
      <div style={{ marginTop: '25px' }}>
        <MUIDataTable data={props.tableData} columns={props.tableHeaders} options={options} />
      </div>
    </>
  );
}
