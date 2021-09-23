import Container from '@material-ui/core/Container'
import React, { useEffect, useState } from 'react'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import noCartImage from 'src/assets/images/no-cart.png'
import { path } from 'src/constants/path'
import Navbar from './Navbar'
import './styles.scss'
import logo from 'src/assets/logo/logo.svg'
import { useHistory } from 'react-router'
import useQuery from 'src/hooks/useQuery'

function Header(props) {
  const cartItems = [
    {
      link: '/products/productDetail',
      img: noCartImage,
      name: 'Áo nỉ dài tay dáng rộng phong cách',
      price: 900000,
      id: 1
    },
    {
      link: '/products/productDetail',
      img: noCartImage,
      name: 'Quần nỉ dài tay dáng rộng phong cách',
      price: 500000,
      id: 2
    }
  ]

  const [searchValue, setSearchValue] = useState('')
  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    const { name = '' } = query
    setSearchValue(name)
  }, [query])

  const onChangeSearch = event => {
    setSearchValue(event.target.value)
  }

  const search = event => {
    event.preventDefault()
    history.push(path.products + `?name_like=${searchValue}`)
  }

  return (
    <header className="header">
      <Container maxWidth="lg">
        <Navbar />
        <div className="header__main">
          <div className="header__logo">
            <Link to={path.home}>
              <div className="header__logo-img">
                <img src={logo} alt="shop logo" />
              </div>
            </Link>
          </div>
          <form className="header__search" onSubmit={search}>
            <input
              type="text"
              className="header__search-input"
              placeholder="Nhập để tìm kiếm sản phẩm"
              onChange={onChangeSearch}
            ></input>
            <button type="submit " className="header__search-btn">
              <FaSearch />
            </button>
          </form>
          <div className="header__cart">
            <div className="header__cart-wrap">
              <Link to="/cart">
                <FaShoppingCart size="2em" className="header__cart-icon" />
                <span className="header__cart-noti">
                  {cartItems ? cartItems.length : 0}
                </span>
              </Link>
              {!cartItems.length ? (
                <div className="header__cart-block header__cart-block--no-cart">
                  <img
                    className="header__cart-no-cart-img"
                    src={noCartImage}
                    alt="no cart"
                  />
                  <span className="header__cart-message">Chưa có sản phẩm</span>
                </div>
              ) : (
                <div className="header__cart-block">
                  <header className="header__cart-header">
                    Sản Phẩm Mới Thêm
                  </header>
                  <ul className="header__cart-list">
                    {cartItems.map(item => {
                      return (
                        <li key={item.id} className="header__cart-item">
                          <Link
                            className="header__cart-link"
                            to={path.productDetail}
                          >
                            <img
                              className="header__cart-item-img"
                              src={item.img}
                              alt={item.name}
                            />
                            <h4 className="header__cart-item-title">
                              {item.name}
                            </h4>
                            <span className="price">
                              {item.price.toLocaleString('vi-VI', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <Link className="header__cart-show-btn button" to={path.cart}>
                    Xem Giỏ Hàng
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
