import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const Pagination = () => {
  const {
    meta: { pageCount, page },
  } = useLoaderData()
  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  //create a page array from page count
  const pages = Array.from({ length: pageCount }, (_, idx) => idx + 1)

  const handlePagination = (pageNumber) => {
    const urlSearchParams = new URLSearchParams(search)
    urlSearchParams.set('page', pageNumber)
    navigate(`${pathname}?${urlSearchParams.toString()}`)
  }
  if (pageCount < 2) return null
  return (
    <section className='mt-8 flex justify-center md:justify-end py-2 px-4'>
      <div className='join'>
        <button
          className='join-item btn btn-sm'
          onClick={() => handlePagination(page === 1 ? pageCount : page - 1)}
        >
          Prev
        </button>

        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-sm ${
                pageNumber === page ? 'btn-active' : ''
              }`}
              onClick={() => handlePagination(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}

        <button
          className='join-item btn btn-sm'
          onClick={() => handlePagination(page === pageCount ? 1 : page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  )
}
export default Pagination
