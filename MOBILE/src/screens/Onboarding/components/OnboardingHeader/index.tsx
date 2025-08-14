import * as S from './style';
import { useOnboardingNavigation } from '@hooks/useNavigationHooks';

import { BACK_BUTTON_X3 } from '@constants/icons';

const NoneHeader = () => {
  const navigation = useOnboardingNavigation();

  return (
    <S.Container onPress={() => navigation.goBack()}>
      <S.BackButton >
        <S.BackButtonImage source={BACK_BUTTON_X3} />
      </S.BackButton>
    </S.Container>
  )
}

export default NoneHeader;