
import './sideBar.css'
import EachLink from '../Navbar/Link'



const SideBar = ({ category, error }) => {
    return (
        <aside className="products_sidebar">
            <h2>Category</h2>

            <div className="category_links">
                <EachLink
                    title="All Products"
                    link={"/products"}
                    className='align_center'>
                </EachLink>
                {
                    category && category?.map((c, i) => (
                        <EachLink
                            key={c._id}
                            title={c.name}
                            link={`/products?category=${c.name}`}
                            className='align_center'>
                        </EachLink>

                    ))
                }
                {/* {
                    category?.map((c, i) => (
                        <a key={i} href={`/products?category=${c.name}`} className='align_center'>
                            {c.name}
                        </a>

                    ))
                } */}
                {
                    error &&
                    <em>{error}</em>
                }
            </div>
        </aside>
    )
}

export default SideBar
