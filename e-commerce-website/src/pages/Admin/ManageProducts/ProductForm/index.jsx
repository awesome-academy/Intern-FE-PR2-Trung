import { Grid } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from 'src/components/InputField'
import SelectField from 'src/components/SelectField'
import * as Yup from 'yup'
import './styles.scss'

export const categories = [
  { id: '60afafe76ef5b902180aacb5', name: 'Điện thoại' },
  { id: '60afacca6ef5b902180aacaf', name: 'Đồng hồ' },
  { id: '60aba4e24efcc70f8892e1c6', name: 'Áo thun' },
  { id: '60afafe76ef5b902180hacb6', name: 'Giày dép' }
]

export const brands = [
  { id: 'b1', name: 'Xiaomi' },
  { id: 'b2', name: 'Vsmart' },
  { id: 'b3', name: 'Apple' },
  { id: 'b4', name: 'Realme' },
  { id: 'b5', name: 'WWOOR' },
  { id: 'b6', name: 'Polo' },
  { id: 'b7', name: 'Giisel' },
  { id: 'b8', name: 'GENZ' },
  { id: 'b9', name: 'CRRJU' },
  { id: 'b10', name: 'FNGEEN' },
  { id: 'b11', name: 'FNGEEN' },
  { id: 'b12', name: 'OPPO' },
  { id: 'b13', name: 'Bitis' }
]

export const places = [
  {
    id: 'p1',
    name: 'Hà Nội'
  },
  {
    id: 'p2',
    name: 'Đà Nẵng'
  },
  {
    id: 'p3',
    name: 'Hồ Chí Minh'
  }
]

function ProductForm({ product, handleSubmit }) {
  const initialValues = {
    name: product?.name || '',
    price_before_discount: product?.price_before_discount || '',
    price: product?.price || '',
    quantity: product?.quantity || '',
    categoryId: product?.category?.id || '',
    brandId: product?.brand?.id || '',
    placeId: product?.place?.id || '',
    description: product?.description || '',
    imageURL1: product?.images[0] || '',
    imageURL2: product?.images[1] || '',
    imageURL3: product?.images[2] || '',
    imageURL4: product?.images[3] || '',
    imageURL5: product?.images[4] || ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Tên sản phẩm là trường bắt buộc')
      .min(10, 'Vui lòng nhập ít nhất 10 kí tự trở lên')
      .max(100, 'Vui lòng nhập tối đa 100 kí tự trở xuống'),
    price_before_discount: Yup.number()
      .required('Giá gốc là trường bắt buộc')
      .positive('Giá sản phẩm phải là số nguyên dương')
      .integer('Giá sản phẩm phải là số nguyên dương'),
    price: Yup.number()
      .required('Giá bán là trường bắt buộc')
      .positive('Giá sản phẩm phải là số nguyên dương')
      .integer('Giá sản phẩm phải là số nguyên dương'),
    quantity: Yup.number()
      .required('Số lượng là trường bắt buộc')
      .positive('Số lượng sản phẩm phải là số nguyên dương')
      .integer('Số lượng sản phẩm phải là số nguyên dương'),
    categoryId: Yup.string().required('Danh mục là trường bắt buộc'),
    brandId: Yup.string().required('Thương hiệu là trường bắt buộc'),
    placeId: Yup.string().required('Kho chứa là trường bắt buộc'),
    description: Yup.string()
      .required('Mô tả sản phẩm là trường bắt buộc')
      .min(20, 'Vui lòng nhập ít nhất 20 kí tự trở lên')
      .max(5000, 'Vui lòng nhập tối đa 5000 kí tự trở xuống'),
    imageURL1: Yup.string()
      .required('Hình ảnh sản phẩm là trường bắt buộc')
      .url('URL ảnh không hợp lệ'),
    imageURL2: Yup.string()
      .required('Hình ảnh sản phẩm là trường bắt buộc')
      .url('URL ảnh không hợp lệ'),
    imageURL3: Yup.string()
      .required('Hình ảnh sản phẩm là trường bắt buộc')
      .url('URL ảnh không hợp lệ'),
    imageURL4: Yup.string()
      .required('Hình ảnh sản phẩm là trường bắt buộc')
      .url('URL ảnh không hợp lệ'),
    imageURL5: Yup.string()
      .required('Hình ảnh sản phẩm là trường bắt buộc')
      .url('URL ảnh không hợp lệ')
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className="product-form">
            <Grid container spacing={5}>
              <Grid item xs={12} md={5}>
                <div className="product-form__title">Hình ảnh sản phẩm</div>
                {product?.images[0] && (
                  <img
                    src={product?.images[0]}
                    alt="main"
                    className="product-form__image"
                  />
                )}
                <InputField
                  name="imageURL1"
                  type="text"
                  label="URL hình ảnh 1"
                />
                <InputField
                  name="imageURL2"
                  type="text"
                  label="URL hình ảnh 2"
                />
                <InputField
                  name="imageURL3"
                  type="text"
                  label="URL hình ảnh 3"
                />
                <InputField
                  name="imageURL4"
                  type="text"
                  label="URL hình ảnh 4"
                />
                <InputField
                  name="imageURL5"
                  type="text"
                  label="URL hình ảnh 5"
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="product-form__title">Thông tin sản phẩm</div>
                <InputField name="name" type="text" label="Tên sản phẩm" />
                <InputField
                  name="price_before_discount"
                  type="text"
                  label="Giá gốc"
                />
                <InputField name="price" type="text" label="Giá bán" />
                <InputField name="quantity" type="text" label="Tồn kho" />

                <SelectField
                  name="brandId"
                  label="Thương hiệu"
                  options={brands}
                />
                <SelectField
                  name="categoryId"
                  label="Danh mục"
                  options={categories}
                />
                <SelectField name="placeId" label="Kho chứa" options={places} />
                <InputField
                  name="description"
                  type="text"
                  label="Mô tả sản phẩm"
                  multiline
                  minRows={10}
                  maxRows={10}
                />
              </Grid>
            </Grid>
            <div className="product-form__button-group">
              <button className="button product-form__button" type="submit">
                Đồng ý
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProductForm
