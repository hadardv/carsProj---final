import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import Modal from '../Modal/Modal';
import EditModal from '../Modal/EditModal';

const headCells = [
  { id: 'Car_name', numeric: false, disablePadding: false, label: 'Car Name' },
  { id: 'Battery', numeric: true, disablePadding: false, label: 'Battery (kWh)' },
  { id: 'Car_name_link', numeric: false, disablePadding: false, label: 'Car Name Link' },
  { id: 'Efficiency', numeric: true, disablePadding: false, label: 'Efficiency (Wh/km)' },
  { id: 'Fast_charge', numeric: true, disablePadding: false, label: 'Fast Charge (min)' },
  { id: 'Price.DE.', numeric: false, disablePadding: false, label: 'Price (DE)' },
  { id: 'Range', numeric: true, disablePadding: false, label: 'Range (km)' },
  { id: 'Top_speed', numeric: true, disablePadding: false, label: 'Top Speed (km/h)' },
  { id: 'Acceleration..0.100.', numeric: true, disablePadding: false, label: 'Acceleration 0-100 (s)' },
  { id: 'priceILS', numeric: true, disablePadding: false, label: 'Price (ILS)' },
  { id: 'electricity_price', numeric: true, disablePadding: false, label: 'Electricity Price' }

];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (!array) return []; 
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all cars' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDelete, onEdit, selectedRow } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEditModalOpen = () => setIsEditModalOpen(true);
  const handleEditModalClose = () => setIsEditModalOpen(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'center' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          כל הרכבים
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleOpenModal}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={onDelete} />
      {numSelected === 1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={handleEditModalOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      <EditModal isOpen={isEditModalOpen} onClose={handleEditModalClose} onSubmit={onEdit} selectedRow={selectedRow} />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  selectedRow: PropTypes.object,
};

export default function EnhancedTable({ initialRows }) { 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Range');
  const [selected, setSelected] = useState([]); 
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null); 

  useEffect(() => {
    setRows(initialRows); 
  }, [initialRows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Car_name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Car_name) => {
    const selectedIndex = selected.indexOf(Car_name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Car_name);
      const selectedRow = rows.find(row => row.Car_name === Car_name);
      setSelectedRow(selectedRow);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setSelectedRow(null);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      setSelectedRow(null);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      setSelectedRow(null);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Car_name) => selected.indexOf(Car_name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  function handleDeleteSelectedRows() {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cars: selected })
        });
        if (response.status !== 204) throw new Error('Failed to delete the rows');
        const newRows = rows.filter(row => !selected.includes(row.Car_name));
        setSelected([]);
        setRows(newRows);
      } catch (error) {
        console.error("Error deleting rows:", error);
      }
    })();
  }

  function handleEdit(formData) {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.status !== 204) throw new Error('Failed to update the row');
        
        const newRows = rows.map(row => (row.Car_name === formData.Car_name ? formData : row));
        setRows(newRows);
      } catch (error) {
        console.error("Error updating row:", error);
      }
    })();
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDeleteSelectedRows} onEdit={handleEdit} selectedRow={selectedRow} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.Car_name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.Car_name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.Car_name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.Car_name}
                    </TableCell>
                    <TableCell align="right">{row.Battery}</TableCell>
                    <TableCell align="right">
                      <a href={row.Car_name_link} target="_blank" rel="noopener noreferrer">
                        {row.Car_name_link}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.Efficiency}</TableCell>
                    <TableCell align="right">{row.Fast_charge}</TableCell>
                    <TableCell align="right">{row['Price.DE.']}</TableCell> 
                    <TableCell align="right">{row.Range}</TableCell>
                    <TableCell align="right">{row.Top_speed}</TableCell>
                    <TableCell align="right">{row['Acceleration..0.100.']}</TableCell> 
                    <TableCell align="right">{row.priceILS}</TableCell> 
                    <TableCell align="right">{row.electricity_price}</TableCell> 

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

EnhancedTable.propTypes = {
  initialRows: PropTypes.array.isRequired,
};
