type BookType = {
  title: string;
  subtitle?: string;
  authors: string;
  publisher: string;
  pages: number;
  year: number;
  rating: number;
  desc: string;
  isbn13: number;
  price: number;
  image?: string;
  url: string;
  pdf: {
    [prop: string]: string;
  };
};

export default BookType;
