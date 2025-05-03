import Header from '@/components/common/Header';
import * as S from './PostPageStyle';
import ImageCarousel from '@/pages/sell/components/ImageCarousel';
const PostPage = () => {
  return (
    <>
      <Header type="post" />
      <ImageCarousel />
      <S.Container></S.Container>
    </>
  );
};

export default PostPage;
