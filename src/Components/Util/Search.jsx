const Search = ({ children, maxWidth, sectionPadding }) => {
  return (
    <section
      className={`bg-zinc-50 ${
        maxWidth ? maxWidth : 'max-w-[50rem]'
      } mx-auto my-[-3rem] ${
        sectionPadding ? sectionPadding : 'p-4'
      }  rounded-lg shadow-md`}
    >
      {children}
    </section>
  )
}
export default Search
