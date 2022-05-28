type BooksType = {
  title: string;
  subtitle: string;
  isbn13: string | undefined;
  price: string;
  image?: string;
  url: string;

  authors?: string;
  publisher?: string;
  pages?: string;
  year?: string;
  rating?: string;
  desc?: string;
  pdf?: {
    [prop: string]: string;
  };
};

export default BooksType;
