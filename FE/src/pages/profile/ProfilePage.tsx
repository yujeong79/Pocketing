import Header from '@/components/common/Header';
import MyInformation from './components/MyInformation';
import MyGroup from './components/MyGroup';
import MySaleList from './components/MySaleList';
import MyCompleteList from './components/MyCompleteList';
import Report from './components/Report';
import { useNavigate } from 'react-router-dom';

import * as S from './ProfileStyle';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleEditGroup = () => {
    navigate('/myGroupEdit', { state: { from: '/profile' } });
  };

  return (
    <>
      <Header type="profile" hasBorder={false} />
      <S.ContentContainer>
        <MyInformation />
        <MyGroup onEditGroup={handleEditGroup} />
        <MySaleList />
        <MyCompleteList />
        <Report />
      </S.ContentContainer>
    </>
  );
};

export default ProfilePage;
