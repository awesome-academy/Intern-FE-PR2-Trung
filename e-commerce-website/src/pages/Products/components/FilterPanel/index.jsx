import React, { useEffect, useState } from 'react'
import { FaListUl } from 'react-icons/fa'
import { BiFilterAlt } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import './styles.scss'
import { path } from 'src/constants/path'
import RatingStars from 'src/components/RatingStars'
import CheckBoxList from 'src/components/CheckBoxList'
import { useSelector } from 'react-redux'
import { extractData } from 'src/utils/helper'
import { LIST_PRICE_RANGE } from 'src/constants/priceRange'

function FilterPanel(props) {
  const { allProducts } = useSelector(state => state.allProducts)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (allProducts.length) {
      setCategories(extractData('category', allProducts))
      setBrands(extractData('brand', allProducts))
      setPlaces(extractData('place', allProducts))
    }
  }, [allProducts])

  return (
    <div className="filter-panel">
      <nav className="category">
        <Link to={path.home} className="category__heading">
          <FaListUl size="0.8em" className="icon" />
          Tất cả danh mục
        </Link>

        <ul className="category__list">
          {categories.map(category => (
            <li key={category.id} className="category__item">
              <NavLink
                to={path.products + `?category=${category.id}`}
                className="category__link"
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
              <CheckBoxList name="place" optionList={places} />
            </div>
          </div>
          <div className="filter__group">
            <p className="filter__title">Thương hiệu</p>
            <div className="filter__brand">
              <CheckBoxList name="brand" optionList={brands} />
            </div>
          </div>
          <div className="filter__group">
            <p className="filter__title">Khoảng giá</p>
            <div className="filter__price">
              <div className="filter__price-group">
                <ul className="filter__price-list">
                  {LIST_PRICE_RANGE.map((priceRange, index) => (
                    <li key={index} className="filter__price-item">
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
                <input
                  type="number"
                  placeholder="TỪ"
                  className="filter__price-input"
                />
                <div className="filter__price-line" />
                <input
                  type="number"
                  placeholder="ĐẾN"
                  className="filter__price-input"
                />
              </div>
              <p className="filter__price-error">
                Vui lòng điền khoảng giá phù hợp
              </p>
              <button className="button filter-panel__button">Áp dụng</button>
            </div>
          </div>
        </div>
        <div className="filter__group">
          <div className="filter">
            <p className="filter__title">Đánh giá</p>
            <div className="filter__rating">
              <ul>
                {Array.from({ length: 5 }, (_, index) => (
                  <li key={5 - index} className="filter__rating-item">
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
        <button className="button filter-panel__button">Xoá tất cả</button>
      </nav>
    </div>
  )
}

export default FilterPanel
