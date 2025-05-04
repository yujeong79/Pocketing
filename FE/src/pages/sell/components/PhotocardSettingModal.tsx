import React, { useState } from 'react';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import { Wonyoung1, Wonyoung2, Wonyoung3, Wonyoung4 } from '@/assets/assets';
import * as S from './PhotocardSettingModalStyle';

interface PhotocardSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PhotocardSettingData) => void;
}

interface PhotocardSettingData {
  group: string;
  member: string;
  album: string;
  version: string;
}

interface VersionImage {
  id: string;
  url: string;
}

interface PhotocardDataType {
  group: string[];
  member: Record<string, string[]>;
  album: Record<string, string[]>;
  version: Record<string, VersionImage[]>;
}

const PhotocardSettingModal: React.FC<PhotocardSettingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedData, setSelectedData] = useState<PhotocardSettingData>({
    group: '',
    member: '',
    album: '',
    version: '',
  });

  const [currentSection, setCurrentSection] = useState<keyof PhotocardSettingData>('group');
  const [searchQuery, setSearchQuery] = useState('');

  // 임시 데이터
  const data: PhotocardDataType = {
    group: ['아이브'],
    member: {
      아이브: ['안유진', '장원영', '리즈', '레이', '가을', '이서'],
    },
    album: {
      아이브: ['LOVE DIVE'],
    },
    version: {
      'LOVE DIVE': [
        { id: 'ver1', url: Wonyoung1 },
        { id: 'ver2', url: Wonyoung2 },
        { id: 'ver3', url: Wonyoung3 },
        { id: 'ver4', url: Wonyoung4 },
      ],
    },
  };

  const getCurrentList = () => {
    switch (currentSection) {
      case 'group':
        return data.group;
      case 'member':
        return selectedData.group ? data.member[selectedData.group] : [];
      case 'album':
        return selectedData.group ? data.album[selectedData.group] : [];
      case 'version':
        return selectedData.album
          ? data.version[selectedData.album].map((v: VersionImage) => v.id)
          : [];
      default:
        return [];
    }
  };

  const handleSelect = (type: keyof PhotocardSettingData, value: string) => {
    setSelectedData((prev) => {
      const newData = { ...prev, [type]: value };
      // 상위 항목이 변경되면 하위 항목 초기화
      if (type === 'group') {
        newData.member = '';
        newData.album = '';
        newData.version = '';
      } else if (type === 'album') {
        newData.version = '';
      }
      return newData;
    });

    // 선택 후 다음 섹션으로 자동 이동
    const sections: (keyof PhotocardSettingData)[] = ['group', 'member', 'album', 'version'];
    const currentIndex = sections.indexOf(type);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const filteredList = getCurrentList().filter((item: string) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderVersionGrid = () => {
    if (currentSection !== 'version' || !selectedData.album) return null;

    return (
      <>
        <S.VersionTitle>어떤 버전인가요?</S.VersionTitle>
        <S.VersionGrid>
          {data.version[selectedData.album].map((version: VersionImage, index: number) => (
            <S.VersionItem key={version.id} onClick={() => handleSelect('version', version.id)}>
              <S.VersionImage
                src={version.url}
                selected={selectedData.version === version.id}
                alt={`버전 ${index + 1}`}
              />
            </S.VersionItem>
          ))}
        </S.VersionGrid>
      </>
    );
  };

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="포카 설정">
      <S.Container>
        <S.LeftSection>
          <S.SettingLabel onClick={() => setCurrentSection('group')}>
            <S.LabelText>그룹명</S.LabelText>
            <S.SelectedValue>{selectedData.group || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('member')}>
            <S.LabelText>멤버명</S.LabelText>
            <S.SelectedValue>{selectedData.member || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('album')}>
            <S.LabelText>앨범명</S.LabelText>
            <S.SelectedValue>{selectedData.album || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('version')}>
            <S.LabelText>버전</S.LabelText>
            <S.SelectedValue>{selectedData.version || '선택'}</S.SelectedValue>
          </S.SettingLabel>
        </S.LeftSection>

        <S.RightSection>
          {currentSection !== 'version' ? (
            <S.SearchSection>
              <S.SearchInput
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <S.ItemList>
                {filteredList.map((item: string) => (
                  <S.Item
                    key={item}
                    selected={selectedData[currentSection] === item}
                    onClick={() => handleSelect(currentSection, item)}
                  >
                    {item}
                  </S.Item>
                ))}
              </S.ItemList>
            </S.SearchSection>
          ) : (
            renderVersionGrid()
          )}
        </S.RightSection>
      </S.Container>
      <S.ButtonWrapper>
        <Button
          height={48}
          fontStyle="headingMedium"
          onClick={() => onConfirm(selectedData)}
          text="등록하기"
        />
      </S.ButtonWrapper>
    </SlideUpModal>
  );
};

export default PhotocardSettingModal;
