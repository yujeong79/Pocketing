import Header from '@/components/common/Header';
import * as S from './PostPageStyle';
import ImageCarousel from '@/pages/sell/components/ImageCarousel';
import OptionSection from './components/OptionSection';

const PostPage = () => {
  return (
    <>
      <Header type="post" />
      <ImageCarousel />
      <S.Container>
        <OptionSection />
      </S.Container>
    </>
  );
};

export default PostPage;
