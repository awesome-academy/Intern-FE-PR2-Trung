import {
  Button,
  ButtonGroup,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import ConfirmationModal from 'src/components/ConfirmationModal'
import DetailModal from 'src/components/DetailModal'
import PageTitle from 'src/components/PageTitle'
import SortTableHead from 'src/components/Table/SortTableHead'
import { path } from 'src/constants/path'
import useTable from 'src/hooks/useTable'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import {
  adminActions,
  createNewProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct
} from '../admin.slice'
import '../styles.scss'
import ProductForm, { places, brands, categories } from './ProductForm'

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
  { id: 'productName', label: 'Tên sản phẩm', minWidth: 260, align: 'center' },
  {
    id: 'price',
    label: 'Giá bán',
    minWidth: 200,
    align: 'center'
  },

  {
    id: 'quantity',
    label: 'Số lượng',
    minWidth: 140,
    align: 'center'
  },
  {
    id: 'sold',
    label: 'Đã bán',
    minWidth: 120,
    align: 'center'
  },
  {
    id: 'category',
    label: 'Danh mục',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'brand',
    label: 'Thương hiệu',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'place',
    label: 'Kho chứa',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'actions',
    label: 'Thao tác',
    minWidth: 120,
    align: 'center'
  }
]

function ManageProducts(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { allProducts } = useSelector(state => state.admin)
  const [updateProductShowsing, setUpdateProductShowsing] = useState(false)
  const [createProductShowsing, setCreateProductShowsing] = useState(false)
  const [currentProductUpate, setCurrentProductUpate] = useState({})
  const [showDeleteProductConfirmation, setShowDeleteProductConfirmation] =
    useState(false)
  const [currentProductDelele, setCurrentProductDelele] = useState(null)
  const history = useHistory()
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
        const response = await dispatch(fetchAllProducts())
        unwrapResult(response)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    })()
  }, [dispatch])

  const handleViewDetail = value => {
    history.push(path.products + `/${generateNameId(value)}`)
  }

  const onEditProduct = value => {
    setUpdateProductShowsing(true)
    setCurrentProductUpate(value)
  }

  const handleUpateProduct = async data => {
    const {
      name,
      price_before_discount,
      price,
      quantity,
      categoryId,
      brandId,
      placeId,
      description,
      imageURL1,
      imageURL2,
      imageURL3,
      imageURL4,
      imageURL5
    } = data

    const productImages = [
      imageURL1,
      imageURL2,
      imageURL3,
      imageURL4,
      imageURL5
    ]

    const category = categories.find(item => item.id === categoryId)
    const brand = brands.find(item => item.id === brandId)
    const place = places.find(item => item.id === placeId)

    const updatedProduct = {
      name,
      price_before_discount,
      price,
      quantity,
      description,
      image: imageURL1,
      images: productImages,
      category,
      brand,
      place
    }

    try {
      const response = await dispatch(
        updateProduct({ id: currentProductUpate.id, data: updatedProduct })
      )
      unwrapResult(response)
      setUpdateProductShowsing(false)
      toast.success('Chỉnh sửa sản phẩm thành công')
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      toast.error('Chỉnh sửa sản phẩm thất bại')
    }
  }

  const handleConfirmDeleteProduct = product => {
    setShowDeleteProductConfirmation(true)
    setCurrentProductDelele(product)
  }

  const handleDeleteProduct = async () => {
    try {
      const response = dispatch(deleteProduct(currentProductDelele.id))
      unwrapResult(response)
      dispatch(adminActions.removeProductInStore(currentProductDelele))
      toast.success('Xóa sản phẩm thành công')
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      toast.error('Xóa sản phẩm thấy bại')
    }
  }

  const handleCloseConfirmation = () => setShowDeleteProductConfirmation(false)

  const onClickAddNewProduct = () => {
    setCreateProductShowsing(true)
  }

  const handleAddNewProduct = async data => {
    const {
      name,
      price_before_discount,
      price,
      quantity,
      categoryId,
      brandId,
      placeId,
      description,
      imageURL1,
      imageURL2,
      imageURL3,
      imageURL4,
      imageURL5
    } = data

    const productImages = [
      imageURL1,
      imageURL2,
      imageURL3,
      imageURL4,
      imageURL5
    ]

    const category = categories.find(item => item.id === categoryId)
    const brand = brands.find(item => item.id === brandId)
    const place = places.find(item => item.id === placeId)

    const newProduct = {
      name,
      price_before_discount,
      price,
      quantity,
      description,
      image: imageURL1,
      images: productImages,
      category,
      brand,
      place,
      rating: 0,
      sold: 0,
      view: 0
    }

    try {
      const response = await dispatch(createNewProduct(newProduct))
      unwrapResult(response)
      setCreateProductShowsing(false)
      toast.success('Tạo sản phẩm mới thành công')
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      toast.error('Tạo sản phẩm mới thất bại')
    }
  }

  return (
    <div className="manage">
      <PageTitle title={t('pageTitle.manageProducts')} />
      <header className="manage-header">
        <div className="manage-header__title">Quản lí sản phẩm</div>
        <div className="manage-header__subtitle">
          Quản lí, thêm, xem, sửa và xóa sản phẩm
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
              {stableSort(allProducts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(productItem => (
                  <TableRow key={productItem.id} hover>
                    <TableCell align="center">{productItem.id}</TableCell>
                    <TableCell align="center">{productItem.name}</TableCell>
                    <TableCell align="center">
                      {formatCurrency(productItem.price)}
                    </TableCell>
                    <TableCell align="center">{productItem.quantity}</TableCell>
                    <TableCell align="center">{productItem.sold}</TableCell>
                    <TableCell align="center">
                      {productItem.category.name}
                    </TableCell>
                    <TableCell align="center">
                      {productItem.brand.name}
                    </TableCell>
                    <TableCell align="center">
                      {productItem.place.name}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                      >
                        <Button
                          aria-label="view product detail"
                          color="primary"
                          onClick={() => handleViewDetail(productItem)}
                        >
                          Xem
                        </Button>
                        <Button
                          aria-label="edit product"
                          onClick={() => onEditProduct(productItem)}
                        >
                          sửa
                        </Button>
                        <Button
                          aria-label="delete product"
                          color="secondary"
                          onClick={() =>
                            handleConfirmDeleteProduct(productItem)
                          }
                        >
                          Xóa
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="manage-info__footer">
          <button className="button" onClick={onClickAddNewProduct}>
            Thêm sản phẩm
          </button>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={allProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </main>
      <DetailModal
        title="Chỉnh sửa sản phẩm"
        detailShowing={updateProductShowsing}
        setDetailShowing={setUpdateProductShowsing}
      >
        <ProductForm
          product={currentProductUpate}
          handleSubmit={handleUpateProduct}
        />
      </DetailModal>
      <DetailModal
        title="Thêm sản sản phẩm"
        detailShowing={createProductShowsing}
        setDetailShowing={setCreateProductShowsing}
      >
        <ProductForm handleSubmit={handleAddNewProduct} />
      </DetailModal>
      <ConfirmationModal
        title="Xác nhận xóa sản phẩm"
        content={`Bạn chắc chắn muốn xóa sản phẩm có id là ${currentProductDelele?.id} chứ?`}
        confirmActions={handleDeleteProduct}
        showConfirmation={showDeleteProductConfirmation}
        handleClose={handleCloseConfirmation}
      />
    </div>
  )
}

export default ManageProducts
