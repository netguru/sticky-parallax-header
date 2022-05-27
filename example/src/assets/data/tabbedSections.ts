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

export const TABBED_SECTIONS: SectionListData<ItemType, SectionType>[] = [
  {
    data: [
      {
        id: '0',
        title: 'Alejandro Escamilla',
        subtitle: 'https://unsplash.com/photos/yC-Yzbqy7PY',
        imageUrl: 'https://picsum.photos/id/0/5616/3744',
      },
      {
        id: '1',
        title: 'Alejandro Escamilla',
        subtitle: 'https://unsplash.com/photos/LNRyGwIJr5c',
        imageUrl: 'https://picsum.photos/id/1/5616/3744',
      },
      {
        id: '10',
        title: 'Paul Jarvis',
        subtitle: 'https://unsplash.com/photos/6J--NXulQCs',
        imageUrl: 'https://picsum.photos/id/10/2500/1667',
      },
      {
        id: '100',
        title: 'Tina Rataj',
        subtitle: 'https://unsplash.com/photos/pwaaqfoMibI',
        imageUrl: 'https://picsum.photos/id/100/2500/1656',
      },
      {
        id: '1000',
        title: 'Lukas Budimaier',
        subtitle: 'https://unsplash.com/photos/6cY-FvMlmkQ',
        imageUrl: 'https://picsum.photos/id/1000/5626/3635',
      },
      {
        id: '1001',
        title: 'Danielle MacInnes',
        subtitle: 'https://unsplash.com/photos/1DkWWN1dr-s',
        imageUrl: 'https://picsum.photos/id/1001/5616/3744',
      },
      {
        id: '1002',
        title: 'NASA',
        subtitle: 'https://unsplash.com/photos/6-jTZysYY_U',
        imageUrl: 'https://picsum.photos/id/1002/4312/2868',
      },
    ],
    key: 'Popular',
    title: 'Popular',
  },
  {
    data: [
      {
        id: '1003',
        title: 'E+N Photographies',
        subtitle: 'https://unsplash.com/photos/GYumuBnTqKc',
        imageUrl: 'https://picsum.photos/id/1003/1181/1772',
      },
      {
        id: '1004',
        title: 'Greg Rakozy',
        subtitle: 'https://unsplash.com/photos/SSxIGsySh8o',
        imageUrl: 'https://picsum.photos/id/1004/5616/3744',
      },
      {
        id: '1005',
        title: 'Matthew Wiebe',
        subtitle: 'https://unsplash.com/photos/tBtuxtLvAZs',
        imageUrl: 'https://picsum.photos/id/1005/5760/3840',
      },
      {
        id: '1006',
        title: 'Vladimir Kudinov',
        subtitle: 'https://unsplash.com/photos/-wWRHIUklxM',
        imageUrl: 'https://picsum.photos/id/1006/3000/2000',
      },
      {
        id: '1008',
        title: 'Benjamin Combs',
        subtitle: 'https://unsplash.com/photos/5L4XAgMSno0',
        imageUrl: 'https://picsum.photos/id/1008/5616/3744',
      },
      {
        id: '1009',
        title: 'Christopher Campbell',
        subtitle: 'https://unsplash.com/photos/CMWRIzyMKZk',
        imageUrl: 'https://picsum.photos/id/1009/5000/7502',
      },
      {
        id: '101',
        title: 'Christian Bardenhorst',
        subtitle: 'https://unsplash.com/photos/8lMhzUjD1Wk',
        imageUrl: 'https://picsum.photos/id/101/2621/1747',
      },
      {
        id: '1010',
        title: 'Samantha Sophia',
        subtitle: 'https://unsplash.com/photos/NaWKMlp3tVs',
        imageUrl: 'https://picsum.photos/id/1010/5184/3456',
      },
    ],
    key: 'Product Design',
    title: 'Product Design',
  },
  {
    data: [
      {
        id: '1011',
        title: 'Roberto Nickson',
        subtitle: 'https://unsplash.com/photos/7BjmDICVloE',
        imageUrl: 'https://picsum.photos/id/1011/5472/3648',
      },
      {
        id: '1012',
        title: 'Scott Webb',
        subtitle: 'https://unsplash.com/photos/uAgLGG1WBd4',
        imageUrl: 'https://picsum.photos/id/1012/3973/2639',
      },
      {
        id: '1013',
        title: 'Cayton Heath',
        subtitle: 'https://unsplash.com/photos/D8LcRLwZyPs',
        imageUrl: 'https://picsum.photos/id/1013/4256/2832',
      },
      {
        id: '1014',
        title: 'Oscar Keys',
        subtitle: 'https://unsplash.com/photos/AmPRUnRb6N0',
        imageUrl: 'https://picsum.photos/id/1014/6016/4000',
      },
      {
        id: '1015',
        title: 'Alexey Topolyanskiy',
        subtitle: 'https://unsplash.com/photos/-oWyJoSqBRM',
        imageUrl: 'https://picsum.photos/id/1015/6000/4000',
      },
      {
        id: '1016',
        title: 'Philippe Wuyts',
        subtitle: 'https://unsplash.com/photos/_h7aBovKia4',
        imageUrl: 'https://picsum.photos/id/1016/3844/2563',
      },
      {
        id: '1018',
        title: 'Andrew Ridley',
        subtitle: 'https://unsplash.com/photos/Kt5hRENuotI',
        imageUrl: 'https://picsum.photos/id/1018/3914/2935',
      },
      {
        id: '1019',
        title: 'Patrick Fore',
        subtitle: 'https://unsplash.com/photos/V6s1cmE39XM',
        imageUrl: 'https://picsum.photos/id/1019/5472/3648',
      },
      {
        id: '102',
        title: 'Ben Moore',
        subtitle: 'https://unsplash.com/photos/pJILiyPdrXI',
        imageUrl: 'https://picsum.photos/id/102/4320/3240',
      },
      {
        id: '1020',
        title: 'Adam Willoughby-Knox',
        subtitle: 'https://unsplash.com/photos/_snqARKTgoc',
        imageUrl: 'https://picsum.photos/id/1020/4288/2848',
      },
      {
        id: '1021',
        title: 'Frances Gunn',
        subtitle: 'https://unsplash.com/photos/8BmNurlVR6M',
        imageUrl: 'https://picsum.photos/id/1021/2048/1206',
      },
      {
        id: '1022',
        title: 'Vashishtha Jogi',
        subtitle: 'https://unsplash.com/photos/bClr95glx6k',
        imageUrl: 'https://picsum.photos/id/1022/6000/3376',
      },
    ],
    key: 'Development',
    title: 'Development',
  },
  {
    data: [
      {
        id: '1023',
        title: 'William Hook',
        subtitle: 'https://unsplash.com/photos/93Ep1dhTd2s',
        imageUrl: 'https://picsum.photos/id/1023/3955/2094',
      },
      {
        id: '1024',
        title: 'Niko Virtanen',
        subtitle: 'https://nikovirtanen.com',
        imageUrl: 'https://picsum.photos/id/1024/1920/1280',
      },
      {
        id: '1025',
        title: 'Matthew Wiebe',
        subtitle: 'https://unsplash.com/photos/U5rMrSI7Pn4',
        imageUrl: 'https://picsum.photos/id/1025/4951/3301',
      },
      {
        id: '1026',
        title: 'Dmitrii Vaccinium',
        subtitle: 'https://unsplash.com/photos/Q47eNv_UvfM',
        imageUrl: 'https://picsum.photos/id/1026/4621/3070',
      },
      {
        id: '1027',
        title: 'Roksolana Zasiadko',
        subtitle: 'https://unsplash.com/photos/LyeduBb2Auk',
        imageUrl: 'https://picsum.photos/id/1027/2848/4272',
      },
      {
        id: '1028',
        title: 'Dikaseva',
        subtitle: 'https://unsplash.com/photos/zvf7cZ0PC20',
        imageUrl: 'https://picsum.photos/id/1028/5184/3456',
      },
      {
        id: '1029',
        title: 'freddie marriage',
        subtitle: 'https://unsplash.com/photos/utwYoEu9SU8',
        imageUrl: 'https://picsum.photos/id/1029/4887/2759',
      },
      {
        id: '103',
        title: 'Ilham Rahmansyah',
        subtitle: 'https://unsplash.com/photos/DwTZwZYi9Ww',
        imageUrl: 'https://picsum.photos/id/103/2592/1936',
      },
      {
        id: '1031',
        title: 'Mike Wilson',
        subtitle: 'https://unsplash.com/photos/rM7B4DheQc0',
        imageUrl: 'https://picsum.photos/id/1031/5446/3063',
      },
    ],
    key: 'Project Management',
    title: 'Project Management',
  },
  {
    data: [
      {
        id: '1032',
        title: 'NASA',
        subtitle: 'https://unsplash.com/photos/E7q00J_8N7A',
        imageUrl: 'https://picsum.photos/id/1032/2880/1800',
      },
      {
        id: '1033',
        title: 'Erez Attias',
        subtitle: 'https://unsplash.com/photos/KqVHRmHVwwM',
        imageUrl: 'https://picsum.photos/id/1033/2048/1365',
      },
      {
        id: '1035',
        title: 'Jared Erondu',
        subtitle: 'https://unsplash.com/photos/j4PaE7E2_Ws',
        imageUrl: 'https://picsum.photos/id/1035/5854/3903',
      },
      {
        id: '1036',
        title: 'Wolfgang Lutz',
        subtitle: 'https://unsplash.com/photos/yOujaSETXlo',
        imageUrl: 'https://picsum.photos/id/1036/4608/3072',
      },
      {
        id: '1037',
        title: 'Jordan McQueen',
        subtitle: 'https://unsplash.com/photos/93g2k8D1Mi8',
        imageUrl: 'https://picsum.photos/id/1037/5760/3840',
      },
      {
        id: '1038',
        title: 'Marcelo Quinan',
        subtitle: 'https://unsplash.com/photos/upywS5QFwr8',
        imageUrl: 'https://picsum.photos/id/1038/3914/5863',
      },
      {
        id: '1039',
        title: 'Andrew Coelho',
        subtitle: 'https://unsplash.com/photos/VB-w_3dnyvI',
        imageUrl: 'https://picsum.photos/id/1039/6945/4635',
      },
      {
        id: '104',
        title: 'Dyaa Eldin',
        subtitle: 'https://unsplash.com/photos/2fl-ocJ5MOA',
        imageUrl: 'https://picsum.photos/id/104/3840/2160',
      },
      {
        id: '1040',
        title: 'Rachel Davis',
        subtitle: 'https://unsplash.com/photos/tn2rBnvIl9I',
        imageUrl: 'https://picsum.photos/id/1040/4496/3000',
      },
      {
        id: '1041',
        title: 'Tim Marshall',
        subtitle: 'https://unsplash.com/photos/yEOCA6oiVqg',
        imageUrl: 'https://picsum.photos/id/1041/5184/2916',
      },
      {
        id: '1042',
        title: 'Jeremy Thomas',
        subtitle: 'https://unsplash.com/photos/rMmibFe4czY',
        imageUrl: 'https://picsum.photos/id/1042/3456/5184',
      },
      {
        id: '1043',
        title: 'Christian Joudrey',
        subtitle: 'https://unsplash.com/photos/mWRR1xj95hg',
        imageUrl: 'https://picsum.photos/id/1043/5184/3456',
      },
    ],
    key: 'QA',
    title: 'QA',
  },
  {
    data: [
      {
        id: '1044',
        title: 'Steve Carter',
        subtitle: 'https://unsplash.com/photos/Ixp4YhCKZkI',
        imageUrl: 'https://picsum.photos/id/1044/4032/2268',
      },
      {
        id: '1045',
        title: 'Aleksandra Boguslawska',
        subtitle: 'https://unsplash.com/photos/USOu_Ob9rxo',
        imageUrl: 'https://picsum.photos/id/1045/3936/2624',
      },
      {
        id: '1047',
        title: 'sergee bee',
        subtitle: 'https://unsplash.com/photos/bIQiMWxX_WU',
        imageUrl: 'https://picsum.photos/id/1047/3264/2448',
      },
      {
        id: '1048',
        title: 'Anthony DELANOIX',
        subtitle: 'https://unsplash.com/photos/b5POxb2aL9o',
        imageUrl: 'https://picsum.photos/id/1048/5616/3744',
      },
      {
        id: '1049',
        title: 'Rosan Harmens',
        subtitle: 'https://unsplash.com/photos/Sd8O2SgKDJA',
        imageUrl: 'https://picsum.photos/id/1049/3900/3120',
      },
      {
        id: '1050',
        title: 'Joseph Barrientos',
        subtitle: 'https://unsplash.com/photos/xcC5ozHk_N8',
        imageUrl: 'https://picsum.photos/id/1050/6000/4000',
      },
      {
        id: '1051',
        title: 'Ales Krivec',
        subtitle: 'https://unsplash.com/photos/HkTMcmlMOUQ',
        imageUrl: 'https://picsum.photos/id/1051/4928/3264',
      },
      {
        id: '1052',
        title: 'Annie Spratt',
        subtitle: 'https://unsplash.com/photos/x8R2oSWZRSE',
        imageUrl: 'https://picsum.photos/id/1052/4000/2667',
      },
      {
        id: '1053',
        title: 'Anna Popović',
        subtitle: 'https://unsplash.com/photos/x7HJdJZqplo',
        imageUrl: 'https://picsum.photos/id/1053/3596/2393',
      },
      {
        id: '1054',
        title: 'Sérgio Rola',
        subtitle: 'https://unsplash.com/photos/B1amIgaNkwA',
        imageUrl: 'https://picsum.photos/id/1054/3079/1733',
      },
      {
        id: '1055',
        title: 'Neil Thomas',
        subtitle: 'https://unsplash.com/photos/12rzbJhQ89E',
        imageUrl: 'https://picsum.photos/id/1055/5472/3648',
      },
      {
        id: '1056',
        title: 'Susanne Feldt',
        subtitle: 'https://unsplash.com/photos/SIoHky3TPeo',
        imageUrl: 'https://picsum.photos/id/1056/3988/2720',
      },
      {
        id: '1057',
        title: 'Stefan Kunze',
        subtitle: 'https://unsplash.com/photos/_SmZSuZwkHg',
        imageUrl: 'https://picsum.photos/id/1057/6016/4016',
      },
      {
        id: '1058',
        title: 'Liane Metzler',
        subtitle: 'https://unsplash.com/photos/DDp-gC81V0w',
        imageUrl: 'https://picsum.photos/id/1058/4608/3072',
      },
      {
        id: '1059',
        title: 'Clark Street Mercantile',
        subtitle: 'https://unsplash.com/photos/vC-GqGbakJo',
        imageUrl: 'https://picsum.photos/id/1059/7360/4912',
      },
    ],
    key: 'Recruitment',
    title: 'Recruitment',
  },
];
