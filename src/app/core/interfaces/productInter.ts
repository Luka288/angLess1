export interface jsonProducts {
  products: productInter[];
  total: 194;
  skip: 10;
  limit: 10;
}

export interface productInter extends jsonProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}
