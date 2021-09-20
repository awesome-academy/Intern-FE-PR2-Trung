import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProducts } from './allProducts.slice'
import FilterPanel from './components/FilterPanel'
import ProductsMainContent from './components/ProductsMainContent'
import { getProducts } from './products.slice'
import './styles.scss'

function Products(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const params = { _limit: 10, _page: 1 }
        await dispatch(getProducts({ params }))
      } catch (error) {
        // eslint-disable-next-line
        console.log(error.message)
      }
    })()
    ;(async () => {
      try {
        await dispatch(getAllProducts())
      } catch (error) {
        // eslint-disable-next-line
        console.log(error.message)
      }
    })()
  }, [dispatch])

  return (
    <div className="products">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <FilterPanel />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <ProductsMainContent />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Products
