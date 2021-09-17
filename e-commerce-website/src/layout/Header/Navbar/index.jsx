import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaRegBell,
  FaRegQuestionCircle
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import noCartImage from 'src/assets/images/no-cart.png'
import { path } from 'src/constants/path'
import './styles.scss'

function Navbar(props) {
  const userAuth = {
    name: 'Trung Lê'
  }

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item navbar__item--separate">
          Vào cửa hàng trên ứng dụng Shopy
        </li>
        <li className="navbar__item">
          Kết nối
          <div className="navbar__social">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
          </div>
        </li>
      </ul>
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to={path.home} className="navbar__link">
            <FaRegBell className="icon" />
            Thông báo
          </Link>
        </li>
        <li className="navbar__item">
          <Link to={path.home} className="navbar__link">
            <FaRegQuestionCircle className="icon" />
            Trợ giúp
          </Link>
        </li>
        {!userAuth ? (
          <>
            <li className="navbar__item navbar__item--strong navbar__item--separate">
              <Link className="navbar__link" to={path.register}>
                Đăng ký
              </Link>
            </li>
            <li className="navbar__item navbar__item--strong">
              <Link className="navbar__link" to={path.login}>
                Đăng nhập
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar__item">
            <div className="navbar__user">
              <Link to={path.purchase} className="navbar__user-info">
                <img
                  src={noCartImage}
                  alt="user avatar"
                  className="navbar__user-img"
                />
                <span className="navbar__user-name">{userAuth.name}</span>
              </Link>

              <ul className="navbar__user-menu">
                <li className="navbar__user-item">
                  <Link to={path.profile} className="navbar__user-link">
                    Tài khoản của tôi
                  </Link>
                </li>
                <li className="navbar__user-item">
                  <Link to={path.purchase} className="navbar__user-link">
                    Đơn mua
                  </Link>
                </li>
                <li className="navbar__user-item">
                  <Link to={path.home} className="navbar__user-link">
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
