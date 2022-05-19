type BooksType = {
  title: string;
  subtitle: string;
  isbn13: number;
  price: number;
  image?: string;
  url: string;

  authors?: string;
  publisher?: string;
  pages?: number;
  year?: number;
  rating?: number;
  desc?: string;
  pdf?: {
    [prop: string]: string;
  };
};

export default BooksType;
