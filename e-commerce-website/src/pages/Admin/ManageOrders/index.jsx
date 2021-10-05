import React, { useEffect } from 'react'
import '../styles.scss'
import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../admin.slice'
import SortTableHead from 'src/components/Table/SortTableHead'
import useTable from 'src/hooks/useTable'
import { purchaseStatus } from 'src/constants/purchaseStatus'
import { formatCurrency, timeConverter } from 'src/utils/helper'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  tableHeaderCell: {
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

const columns = [
  { id: 'id', label: 'ID', minWidth: 40, align: 'center' },
  { id: 'fullName', label: 'Tên khách hàng', minWidth: 170, align: 'center' },
  {
    id: 'phone',
    label: 'Số điện thoại',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'totalPayment',
    label: 'Tổng tiền',
    minWidth: 140,
    align: 'center'
  },
  {
    id: 'paymentMethod',
    label: 'Hình thức thanh toán',
    minWidth: 220,
    align: 'center'
  },
  {
    id: 'orderTime',
    label: 'Thời gian đặt hàng',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'detail',
    label: 'Chi tiết',
    minWidth: 120,
    align: 'center'
  }
]

function ManageOrders(props) {
  const dispatch = useDispatch()
  const { allOrders } = useSelector(state => state.admin)
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    getComparator,
    stableSort
  } = useTable()
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(fetchAllOrders())
        unwrapResult(response)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    })()
  }, [dispatch])

  const handleChangeStatus = async (event, id) => {
    console.log(event.target.value)
  }

  const handleViewDetail = value => {
    console.log(value)
  }

  return (
    <div className="manage">
      <header className="manage-header">
        <div className="manage-header__title">Quản lí đơn hàng</div>
        <div className="manage-header__subtitle">
          Quản lí, xem và cập nhật trạng thái đơn hàng
        </div>
      </header>
      <main className="manage-info">
        <TableContainer>
          <Table aria-label="simple table">
            <SortTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={columns}
            />
            <TableBody>
              {stableSort(allOrders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(userOrder => (
                  <TableRow key={userOrder.id} hover>
                    <TableCell align="center">{userOrder.id}</TableCell>
                    <TableCell align="center">{`${userOrder.delivery.firstName} ${userOrder.delivery.lastName}`}</TableCell>
                    <TableCell align="center">
                      {userOrder.delivery.phone}
                    </TableCell>
                    <TableCell align="center">
                      {userOrder.delivery.address}
                    </TableCell>
                    <TableCell align="center">
                      <FormControl className={classes.formControl}>
                        <Select
                          value={userOrder.status}
                          onChange={event =>
                            handleChangeStatus(event, userOrder.id)
                          }
                          displayEmpty
                          className={classes.selectEmpty}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value={purchaseStatus.waitForConfirmation}>
                            Chờ xác nhận
                          </MenuItem>
                          <MenuItem value={purchaseStatus.waitForGoods}>
                            Chờ lấy hàng
                          </MenuItem>
                          <MenuItem value={purchaseStatus.delivering}>
                            Đang giao
                          </MenuItem>
                          <MenuItem value={purchaseStatus.delivered}>
                            Đã giao
                          </MenuItem>
                          <MenuItem value={purchaseStatus.cancelled}>
                            Đã hủy
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(userOrder.totalPayment)}
                    </TableCell>
                    <TableCell align="center">
                      {userOrder.paymentMethod}
                    </TableCell>
                    <TableCell align="center">
                      {timeConverter(userOrder.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        aria-label="view detail"
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(userOrder)}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={allOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </main>
    </div>
  )
}

export default ManageOrders
