import { calcTotal } from '../utils';
import { useShop } from './useShop';

// 6. 추가 커스텀 훅 :  아이템 찾기, 총액
export function useShopSelectors() {
  const { goods, cart } = useShop();
  // 제품 한개 정보 찾기
  const getGood = (id: number) => goods.find(item => item.id === id);
  // 총금액
  const total = calcTotal(cart, goods);
  // 리턴
  return { getGood, total };
}
