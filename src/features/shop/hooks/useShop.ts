import { useContext } from 'react';
import { ShopContext } from '../ShopContext';

// 5. 커스텀 훅
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('Shop 컨텍스트가 생성되지 않았습니다.');
  }
  return ctx;
}
