
interface Item {
    name: string;
    value: string;
}
export interface IDropdownProps{
    defaultText: string;
    onSelect: (selectedItem: any, index: number) => void;
    items: Item[];
}