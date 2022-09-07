import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

// <> & </> means Fragment without having to import

const Shop = () => {
    return (
        <div>
            <Routes>

                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<Category />} />
                
            </Routes>
        </div>
    )
};

export default Shop;