import { configureStore } from "@reduxjs/toolkit";
import { Product } from "./Product";
import AddToCard from "./AddToCard";
import { User } from "./User";
import Authentication from "./Authentication";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Order } from "./Order";

export const store = configureStore({
  reducer: {
    [Product.reducerPath]: Product.reducer,
    [AddToCard.name]: AddToCard.reducer,
    [User.reducerPath]: User.reducer,
    [Authentication.name]: Authentication.reducer,
    [Order.reducerPath]: Order.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    Product.middleware,
    User.middleware,
    Order.middleware,
  ],
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector