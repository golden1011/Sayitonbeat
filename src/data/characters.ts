export interface Character {
  char: string;
  pinyin: string;
  meaning: string;
}

export const characters: Character[] = [
  { char: '一', pinyin: 'yī', meaning: 'One' },
  { char: '二', pinyin: 'èr', meaning: 'Two' },
  { char: '三', pinyin: 'sān', meaning: 'Three' },
  { char: '人', pinyin: 'rén', meaning: 'Person' },
  { char: '大', pinyin: 'dà', meaning: 'Big' },
  { char: '水', pinyin: 'shuǐ', meaning: 'Water' },
  { char: '火', pinyin: 'huǒ', meaning: 'Fire' },
  { char: '中', pinyin: 'zhōng', meaning: 'Middle' },
  { char: '国', pinyin: 'guó', meaning: 'Country' },
  { char: '好', pinyin: 'hǎo', meaning: 'Good' },
];
