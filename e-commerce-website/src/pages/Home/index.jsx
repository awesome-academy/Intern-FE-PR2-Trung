import { Container, Grid } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BannersSlider from 'src/components/BannersSlider'
import ProductsListSlider from 'src/components/ProductsListSlider'
import LocalStorage from 'src/constants/localStorage'
import { getProducts } from '../Products/products.slice'
import skinnyBannerFirst from 'src/assets/images/skinny-banner-1.jfif'
import skinnyBannerSecond from 'src/assets/images/skinny-banner-2.jfif'
import skinnyBannerThird from 'src/assets/images/skinny-banner-3.jfif'

import './styles.scss'
import { getAllProducts } from '../Products/allProducts.slice'
import { path } from 'src/constants/path'
import BrandsSlider from 'src/components/BrandsSlider'
import { getBanners } from './banners.slice'

function Home(props) {
  const { mainBanners, rightMainBanners, subLeftBanners } = useSelector(
    state => state.banners
  )

  const { products } = useSelector(state => state.products)
  const { allCategories, allBrands } = useSelector(state => state.allProducts)

  const viewedProductList =
    JSON.parse(localStorage.getItem(LocalStorage.viewedProducts)) || []

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const bannersResponse = await dispatch(getBanners())
        unwrapResult(bannersResponse)

        const params = {
          _page: 1,
          _limit: 16,
          _sort: 'sold',
          _order: 'desc'
        }

        const productResponse = await dispatch(getProducts({ params }))
        unwrapResult(productResponse)

        delete params._page
        delete params._limit
        const allProductResponse = await dispatch(getAllProducts({ params }))
        unwrapResult(allProductResponse)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    })()
  }, [dispatch])

  return (
    <div className="homepage">
      <Container maxWidth="lg">
        <section className="homepage-banners">
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <div className="homepage-banners__slider">
                <BannersSlider banners={mainBanners} />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                direction="column"
                spacing={1}
                className="homepage-banners__right"
              >
                {rightMainBanners.map((banner, index) => (
                  <Grid item key={index}>
                    <Link to={banner.link}>
                      <img src={banner.imageUrl} alt="right banner" />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </section>

        <section className="homepage-categories">
          <div className="homepage__box">
            <div className="homepage__header">
              <Link to={path.products}>Danh mục sản phẩm</Link>
            </div>
            <ul className="homepage-categories__list">
              {allCategories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={path.products + `?category.id=${category.id}`}
                    className="homepage-categories__item"
                  >
                    <div className="homepage-categories__img">
                      <img src={category.imageUrl} alt="category" />
                    </div>
                    <h3>{category.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="best-selling-products">
          <ProductsListSlider title={'Sản phẩm bán chạy'} products={products} />
        </section>

        <section className="homepage__skinny-banners">
          <img src={skinnyBannerFirst} alt="skinny banner 1" />
          <img src={skinnyBannerSecond} alt="skinny banner 2" />
          <img src={skinnyBannerThird} alt="skinny banner 3" />
        </section>

        <section className="homepage-brands">
          <div className="homepage__box">
            <div className="homepage__header">
              <Link to={path.products}>Thương hiệu</Link>
            </div>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <div className="homepage-banners__slider">
                  <BannersSlider banners={subLeftBanners} />
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
                <div className="homepage-brands__slider">
                  <BrandsSlider brands={allBrands} />
                </div>
              </Grid>
            </Grid>
          </div>
        </section>

        <section className="watched-products">
          <ProductsListSlider
            title={'Sản phẩm đã xem'}
            products={viewedProductList}
          />
        </section>
      </Container>
    </div>
  )
}

export default Home
