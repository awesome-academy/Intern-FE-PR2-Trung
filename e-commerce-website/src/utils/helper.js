export const payLoadCreater = asyncFunc => async (arg, thunkAPI) => {
  try {
    const response = await asyncFunc(arg)
    return response
  } catch (error) {
    // Lỗi trả về không đúng định dạng SerializedError hoặc string thì bị xóa khỏi error
    // => sử dụng thunkAPI.rejectWithValue
    return thunkAPI.rejectWithValue(error)
  }
}

export const generateNameId = ({ name, id }) =>
  encodeURIComponent(`${name.replace(/\s/g, '-').replace(/%/g, '')}-i.${id}`)

export const convertNameIdToProductName = param => {
  const nameIdArr = param.split('-i.')
  return nameIdArr[0].split('-').join(' ')
}

export const formatCurrency = money =>
  money.toLocaleString('vi-VI', {
    style: 'currency',
    currency: 'VND'
  })

export const formatQuantity = value => {
  const quantity = Number((Number(value) / 1000).toFixed(2))
  if (quantity >= 1) return quantity + 'k'
  return value
}

export const formatRatingNumber = value => {
  if (Number.isInteger(value)) return `${value}.0`
}

export const discountPercentage = (original, sale) =>
  Math.round(((original - sale) * 100) / original) + '%'

export const extractData = (name, data) => {
  let changedData = []

  for (let i = 0; i < data.length; i++) {
    let index
    if (
      changedData.length &&
      changedData.some((item, itemIndex) => {
        index = itemIndex
        return item.name === data[i][name].name
      })
    ) {
      ++changedData[index].qty
    } else {
      changedData.push({ ...data[i][name], qty: 1 })
    }
  }

  changedData = changedData.sort((a, b) => a.name.localeCompare(b.name))
  return changedData
}

export const getProductIdFromParam = param => {
  const arr = param.split('-i.')
  return arr[arr.length - 1]
}

export const timeConverter = timestamp => {
  const date = new Date(timestamp)
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export const isProductExistInList = (product, productList) => {
  if (product && productList.length) {
    return productList.some(item => item.id === product.id)
  }
}

export const findIndexById = (item, array) => {
  return array.findIndex(arrayItem => arrayItem.id === item.id)
}

export const statusNumberToText = number => {
  switch (number) {
    case 1:
      return 'Chờ xác nhận'
    case 2:
      return 'Chờ lấy hàng'
    case 3:
      return 'Đang giao'
    case 4:
      return 'Đã giao'
    case 5:
      return 'Đã hủy'
    default:
      return 'Không rõ'
  }
}
