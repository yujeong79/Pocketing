import { useState } from 'react';

import * as S from './NicknameStyle';

import { SuccessIcon } from '@/assets/assets';
import { colors } from '@/styles/theme';

import BackButton from './components/BackButton';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const NicknamePage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.TitleContainer>
          <S.FirstTitle>환영합니다</S.FirstTitle>
          <S.SecondTitle>닉네임을 입력해주세요</S.SecondTitle>
        </S.TitleContainer>

        {/* TODO: 닉네임 입력 api 연동 */}
        <S.InputContainer>
          <S.InputBox
            style={{ borderBottomColor: isFocused ? colors.primary : colors.gray200 }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <S.Input placeholder="Nickname" />

            {/* TODO: 중복확인 결과에 따라 아이콘 변경하기 */}
            <S.CheckIcon src={SuccessIcon} />
          </S.InputBox>

          {/* TODO: 중복확인 결과에 따라 문구 변경하기 */}
          <S.Phrase>최대 10자까지 입력할 수 있습니다.</S.Phrase>
        </S.InputContainer>

        {/* TODO: 중복확인 버튼 클릭 시 중복확인 api 연동 */}
        <S.DuplicateCheckButtonContainer>
          <S.DuplicateCheckButton>중복확인</S.DuplicateCheckButton>
        </S.DuplicateCheckButtonContainer>
      </S.ItemContainer>
      <Button text="다음" onClick={() => navigate('/signup/profileimage')} />
    </S.PageContainer>
  );
};

export default NicknamePage;
