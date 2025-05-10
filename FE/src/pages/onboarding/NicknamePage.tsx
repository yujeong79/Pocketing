import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './NicknameStyle';

import { SuccessIcon, ErrorIcon } from '@/assets/assets';
import { colors } from '@/styles/theme';
import { QUERY_KEYS } from '@/constants/queryKeys';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { checkNicknameDuplicate } from '@/api/signUp';

const NicknamePage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDuplicateCheck = async () => {
    const response = await checkNicknameDuplicate(nickname);
    setIsNicknameChecked(true);

    if (response.isDuplicate) {
      setIsDuplicate(true);
      console.log('중복');
    } else {
      setIsDuplicate(false);
      console.log('중복아님');
    }
    console.log(response);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    // 닉네임이 변경될 때마다 중복 체크 상태 초기화
    setIsNicknameChecked(false);
    setIsDuplicate(false);
  };

  const handleNext = () => {
    const prev = queryClient.getQueryData<{ nickname?: string }>([QUERY_KEYS.ONBOARDING]) || {};
    queryClient.setQueryData([QUERY_KEYS.ONBOARDING], {
      ...prev,
      nickname,
    });
    console.log(nickname);
    navigate('/signup/profileimage');
  };

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <S.TitleContainer>
          <S.FirstTitle>환영합니다</S.FirstTitle>
          <S.SecondTitle>닉네임을 입력해주세요</S.SecondTitle>
        </S.TitleContainer>
        <S.InputContainer>
          <S.InputBox
            style={{ borderBottomColor: isFocused ? colors.primary : colors.gray200 }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <S.Input placeholder="Nickname" value={nickname} onChange={handleNicknameChange} />
            {!isNicknameChecked ? null : isDuplicate ? (
              <S.CheckIcon src={ErrorIcon} />
            ) : (
              <S.CheckIcon src={SuccessIcon} />
            )}
          </S.InputBox>
          {nickname.length > 10 ? (
            <S.Phrase type="error">최대 10자까지 입력할 수 있습니다.</S.Phrase>
          ) : isNicknameChecked && !isDuplicate ? (
            <S.Phrase type="success">사용 가능한 닉네임입니다.</S.Phrase>
          ) : (
            <S.Phrase type="error"></S.Phrase>
          )}
        </S.InputContainer>
        <S.DuplicateCheckButtonContainer>
          <S.DuplicateCheckButton onClick={handleDuplicateCheck}>중복확인</S.DuplicateCheckButton>
        </S.DuplicateCheckButtonContainer>
      </S.ItemContainer>

      {/* TODO: 버튼 조건 수정  */}
      <Button
        text="다음"
        onClick={handleNext}
        disabled={!isNicknameChecked || isDuplicate || nickname.length > 10}
      />
    </S.PageContainer>
  );
};

export default NicknamePage;
