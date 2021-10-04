import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import './styles.scss'
import Navbar from '../Header/Navbar'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import logo from 'src/assets/logo/logo-primary.svg'
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router'

function LightHeader({ title, hasSearch }) {
  const [searchValue, setSearchValue] = useState('')
  const history = useHistory()

  const onChangeSearch = event => {
    setSearchValue(event.target.value)
  }

  const search = event => {
    event.preventDefault()
    const _searchValue = searchValue.trim()
    if (_searchValue) {
      history.push(path.products + `?name_like=${searchValue}`)
    }
  }

  return (
    <header className="light-header">
      <div className="light-header__navbar">
        <Container maxWidth="lg">
          <Navbar isPrimaryNav={true} />
        </Container>
      </div>
      <Container maxWidth="lg">
        <div className="light-header__main">
          <Link to={path.home} className="light-header__logo">
            <div className="light-header__logo-img">
              <img src={logo} alt="shop logo" />
            </div>
            <div className="light-header__title">{title}</div>
          </Link>
          {hasSearch && (
            <form className="light-header__search" onSubmit={search}>
              <input
                type="text"
                className="light-header__search-input"
                placeholder="Nhập để tìm kiếm sản phẩm"
                value={searchValue}
                onChange={onChangeSearch}
              ></input>
              <button type="submit " className="light-header__search-btn">
                <FaSearch />
              </button>
            </form>
          )}
        </div>
      </Container>
    </header>
  )
}

export default LightHeader
