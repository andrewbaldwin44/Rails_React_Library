export interface IBookData {
  id: string;
  authors: string;
  categories: string;
  title: string;
  imageLinks?: {
    smallThumbnail: string;
  };
}

export interface IBookMenuProps {
  openMenu: boolean;
}
