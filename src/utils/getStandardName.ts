//이름이 있으면 첫번째 문자는 대문자로, 나머지는 소문자 문자열
//splice(0,1) => index 0 부터 index 1까지 추출
//splice(1, name.length) => index1부터 name.length (마지막문자까지) 소문자문자열

const getStandardName = (name: string) => {
  return (
    name?.slice(0, 1).toUpperCase() +
    name?.slice(1, name.length).toLocaleLowerCase()
  );
};
export default getStandardName;
