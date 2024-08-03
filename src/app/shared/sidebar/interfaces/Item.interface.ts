export interface Item {
  key: number;
  name: string;
  hasMenu: boolean;
  option?: string;
  subOptions?: Item[];
  inputRequired?: boolean;
}
