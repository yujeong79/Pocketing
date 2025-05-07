import logging
from typing import List, Dict, Any, Optional
from app.services.embedding import EmbeddingService
from app.models.schemas import PhotoCardVector

logger = logging.getLogger(__name__)


class PhotocardTransformer:

    def __init__(self):
        self.embedding_service = EmbeddingService()

    def transform_to_vector(self, photocard: Dict[str, Any]) -> Optional[PhotoCardVector]:
        try:
            required_fields = [
                'card_id', 'card_image_url', 'member_id', 'album_id', 'group_id',
                'member_name', 'group_name', 'album_name', 'tag'
            ]

            for field in required_fields:
                if field not in photocard or photocard[field] is None:
                    logger.warning(f"포토카드 데이터에 필수 필드가 누락됨: {field}")
                    return None

            tag = photocard.get('tag', [])
            if isinstance(tag, str):
                tag = [t.strip() for t in tag.replace(',', ' ').split() if t.strip()]

            try:
                card_id = int(photocard['card_id'])
                member_id = int(photocard['member_id'])
                album_id = int(photocard['album_id'])
                group_id = int(photocard['group_id'])
            except (ValueError, TypeError):
                logger.error(f"ID 필드 형식 변환 실패: {photocard['card_id']}")
                return None

            embedding = self.embedding_service.get_photocard_metadata_embedding(
                card_id=str(card_id),
                member_id=str(member_id),
                album_id=str(album_id),
                group_id=str(group_id),
                card_image_url=photocard['card_image_url'],
                member_name=photocard['member_name'],
                group_name=photocard['group_name'],
                album_name=photocard['album_name'],
                tag=tag
            )

            if not embedding:
                logger.error(f"포토카드 ID {photocard['card_id']}의 임베딩 생성 실패")
                return None

            return PhotoCardVector(
                card_id=card_id,
                card_image_url=photocard['card_image_url'],
                member_id=member_id,
                album_id=album_id,
                group_id=group_id,
                member_name=photocard['member_name'],
                group_name=photocard['group_name'],
                album_name=photocard['album_name'],
                tag=tag,
                embedding=embedding
            )

        except Exception as e:
            logger.error(f"포토카드 변환 중 오류 발생: {str(e)}")
            return None

    def transform_many_to_vectors(self, photocards: List[Dict[str, Any]]) -> List[PhotoCardVector]:
        try:
            vectors = []
            for i, photocard in enumerate(photocards):
                result = self.transform_to_vector(photocard)
                if result:
                    vectors.append(result)

                if (i + 1) % 100 == 0 or i + 1 == len(photocards):
                    logger.info(f"포토카드 변환 진행: {i + 1}/{len(photocards)}, 성공: {len(vectors)}")

            logger.info(f"포토카드 변환 완료: 총 {len(photocards)}개 중 {len(vectors)}개 성공")
            return vectors

        except Exception as e:
            logger.error(f"포토카드 일괄 변환 중 오류 발생: {str(e)}")
            return []

    def transform_bulk_to_vectors(self, photocards: List[Dict[str, Any]], batch_size: int = 100) -> List[
        PhotoCardVector]:
        try:
            # 유효한 포토카드 먼저 필터링
            valid_photocards = []
            for photocard in photocards:
                required_fields = [
                    'card_id', 'card_image_url', 'member_id', 'album_id', 'group_id',
                    'member_name', 'group_name', 'album_name', 'tag'
                ]
                if all(field in photocard and photocard[field] is not None for field in required_fields):
                    try:
                        int(photocard['card_id'])
                        int(photocard['member_id'])
                        int(photocard['album_id'])
                        int(photocard['group_id'])
                        valid_photocards.append(photocard)
                    except (ValueError, TypeError):
                        logger.error(f"ID 필드 형식 변환 실패: {photocard['card_id']}")
                else:
                    missing_fields = [field for field in required_fields if
                                      field not in photocard or photocard[field] is None]
                    logger.warning(
                        f"포토카드 데이터 누락으로 건너뜀: ID {photocard.get('card_id', 'unknown')}, 누락 필드: {missing_fields}")

            total_valid = len(valid_photocards)
            logger.info(f"벌크 변환 시작: 전체 {len(photocards)}개 중 유효 데이터 {total_valid}개")

            # 유효한 카드만 임베딩 시키기
            vectors = []
            for i in range(0, total_valid, batch_size):
                batch = valid_photocards[i:i + batch_size]
                metadata_for_embeddings = []
                for card in batch:
                    tag = card.get('tag', [])
                    if isinstance(tag, str):
                        tag = [t.strip() for t in tag.replace(',', ' ').split() if t.strip()]
                    metadata_for_embeddings.append({
                        'card_id': card['card_id'],
                        'card_image_url': card['card_image_url'],
                        'member_id': card['member_id'],
                        'album_id': card['album_id'],
                        'group_id': card['group_id'],
                        'member_name': card['member_name'],
                        'group_name': card['group_name'],
                        'album_name': card['album_name'],
                        'tag': tag
                    })

                bulk_embeddings = self.embedding_service.get_bulk_photocard_metadata_embeddings(metadata_for_embeddings)

                if not bulk_embeddings or len(bulk_embeddings) != len(batch):
                    logger.error(
                        f"배치 임베딩 개수 불일치: 예상 {len(batch)}개, 실제 {len(bulk_embeddings) if bulk_embeddings else 0}개")
                    continue

                for j, card in enumerate(batch):
                    tag = card.get('tag', [])
                    if isinstance(tag, str):
                        tag = [t.strip() for t in tag.replace(',', ' ').split() if t.strip()]

                    card_id = int(card['card_id'])
                    member_id = int(card['member_id'])
                    album_id = int(card['album_id'])
                    group_id = int(card['group_id'])

                    vectors.append(PhotoCardVector(
                        card_id=card_id,
                        card_image_url=card['card_image_url'],
                        member_id=member_id,
                        album_id=album_id,
                        group_id=group_id,
                        member_name=card['member_name'],
                        group_name=card['group_name'],
                        album_name=card['album_name'],
                        tag=tag,
                        embedding=bulk_embeddings[j]
                    ))
                processed = min(i + batch_size, total_valid)
                logger.info(f"벌크 변환 진행: {processed}/{total_valid}, 변환됨: {len(vectors)}")

            logger.info(f"벌크 변환 완료: 총 {total_valid}개 중 {len(vectors)}개 성공")
            return vectors

        except Exception as e:
            logger.error(f"포토카드 벌크 변환 중 오류 발생: {str(e)}")
            return []