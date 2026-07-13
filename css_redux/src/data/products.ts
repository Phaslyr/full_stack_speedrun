import lemonade from '../assets/lemonade.png';
import apple from '../assets/apple.svg';
import cinnamon from '../assets/cinnamon.jpg';
import cheddar from '../assets/cheddar.jpg';

export interface Product {
    id: number, 
    name: string, 
    price: number, 
    image: string
}

export const products: Array<Product> = [
    {
        id: 1,
        name: "Lemonade",
        price: 1,
        image: lemonade,
    },
    {
        id: 2,
        name: "Apple",
        price: 2,
        image: apple,
    },
    {
        id: 3,
        name: "Cinnamon",
        price: 5,
        image: cinnamon,
    },
    {
        id: 4,
        name: "Cheddar",
        price: 20000,
        image: cheddar,
    }];

export default products;