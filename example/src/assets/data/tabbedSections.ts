import type { SectionListData } from 'react-native';

export interface ItemType {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface SectionType {
  title: string;
}

const foodImagesUrl = 'https://foodish-api.herokuapp.com/images';

export const TABBED_SECTIONS: SectionListData<ItemType, SectionType>[] = [
  {
    data: [
      {
        id: '0',
        title: 'Pizza Prosciutto e Funghi',
        subtitle: 'tomato sauce, mozzarella, ham, mushrooms',
        imageUrl: foodImagesUrl + '/pizza/pizza1.jpg',
      },
      {
        id: '1',
        title: 'Pizza Margharita',
        subtitle: 'tomato sauce, mozzarella',
        imageUrl: foodImagesUrl + '/pizza/pizza2.jpg',
      },
      {
        id: '10',
        title: 'Pizza Diavola',
        subtitle: 'tomato sauce, mozzarella, salami',
        imageUrl: foodImagesUrl + '/pizza/pizza3.jpg',
      },
      {
        id: '100',
        title: 'Pizza Funghi',
        subtitle: 'tomato sauce, mozzarella, mushrooms',
        imageUrl: foodImagesUrl + '/pizza/pizza4.jpg',
      },
      {
        id: '1000',
        title: 'Pizza Hawai',
        subtitle: 'tomato sauce, mozzarella, ham, pineapple',
        imageUrl: foodImagesUrl + '/pizza/pizza5.jpg',
      },
    ],
    key: 'Pizza',
    title: 'Pizza',
  },
  {
    data: [
      {
        id: '1003',
        title: 'Burger Double Cheese',
        subtitle: 'beef, lettuce, red onion, tomato, pickles, onion rings, BBQ sauce',
        imageUrl: foodImagesUrl + '/burger/burger1.jpg',
      },
      {
        id: '1004',
        title: 'Burger Bacon',
        subtitle: 'beef, lettuce, tomato, cheddar, pickles, bacon, mustard sauce',
        imageUrl: foodImagesUrl + '/burger/burger2.jpg',
      },
      {
        id: '1005',
        title: 'Burger Classic',
        subtitle: 'beef, lettuce, tomato, pickles, red onion, mustard, ketchup',
        imageUrl: foodImagesUrl + '/burger/burger3.jpg',
      },
      {
        id: '1006',
        title: 'Burger Chicken',
        subtitle: 'chicken, lettuce, onion rings, mayo sauce',
        imageUrl: foodImagesUrl + '/burger/burger4.jpg',
      },
      {
        id: '1008',
        title: 'Nachos Burger',
        subtitle: 'beef, lettuce, jalapeno, tomato, nachos, jalapeno sauce',
        imageUrl: foodImagesUrl + '/burger/burger5.jpg',
      },
      {
        id: '1009',
        title: 'Burger Camembert',
        subtitle: 'beef, lettuce, camembert, cranberries, tomato, mayo sauce',
        imageUrl: foodImagesUrl + '/burger/burger6.jpg',
      },
    ],
    key: 'Burgers',
    title: 'Burgers',
  },
  {
    data: [
      {
        id: '1011',
        title: 'Kebab 1',
        subtitle: 'meat, salad, mild sauce',
        imageUrl: foodImagesUrl + '/biryani/biryani1.jpg',
      },
      {
        id: '1012',
        title: 'Kebab 2',
        subtitle: 'meat, salad, mixed mild & hot sauce',
        imageUrl: foodImagesUrl + '/biryani/biryani2.jpg',
      },
      {
        id: '1013',
        title: 'Kebab 3',
        subtitle: 'meat, salad, hot sauce',
        imageUrl: foodImagesUrl + '/biryani/biryani3.jpg',
      },
    ],
    key: 'Kebab',
    title: 'Kebab',
  },
  {
    data: [
      {
        id: '1023',
        title: 'Fried chicken with pasta and vegetables',
        subtitle: 'chicken, pasta, vegetables',
        imageUrl: foodImagesUrl + '/rice/rice1.jpg',
      },
      {
        id: '1024',
        title: 'Spring rolls with vegetables',
        subtitle: 'spring rolls, vegetables',
        imageUrl: foodImagesUrl + '/rice/rice2.jpg',
      },
      {
        id: '1025',
        title: 'Breaded Chicken with rice and vegetables',
        subtitle: 'chicken, rice, vegetables',
        imageUrl: foodImagesUrl + '/rice/rice3.jpg',
      },
      {
        id: '1026',
        title: 'Fried rice with chicken, eggs and vegetables',
        subtitle: 'rice, chicken, eggs, vegetables',
        imageUrl: foodImagesUrl + '/rice/rice4.jpg',
      },
      {
        id: '1027',
        title: 'Breaded broccoli with hot garlic sauce',
        subtitle: 'broccoli, garlic sauce',
        imageUrl: foodImagesUrl + '/rice/rice5.jpg',
      },
      {
        id: '1028',
        title: 'Fried pork with pasta and vegetables',
        subtitle: 'pork, pasta, vegetables',
        imageUrl: foodImagesUrl + '/rice/rice6.jpg',
      },
      {
        id: '1029',
        title: 'Shrimps with garlic sauce',
        subtitle: 'shrimps, garlic sauce',
        imageUrl: foodImagesUrl + '/rice/rice7.jpg',
      },
    ],
    key: 'Chinese Food',
    title: 'Chinese Food',
  },
  {
    data: [
      {
        id: '1032',
        title: 'Sushi 1',
        subtitle: 'sushi x5',
        imageUrl: foodImagesUrl + '/rice/rice8.jpg',
      },
      {
        id: '1033',
        title: 'Sushi 2',
        subtitle: 'sushi x10',
        imageUrl: foodImagesUrl + '/rice/rice9.jpg',
      },
      {
        id: '1035',
        title: 'Sushi 3',
        subtitle: 'sushi x15',
        imageUrl: foodImagesUrl + '/rice/rice10.jpg',
      },
      {
        id: '1036',
        title: 'Sushi 4',
        subtitle: 'sushi x20',
        imageUrl: foodImagesUrl + '/rice/rice11.jpg',
      },
      {
        id: '1037',
        title: 'Sushi 5',
        subtitle: 'sushi x25',
        imageUrl: foodImagesUrl + '/rice/rice12.jpg',
      },
      {
        id: '1038',
        title: 'Sushi 6',
        subtitle: 'sushi x30',
        imageUrl: foodImagesUrl + '/rice/rice13.jpg',
      },
      {
        id: '1039',
        title: 'Sushi 7',
        subtitle: 'sushi x35',
        imageUrl: foodImagesUrl + '/rice/rice14.jpg',
      },
      {
        id: '104',
        title: 'Sushi 8',
        subtitle: 'sushi x40',
        imageUrl: foodImagesUrl + '/rice/rice15.jpg',
      },
      {
        id: '1040',
        title: 'Sushi 9',
        subtitle: 'sushi x45',
        imageUrl: foodImagesUrl + '/rice/rice16.jpg',
      },
      {
        id: '1041',
        title: 'Sushi 10',
        subtitle: 'sushi x50',
        imageUrl: foodImagesUrl + '/rice/rice17.jpg',
      },
      {
        id: '1042',
        title: 'Sushi 11',
        subtitle: 'sushi x55',
        imageUrl: foodImagesUrl + '/rice/rice18.jpg',
      },
      {
        id: '1043',
        title: 'Sushi 12',
        subtitle: 'sushi x60',
        imageUrl: foodImagesUrl + '/rice/rice19.jpg',
      },
    ],
    key: 'Sushi',
    title: 'Sushi',
  },
  {
    data: [
      {
        id: '1044',
        title: 'Allarrabiata',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta1.jpg',
      },
      {
        id: '1045',
        title: 'Carbonara',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta2.jpg',
      },
      {
        id: '1047',
        title: 'Bolognese',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta3.jpg',
      },
      {
        id: '1048',
        title: 'Spinaci',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta4.jpg',
      },
      {
        id: '1049',
        title: 'Aglio Olio',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta5.jpg',
      },
      {
        id: '1050',
        title: 'Lasagne',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta6.jpg',
      },
      {
        id: '1051',
        title: 'Funghi',
        subtitle: 'pasta',
        imageUrl: foodImagesUrl + '/pasta/pasta7.jpg',
      },
    ],
    key: 'Pasta',
    title: 'Pasta',
  },
];
