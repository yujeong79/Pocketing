import { useState } from 'react';

import Header from '@/components/common/Header';
import * as S from './AlarmStyle';
import { Winter1 } from '@/assets/assets';
import SmallButton from './components/SmallButton';

const AlarmPage = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleClickAccepted = () => {
    setIsAccepted(true);
  };

  const handleClickRejected = () => {
    setIsRejected(true);
  };

  return (
    <>
      <Header type="alarm" title="교환 알림" />
      <S.AlarmPageContainer>
        <S.AlarmItemContainer>
          {isRejected ? <S.RejectedCover /> : null}
          <S.AlarmProfileImage src={Winter1} alt="윈터1" />
          <S.AlarmRightSection>
            <S.AlarmHeader>
              <S.AlarmName>포챠코</S.AlarmName>
              <S.AlarmTitle>님이 포켓콜을 보냈어요</S.AlarmTitle>
            </S.AlarmHeader>
            <S.AlarmButtonContainer>
              {isAccepted ? (
                <SmallButton type="accept" text="채팅방으로 이동" onClick={() => {}} />
              ) : isRejected ? (
                <>
                  <SmallButton type="accept" text="수락" onClick={handleClickAccepted} />
                  <SmallButton type="reject" text="거절" onClick={handleClickRejected} />
                </>
              ) : (
                <>
                  <SmallButton type="accept" text="수락" onClick={handleClickAccepted} />
                  <SmallButton type="reject" text="거절" onClick={handleClickRejected} />
                </>
              )}
            </S.AlarmButtonContainer>
          </S.AlarmRightSection>
        </S.AlarmItemContainer>
      </S.AlarmPageContainer>
    </>
  );
};

export default AlarmPage;
