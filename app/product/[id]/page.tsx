'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronLeft, PlusCircle, MinusCircle } from 'lucide-react';
import { addToCart } from '../../store/cartSlice';
import { useState, useEffect } from 'react';
import { Product } from '../../store/productsSlice';
import { useParams } from 'next/navigation';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const [quantity, setQuantity] = useState<number>(0);

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

    const handleAddToCart = () => {
        if (product && quantity > 0) {
            dispatch(
                addToCart({
                    ...product,
                    quantity: quantity,
                    image: product.images[0],
                })
            );
            router.push('/cart');
        }
    };

    useEffect(() => {
        if (id) {

            const fetchProduct = async () => {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            };

            fetchProduct();
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <span className="text-white text-xl">Loading...</span>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-black text-white p-6">
            { }
            <div className="mb-4">
                <ChevronLeft size={32} onClick={() => router.push('/')} className="cursor-pointer" />
            </div>

            { }
            <div className="bg-gray-800 p-6 rounded-lg shadow">
                <img src={product.images[0]} alt={product.title} className="h-64 w-full object-contain mb-4" />
                <h2 className="text-2xl font-semibold truncate">{product.title}</h2>
                <p className="font-bold text-yellow-400">${product.price}</p>
                <p className="text-sm text-gray-300 mb-4">★ {product.rating.toFixed(1)}</p>

                { }
                <div className="text-gray-300 text-sm mb-6">
                    <h3 className="font-semibold text-lg mb-2">Description:</h3>
                    <p>{product.description}</p>
                </div>

                { }
                <div className="flex items-center mb-6">
                    <MinusCircle size={32} onClick={handleDecrease} className="cursor-pointer" />
                    <span className="mx-4">{quantity}</span>
                    <PlusCircle size={32} onClick={handleIncrease} className="cursor-pointer" />
                </div>

                { }
                <button onClick={handleAddToCart} className="bg-yellow-400 text-black px-6 py-2 rounded-lg w-full">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
