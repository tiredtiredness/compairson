export const FilterSection = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <hr />
      <div className="flex gap-4">{children}</div>
      <hr />
    </div>
  )
}
