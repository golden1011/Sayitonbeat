export const reduceNumber = (num: number): number => {
  if (num === 0) return 0;
  // Master numbers check (11, 22, 33)
  if (num === 11 || num === 22 || num === 33) return num;
  
  if (num < 10) return num;
  
  let sum = 0;
  const digits = num.toString().split('').map(Number);
  for (const d of digits) sum += d;
  
  return reduceNumber(sum);
};

export const calculateChart = (birthDate: string) => {
  // birthDate format: YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);

  const soul = reduceNumber(day);
  const karma = reduceNumber(month);
  const gift = reduceNumber(year % 100);
  const destiny = reduceNumber(year);
  
  // Path is usually sum of reduced components or sum of all.
  // Method: Reduce(Year) + Reduce(Month) + Reduce(Day) -> Reduce Sum
  const pathRaw = reduceNumber(year) + reduceNumber(month) + reduceNumber(day);
  const path = reduceNumber(pathRaw);
  
  // Shadow: Usually |Month - Day| or similar. 
  // Let's use |Soul - Karma| as the primary Shadow/Challenge.
  const shadow = Math.abs(soul - karma);

  // Money Code: Let's derive this from Path + 8 (Wealth) or something symbolic.
  // Or just Path + Destiny.
  const moneyCode = reduceNumber(path + 8); 

  return {
    soul,
    karma,
    gift,
    destiny,
    path,
    shadow,
    moneyCode
  };
};

export type Chart = ReturnType<typeof calculateChart>;
