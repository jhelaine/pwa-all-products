import React, {useState, useEffect} from "react";

import { useQuery } from '@apollo/client';

import GET_SAMPLE_PRODUCTS from '../../queries/getSampleProducts.graphql';
import customcss from './custom.css';

import Gallery from '@magento/venia-ui/lib/components/Gallery';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';


const SeeAllProducts = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const { loading, error, data } = useQuery(GET_SAMPLE_PRODUCTS, {
        variables: { 
            pageSize: 10,
            currentPage
        }
    });

    const fetchTotalPages = data
        ? data.products.page_info.total_pages
        : null;

    const fetchCurrentPage = data 
        ? data.products.page_info.current_page
        : null;

    const items = data ? data.products.items : null;

    useEffect(() => {
        setTotalPages(fetchTotalPages);
        setCurrentPage(fetchCurrentPage);

        return () => {
            setTotalPages(null);
            setCurrentPage(null);
        };
    }, [setTotalPages, fetchTotalPages, setCurrentPage]);
    
    if (loading) return <LoadingIndicator />;

    if (error) {
        console.log('Error fetching data.');
    }

    return (
        <div className={customcss.wrapper}>
            {data && (
                <>
                    <Gallery items={items} />
                    <Pagination pageControl={pageControl} />
                 
                </>
            )}
        </div>
    );
}

export default SeeAllProducts;

