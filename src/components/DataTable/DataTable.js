import { useNavigate } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';

/**
 * @param {*} props props.tableData, props.tableHeaders, props.route
 * Column data is an array of strings. Each string is a new column head
 * Table data is an array of arrays where each array is a seperate item
 */
export default function DataTable(props) {
  const navigate = useNavigate();
  const { useCheckboxes, selectOnRowClick, route, rawData, tableData, tableHeaders } = props;

  const responsive = 'vertical';
  const tableBodyHeight = '1000px';
  const tableBodyMaxHeight = '';

  // https://github.com/gregnb/mui-datatables#api
  const options = {
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 150, 300],
    rowHover: true,
    jumpToPage: true,
    draggableColumns: { enabled: true },
    filter: true,
    filterType: 'dropdown',
    searchOpen: true,
    selectableRowsHideCheckboxes: useCheckboxes ? false : true,
    selectableRowsOnClick: selectOnRowClick ? true : false,
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowClick: rowData => {
      // Whole row of data will be stored in router state
      // If 'route' is not present onClick will not fire.
      route && navigate(`${route}`, { state: { rowData } });
    },
    onRowSelectionChange: (rowsSelected, allRows, selectedIndex) => {
      const data = rawData;
      const dataToState = selectedIndex.map(item => data[item]);
      props.selectedList(dataToState);
    }
  };

  return (
    <>
      <div style={{ marginTop: '25px' }}>
        <MUIDataTable data={tableData} columns={tableHeaders} options={options} />
      </div>
    </>
  );
}
