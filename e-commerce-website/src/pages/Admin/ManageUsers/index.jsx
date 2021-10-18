import React, { useEffect } from 'react'
import '../styles.scss'
import {
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
import { fetchAllUsers, updateUser } from '../admin.slice'
import SortTableHead from 'src/components/Table/SortTableHead'
import useTable from 'src/hooks/useTable'
import { toast } from 'react-toastify'

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
  { id: 'firstName', label: 'Tên', minWidth: 50, align: 'center' },
  {
    id: 'lastName',
    label: 'Họ',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'center'
  },
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
    id: 'dob',
    label: 'Ngày sinh',
    minWidth: 140,
    align: 'center'
  },
  {
    id: 'role',
    label: 'Vai trò',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center'
  }
]

function ManageUsers(props) {
  const dispatch = useDispatch()
  const { allUsers } = useSelector(state => state.admin)
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
        const response = await dispatch(fetchAllUsers())
        unwrapResult(response)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error.message)
      }
    })()
  }, [dispatch])

  const handleChangeRole = async (event, userId) => {
    const data = { role: event.target.value }

    try {
      const response = await dispatch(updateUser({ userId, data }))
      unwrapResult(response)
      toast.success('Cập nhật vai trò thành công')
    } catch (err) {
      toast.error('Cập nhật vai trò thất bại')
    }
  }

  const handleChangeStatus = async (event, userId) => {
    const data = { status: event.target.value }

    try {
      const response = await dispatch(updateUser({ userId, data }))
      unwrapResult(response)
      toast.success('Cập nhật trạng thái thành công')
    } catch (err) {
      toast.error('Cập nhật trạng thái thất bại')
    }
  }

  return (
    <div className="manage">
      <header className="manage-header">
        <div className="manage-header__title">Quản lí người dùng</div>
        <div className="manage-header__subtitle">
          Quản lí trạng thái và phân quyền người dùng
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
              {stableSort(allUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRow key={user.id} hover>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">{user.dob}</TableCell>
                    <TableCell align="center">
                      <FormControl className={classes.formControl}>
                        <Select
                          value={user.role}
                          onChange={event => handleChangeRole(event, user.id)}
                          displayEmpty
                          className={classes.selectEmpty}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value={'user'}>user</MenuItem>
                          <MenuItem value={'admin'}>admin</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl className={classes.formControl}>
                        <Select
                          value={user.status}
                          onChange={event => handleChangeStatus(event, user.id)}
                          displayEmpty
                          className={classes.selectEmpty}
                          disabled={user.role === 'admin'}
                        >
                          <MenuItem value={1}>Hoạt động</MenuItem>
                          <MenuItem value={0}>Vô hiệu</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </main>
    </div>
  )
}

export default ManageUsers
