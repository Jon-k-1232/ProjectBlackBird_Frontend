import { useNavigate } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';

// Table data is an array of arrays where each array is a seperate item
// Column data is an array of strings. Each string is a new column head
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
		// Passes the client ID to client details page through the state.
		onRowClick: rowData => {
			navigate('/dashboard/clientDetails/', { state: { id: `${rowData[0]}` } });
		}
	};

	return (
		<>
			<div style={{ marginTop: '30px' }}>
				<MUIDataTable data={props.tableData} columns={props.tableHeaders} options={options} />
			</div>
		</>
	);
}
