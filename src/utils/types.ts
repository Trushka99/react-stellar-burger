
export type TIngredientData = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
  readonly Id: string;
  readonly count?: number;
  readonly index?: number;
};
export type TUserData = {
  email: string;
  name: string;
};
export type TOrderData = {
  _id: string;
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};
