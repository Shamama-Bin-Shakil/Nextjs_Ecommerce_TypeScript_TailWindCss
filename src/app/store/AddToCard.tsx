import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Data {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

interface State {
  data: Data[];
}
let data;
if (typeof window !== "undefined") {
  data = JSON.parse(localStorage.getItem("cardItem")!) ?? [];
}

const addToCard = createSlice({
  name: "addtocard",
  initialState: {
    data: data,
  } as State,
  reducers: {
    card: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
    cardItemRemove: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((i) => i.id !== action.payload);
    },
  },
});

export default addToCard;

export const { card, cardItemRemove } = addToCard.actions;

export const saveCard = (): any => async (dispatch: any, getState: any) => {
  localStorage.setItem("cardItem", JSON.stringify(getState().addtocard.data));
};
