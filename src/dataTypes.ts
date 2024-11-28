export type FetchStatus = "idle" | "loading" | "error" | "success";

export interface FetchResult<T> {
  fetchedData: T | null;
  paginatedData: T[] | null;
  error: boolean;
  status: FetchStatus;
  currentPage: number; 
  hasNextPage: boolean;
  hasPrevPage: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

export interface DataFetchResult<T> {
  fetchedData: T | null;
  error: boolean;
  status: FetchStatus;
  totalPosts: number
  currentPage: number; 
  hasNextPage: boolean;
  hasPrevPage: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}


export interface PostList {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

//USERS

export interface Company {
  bs?: string;
  catchPhrase?: string;
  name: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface UserList {
  id: number;
  name: string;
  website: string;
  email: string;
  company: Company;
  address: Address;
}

export interface User {
  id: number;
  name: string;
  website: string;
  company: Company;
  address: Address;
  email: string;
}

// Comments

export interface UserComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// UserTodos

export interface UserTodo {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;
}
