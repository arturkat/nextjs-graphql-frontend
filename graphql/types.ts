export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CheckAuthResponse = {
  __typename?: 'CheckAuthResponse';
  loggedIn: Scalars['Boolean'];
};

export type CreateSessionInput = {
  id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CreateSessionResponse = {
  __typename?: 'CreateSessionResponse';
  url: Scalars['String'];
};

export type CreateTodoInput = {
  title: Scalars['String'];
};

export type LogOutResponse = {
  __typename?: 'LogOutResponse';
  loggedOut: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCheckoutSession: CreateSessionResponse;
  createTodo: Todo;
  getNewTokens: NewTokensResponse;
  logOut: LogOutResponse;
  removeTodo: Todo;
  signIn: SignResponse;
  signUp: SignResponse;
  updateTodo: Todo;
};


export type MutationCreateCheckoutSessionArgs = {
  items: Array<CreateSessionInput>;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationLogOutArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['Int'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};

export type NewTokensResponse = {
  __typename?: 'NewTokensResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  checkAuth: CheckAuthResponse;
  product: Product;
  products: Array<Product>;
  sayHello: Scalars['String'];
  todo: Todo;
  todos: Array<Todo>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryTodoArgs = {
  id: Scalars['Int'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignResponse = {
  __typename?: 'SignResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type UpdateTodoInput = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type CheckAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckAuthQuery = { __typename?: 'Query', checkAuth: { __typename?: 'CheckAuthResponse', loggedIn: boolean } };

export type CreateCheckoutSessionMutationVariables = Exact<{
  items: Array<CreateSessionInput> | CreateSessionInput;
}>;


export type CreateCheckoutSessionMutation = { __typename?: 'Mutation', createCheckoutSession: { __typename?: 'CreateSessionResponse', url: string } };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, price: number, quantity: number, description: string, image: string, brand: string, createdAt: any, updatedAt: any }> };

export type GetNewTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'NewTokensResponse', accessToken: string, refreshToken: string } };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, price: number, quantity: number, description: string, image: string, brand: string, createdAt: any, updatedAt: any } };

export type LogOutMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'LogOutResponse', loggedOut: boolean } };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: number, username: string, email: string } } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: number, username: string, email: string } } };
