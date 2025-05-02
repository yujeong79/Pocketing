import Header from '@/components/common/Header';
import MyInformation from './components/MyInformation';
import MyGroup from './components/MyGroup';
import MySaleList from './components/MySaleList';
import MyCompleteList from './components/MyCompleteList';
import Report from './components/Report';

import * as S from './ProfileStyle';

const ProfilePage = () => {
  return (
    <>
      <Header type="profile" hasBorder={false} />
      <S.ContentContainer>
        <MyInformation />
        <MyGroup />
        <MySaleList />
        <MyCompleteList />
        <Report />
      </S.ContentContainer>
    </>
  );
};

export default ProfilePage;
