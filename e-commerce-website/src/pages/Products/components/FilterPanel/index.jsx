import React, { useEffect, useState } from 'react'
import { FaListUl } from 'react-icons/fa'
import { BiFilterAlt } from 'react-icons/bi'
import { Link, NavLink, useHistory } from 'react-router-dom'
import './styles.scss'
import { path } from 'src/constants/path'
import RatingStars from 'src/components/RatingStars'
import CheckBoxList from 'src/components/CheckBoxList'
import { useSelector } from 'react-redux'
import { extractData } from 'src/utils/helper'
import { LIST_PRICE_RANGE } from 'src/constants/priceRange'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import qs from 'query-string'

FilterPanel.propTypes = {
  filters: PropTypes.object
}

function FilterPanel({ filters }) {
  const { allProducts } = useSelector(state => state.allProducts)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [places, setPlaces] = useState([])
  const [currentSelection, setCurrentSelection] = useState(null)
  const history = useHistory()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    reset
  } = useForm({
    defaultValues: {
      price_gte: filters.price_gte || '',
      price_lte: filters.price_lte || ''
    },
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    if (allProducts.length) {
      setCategories(extractData('category', allProducts))
      if (currentSelection !== 'brand')
        setBrands(extractData('brand', allProducts))
      if (currentSelection !== 'place')
        setPlaces(extractData('place', allProducts))
    }
  }, [currentSelection, allProducts])

  useEffect(() => {
    setValue('price_gte', filters.price_gte || '')
    setValue('price_lte', filters.price_lte || '')
  }, [setValue, filters])

  // filter by entering price range inputs
  const applyPriceRange = ({ price_gte, price_lte }) => {
    if (price_gte !== '' || price_lte !== '') {
      let _filters = filters
      if (price_gte !== '') {
        _filters = { ..._filters, price_gte }
      } else {
        delete _filters.price_gte
      }
      if (price_lte !== '') {
        _filters = { ..._filters, price_lte }
      } else {
        delete _filters.price_lte
      }
      history.push(path.products + `?${qs.stringify(_filters)}`)
    }
  }

  const isPriceValid = () => {
    const price_gte = getValues('price_gte')
    const price_lte = getValues('price_lte')
    if (price_gte !== null && price_lte !== null) {
      return Number(price_lte) >= Number(price_gte)
    }
    return price_gte !== null || price_lte !== null
  }

  // filter by fixed price range
  const filterByPrice = priceRange => {
    const _filters = {
      ...filters,
      price_gte: priceRange.gte,
      price_lte: priceRange.lte
    }
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  const isPriceRangeActive = priceRange => {
    let price_gte, price_lte
    if (typeof filters.price_gte === 'string') {
      price_gte = Number(filters.price_gte)
    }
    if (typeof filters.price_lte === 'string') {
      price_lte = Number(filters.price_lte)
    }
    return price_gte === priceRange.gte && price_lte === priceRange.lte
  }

  const filterByRating = rating_gte => {
    const _filters = {
      ...filters,
      rating_gte
    }
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  const filterByBrand = brandId => {
    const _filters = {
      ...filters,
      'brand.id': brandId
    }
    setCurrentSelection('brand')
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  const filterByPlace = placeId => {
    const _filters = {
      ...filters,
      'place.id': placeId
    }
    setCurrentSelection('place')
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  const clearAllFilters = () => {
    reset()
    setCurrentSelection(null)
    history.push({
      pathname: path.products
    })
  }

  return (
    <div className="filter-panel">
      <nav className="category">
        <Link to={path.products} className="category__heading">
          <FaListUl size="0.8em" className="icon" />
          Tất cả danh mục
        </Link>

        <ul className="category__list">
          {categories.map(category => (
            <li key={category.id} className="category__item">
              <NavLink
                to={path.products + `?category.id=${category.id}`}
                className="category__link"
                isActive={(match, location) => {
                  if (!match) return false
                  const query = qs.parse(location.search)
                  return query['category.id'] === category.id
                }}
              >
                {category.name} ({category.qty})
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="filter">
          <h3 className="filter__heading">
            <BiFilterAlt size="0.8em" className="icon" />
            Bộ lọc tìm kiếm
          </h3>
          <div className="filter__group">
            <p className="filter__title">Nơi bán</p>
            <div className="filter__brand">
              <CheckBoxList
                name="place"
                optionList={places}
                filters={filters}
                handleChange={filterByPlace}
              />
            </div>
          </div>
          <div className="filter__group">
            <p className="filter__title">Thương hiệu</p>
            <div className="filter__brand">
              <CheckBoxList
                name="brand"
                optionList={brands}
                filters={filters}
                handleChange={filterByBrand}
              />
            </div>
          </div>
          <div className="filter__group">
            <p className="filter__title">Khoảng giá</p>
            <div className="filter__price">
              <div className="filter__price-group">
                <ul className="filter__price-list">
                  {LIST_PRICE_RANGE.map((priceRange, index) => (
                    <li
                      key={index}
                      className={`filter__price-item ${
                        isPriceRangeActive(priceRange) ? 'active' : ''
                      }`}
                      onClick={() => filterByPrice(priceRange)}
                    >
                      <NavLink to="#" className="filter__price-link">
                        {priceRange.gte && priceRange.lte
                          ? `Từ ${priceRange.gte} đến ${priceRange.lte}`
                          : priceRange.gte
                          ? `Trên ${priceRange.gte}`
                          : `Dưới ${priceRange.lte}`}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter__price-group">
                <Controller
                  name="price_gte"
                  control={control}
                  rules={{ validate: { isPriceValid } }}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder="TỪ"
                      onChange={value => {
                        clearErrors()
                        field.onChange(value)
                      }}
                      value={getValues('price_gte')}
                      className="filter__price-input"
                    />
                  )}
                />
                <div className="filter__price-line" />
                <Controller
                  name="price_lte"
                  control={control}
                  rules={{ validate: { isPriceValid } }}
                  render={({ field }) => (
                    <input
                      type="number"
                      placeholder="ĐẾN"
                      onChange={value => {
                        clearErrors()
                        field.onChange(value)
                      }}
                      value={getValues('price_lte')}
                      className="filter__price-input"
                    />
                  )}
                />
              </div>
              {Object.values(errors).length !== 0 && (
                <p className="filter__price-error">
                  Vui lòng điền khoảng giá phù hợp
                </p>
              )}
              <button
                className="button filter-panel__button"
                onClick={handleSubmit(applyPriceRange)}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
        <div className="filter__group">
          <div className="filter">
            <p className="filter__title">Đánh giá</p>
            <div className="filter__rating">
              <ul>
                {Array.from({ length: 5 }, (_, index) => (
                  <li
                    className={`filter__rating-item ${
                      Number(filters.rating_gte) === 5 - index ? 'active' : ''
                    }`}
                    key={5 - index}
                    onClick={() => filterByRating(5 - index)}
                  >
                    <NavLink to="#" className="filter__rating-link">
                      <RatingStars rate={5 - index} />
                      {index !== 0 && <span> trở lên </span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          className="button filter-panel__button"
          onClick={clearAllFilters}
        >
          Xoá tất cả
        </button>
      </nav>
    </div>
  )
}

export default FilterPanel
