import React, { useEffect, useState } from 'react'
import './ProductsList.css'
import ProductCard from './ProductCard'
import UseData from '../../Hooks/UseData'
import { useSearchParams } from 'react-router-dom'
import ProductCardSkelton from './ProductCardSkelton'
import Pagination from '../common/Pagination'


const ProductsList = () => {
    const [search, setSearch] = useSearchParams(); //get params from route
    const selectedCategory = search.get("category"); //we get selected category from route path
    const selectedPage = search.get("page"); //get page from route path
    const skeletones = [1, 2, 3, 4, 5, 6, 7, 8]


    // Fetch products based on category from custom data
    const { data, error, isLoading } = UseData('/products', {
        params: {
            category: selectedCategory,
            page: selectedPage,
        }
    }, [selectedCategory, selectedPage]);

    const originalProducts = data?.products || []; // Original data
    const [finalProducts, setFinalProducts] = useState([]); // Displayed data
    const [searchTerm, setSearchTerm] = useState(''); // For search input
    const [query, setQuery] = useState(''); // For submitted search
    const [sort, setSort] = useState('relevence'); // Sorting criteria

    // Update `finalProducts` whenever original products, search term, or sort changes
    useEffect(() => {

        let updatedProducts = [...originalProducts];

        // Apply search filter
        if (searchTerm) {
            updatedProducts = updatedProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        if (sort === 'price_desc') {
            updatedProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'price_asc') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'rate_desc') {
            updatedProducts.sort((a, b) => b.reviews.rate - a.reviews.rate);
        } else if (sort === 'rate_asc') {
            updatedProducts.sort((a, b) => a.reviews.rate - b.reviews.rate);
        }


        setFinalProducts(updatedProducts); // Update the displayed data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [originalProducts, query, sort]);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchTerm); // Apply search only on submit
    };

    // Handle sort changes
    const handleSort = (e) => {
        setSort(e.target.value);
    };

    const handlePageChange = (page) => {
        const currentPage = Object.fromEntries([...search])
        setSearch({ ...currentPage, page: page })
    }

    return (
        <section className="products_list_section">
            <header className="align_center products_header">


                {/* Search Form */}
                <form className='align_center navbar_form' onChange={handleSearch}>
                    <input
                        type='text'
                        className='navbar_search'
                        placeholder='Search Products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                   {/* <button className='search_button'>Search</button> */}
                </form>

                {/* Sorting Dropdown */}
                <select className='sorting' onChange={handleSort} value={sort}>
                    <option value="relevence">Relevance</option>
                    <option value="price_desc">Price High to Low</option>
                    <option value="price_asc">Price Low to High</option>
                    <option value="rate_desc">Rating High to Low</option>
                    <option value="rate_asc">Rating Low to High</option>
                </select>
            </header>

            {/* Product List */}
            <div className="products_list">
                {error && <em style={{ color: 'red' }}>Error Occurred, Please try again later..</em>}

                {/* loading */}
                {
                    isLoading && skeletones.map(s => (
                        <ProductCardSkelton key={s}></ProductCardSkelton>
                    ))
                }
                {/* display data */}
                {finalProducts.length > 0 ? (
                    finalProducts.map(product => (
                        <ProductCard key={product._id} product={product} id={product._id} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}

            </div>
            {
                data && <Pagination totalPost={data?.totalProducts}
                    postPerPage={8}
                    onClick={handlePageChange}
                    currentPage={selectedPage}>
                </Pagination>
            }

        </section>
    );
};


export default ProductsList
