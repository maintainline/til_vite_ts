import { configureStore } from '@reduxjs/toolkit';

// Redux 는 Store 를 조각조각 내서 사용한다.
// Store 를 조각내서 활용하는것을 slice 라고 한다.
import numReducer from './slices/numSlice';
// like Slice 추가
import likeReducer from './slices/likeSlice';

export const store = configureStore({
  reducer: { num: numReducer, like: likeReducer },
});

// 값을 읽을때의 타입
export type RootState = ReturnType<typeof store.getState>;
// 값을 갱신할 때의 타입
export type AppDispatch = typeof store.dispatch;
