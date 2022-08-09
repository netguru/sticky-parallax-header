import * as React from 'react';
import type { SectionListData } from 'react-native';

import { Paragraph } from '../../components/primitiveComponents/Paragraph';

export const PARAGRAPH1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque cursus facilisis lorem, vitae fermentum est accumsan ac. Vivamus molestie ligula vitae eros ultricies tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque lorem mauris, sodales sit amet leo feugiat, iaculis placerat massa. Phasellus feugiat lobortis magna, in malesuada ipsum euismod non. Donec magna augue, hendrerit at velit at, lobortis aliquet tellus. Sed cursus sodales urna eget auctor. Nullam sollicitudin suscipit faucibus. Nunc eleifend lacus magna, et eleifend mauris tempor a. Sed ac aliquet urna, ut volutpat lacus. Aenean feugiat purus non nulla gravida pellentesque. Cras convallis eros eget feugiat convallis. Curabitur sit amet eros fringilla mauris tempus ultricies.';

export const PARAGRAPH2 =
  'Suspendisse non massa mauris. Sed arcu metus, aliquam eget viverra eget, blandit vitae est. Sed finibus lobortis feugiat. Integer sed lorem mi. Cras id turpis placerat, mattis mi sed, feugiat augue. Duis eu ipsum elementum, imperdiet lacus sed, congue tellus. Mauris nec augue non nibh pharetra molestie. Fusce pretium sapien quis eleifend interdum. Sed consectetur, sem eget sagittis imperdiet, felis mi aliquam nisl, sit amet lobortis nulla leo et enim. Sed faucibus magna vitae sodales pellentesque. Curabitur et scelerisque augue.';

export const PARAGRAPH3 =
  'Donec bibendum tellus non eros molestie pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In at interdum nisl, sed mattis sem. Vivamus lacus nulla, dictum bibendum viverra at, lacinia ac nunc. Quisque pharetra vel purus ut laoreet. Integer tempus condimentum sodales. Donec molestie laoreet tempor. Vestibulum a aliquet ipsum. Sed faucibus consectetur est, vel volutpat elit viverra id.';

export const PARAGRAPH4 =
  'Duis consequat scelerisque sapien at gravida. Aenean congue lorem a ante rutrum, ornare aliquet velit convallis. Curabitur suscipit lectus ultrices nunc finibus posuere. Nam at felis ornare, iaculis turpis nec, facilisis nulla. Nulla efficitur magna ex, eu ultricies sapien iaculis eu. Proin lobortis fermentum congue. Aliquam condimentum ornare tortor, vel euismod mi rhoncus in. Donec ut auctor arcu. Vivamus at purus eros. Nullam nec erat nec nisl rutrum elementum eu a turpis. Aenean in lacus pretium, dictum ipsum ut, posuere turpis.';

export const PARAGRAPH5 =
  'Donec velit metus, laoreet sed feugiat ac, sagittis non mi. Praesent ut neque vel nisi eleifend hendrerit. Nunc non nisl nec turpis dapibus feugiat id condimentum dolor. Vestibulum luctus magna eget mauris scelerisque tincidunt. Integer orci tortor, ultricies ultricies viverra vel, aliquet id mauris. Praesent feugiat scelerisque erat quis accumsan. Etiam vel hendrerit quam. Aliquam id ultrices leo. Sed pellentesque tempor ex ut tristique. Maecenas sed consequat quam, facilisis ultrices justo. Etiam quis vestibulum ligula, vitae interdum tellus. Fusce sodales venenatis turpis at facilisis. Phasellus hendrerit leo a enim ultricies, lacinia vehicula elit tempus. Nulla mi ex, porttitor sed tortor vel, efficitur finibus libero. Fusce sed fermentum nibh.';

export const DATA = [PARAGRAPH1, PARAGRAPH2, PARAGRAPH3, PARAGRAPH4, PARAGRAPH5];

export const SECTIONS: SectionListData<string>[] = [
  {
    data: DATA,
    keyExtractor: (item) => item,
    renderItem: ({ item }) => {
      return <Paragraph text={item} />;
    },
  },
  {
    data: DATA,
    keyExtractor: (item) => item,
    renderItem: ({ item }) => {
      return <Paragraph text={item} />;
    },
  },
  {
    data: DATA,
    keyExtractor: (item) => item,
    renderItem: ({ item }) => {
      return <Paragraph text={item} />;
    },
  },
  {
    data: DATA,
    keyExtractor: (item) => item,
    renderItem: ({ item }) => {
      return <Paragraph text={item} />;
    },
  },
  {
    data: DATA,
    keyExtractor: (item) => item,
    renderItem: ({ item }) => {
      return <Paragraph text={item} />;
    },
  },
];
