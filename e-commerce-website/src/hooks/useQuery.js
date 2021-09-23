import { useMemo } from 'react'
import { useLocation } from 'react-router'
import qs from 'query-string'

function useQuery(props) {
  const location = useLocation()
  const queryString = useMemo(
    () => qs.parse(location.search),
    [location.search]
  )
  return queryString
}

export default useQuery
