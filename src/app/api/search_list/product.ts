import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import ProductPreview from '@/app/lib/model/product_review';

interface FilterOptions {
    name?: string;
    kategori?: string;
    harga?: string;
}

const searchProductsByName = async (
    filtersOrName: FilterOptions | string = {}
): Promise<ProductPreview[]> => {
    const productsRef = collection(db, 'product');

    const filters: FilterOptions = typeof filtersOrName === 'string'
        ? { name: filtersOrName }
        : filtersOrName;

    const { name, kategori, harga } = filters;

    let q = query(productsRef);

    if (name) {
        q = query(
            q,
            where('name', '>=', name),
            where('name', '<=', name + '\uf8ff')
        );
    }

    const initialQuerySnapshot = await getDocs(q);
    const dataCount = initialQuerySnapshot.docs.length;

    if (dataCount > 2) {
        if (kategori && kategori.length > 0) {
            q = query(q, where('category', '==', kategori));
        }

        if (harga === 'termurah') {
            q = query(q, where('price', '>', 0), orderBy('price', 'asc'));
        } else if (harga === 'termahal') {
            q = query(q, where('price', '<', Number.MAX_SAFE_INTEGER), orderBy('price', 'desc'));
        } else if (harga === 'netral') {
            q = query(q, orderBy('name'));
        }
    }

    const finalQuerySnapshot = await getDocs(q);

    return finalQuerySnapshot.docs.map((doc) => ({
        product_id: doc.id,
        ...doc.data(),
    } as ProductPreview));
};

export default searchProductsByName;
