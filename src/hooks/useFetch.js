import { useState } from 'react'
import { baseUrl } from '../components/Home'

const useFetch = (url, overwrite = false) => {
  const [data, setData] = useState({})
  const [page, setPage] = useState(1);

  if (overwrite) {
    setPage(page + 1)
    url = url === baseUrl ? url + '?' : url + "&"
    url = url + `page=${page}`
  } else {
    setPage(1)
  }

  console.log('url', url)

  fetch(url)
    .then(res => res.json())
    .then(res => console.log('res', res) || res)
    .then(data => setData(overwrite ? data : prevState => ([...prevState, ...data])));

  return data
}

export default useFetch