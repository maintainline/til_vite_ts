type SampleProps = {
  age: number;
  nickName: string;
  // children 은 있어도 없어도 적어주고 옵셔널 적용해주기
  children?: React.ReactNode;
};

const Sample = ({ age, nickName }: SampleProps) => {
  return (
    <div>
      {age}살이고요, {nickName} 인 샘플입니다.
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Sample age={20} nickName={'홍길동'} />
    </div>
  );
};

export default App;
