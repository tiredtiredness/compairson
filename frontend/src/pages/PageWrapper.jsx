export const PageWrapper = ({ header, children }) => {
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
    </div>
  )
}
