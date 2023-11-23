import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeroItem from '../../components/HeroItem/HeroItem';
import { Container, Box, Grid ,Typography , Pagination , Chip , Stack} from '@mui/material';
import heroImage from '../../assets/images/listingHero.png';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import { Title } from '../../components/Title/Title';
import { Loading } from '../../components/Loading/Loading';
import { useDataActions } from '../../hooks/useDataActions';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NotFound } from "../NotFound/NotFound";
export const Listing = () => {
    const { useProducts } = useDataActions();
    let { search } = useLocation();
    const searchFilter = useLocation().search;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event,value) => {
        setCurrentPage(value);
    };
    const handleNextChange = (event) => {
        if (currentPage !== products.pagination.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
        else {
            setCurrentPage(1);
        }
    };
    const searchParams = new URLSearchParams(search);
    const searchValue = searchParams.get('search') || '';
    const brandValue = searchParams.get('brand')|| '';
    const categoryValue = searchParams.get('category') || '';
    const arrivalValue = searchParams.get('new_arrival') || '';
    const { data: products, isLoading, isError } = useProducts({ searchFilter,currentPage })
    if (isError) return <p>Error ...</p>;
    const breadcrumbItems = [
        <Typography underline="hover" key="2">
            {arrivalValue ? 'new arrivals' : categoryValue ? categoryValue : brandValue ? brandValue : searchValue}
        </Typography>
    ];
    return (
        <>
            <HeroItem image={heroImage} />
            <Container maxWidth="xl">
                <Box mt={5}>
                    <Breadcrumb items={breadcrumbItems} />
                    <Title text={arrivalValue ? 'new arrivals' : categoryValue ? categoryValue : brandValue ? brandValue : searchValue} color={'primary'} />
                </Box>
                {isLoading ? (
                    <Box mb={5}><Loading num={12} /></Box>
                ) : products.results.length === 0 ? (
                    <NotFound />
                ) : (<>
                    <Grid container spacing={3}>
                        {products.results?.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <ProductCard {...product} chipLabel={product.stock_quantity <1 ?'Out Of Stock' : false}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                        <Stack direction="row" spacing={2}>
                            <Box sx={{ bgcolor: '#F1F1F1', borderRadius: 5, height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} px={1}>
                                <Pagination count={products.pagination.totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" color="primary"
                                    hidePrevButton
                                    hideNextButton
                                />
                            </Box>
                            <Chip label="Next" onClick={handleNextChange} color='secondary' sx={{ width: '67px', height: '36px' }} />
                        </Stack>
                    </Box>
                </>
                )}
            </Container>
        </>
    );
};