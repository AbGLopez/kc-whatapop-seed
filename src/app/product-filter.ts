type sellingState = 'selling' | 'sold';
export interface ProductFilter {
    text?: string;
    category?: string;
    state?: string;
    priceMin?: string;
    priceMax?: string;
    order?: string;
    name?: string;
}
