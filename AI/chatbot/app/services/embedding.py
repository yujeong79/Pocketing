import logging
from typing import List, Optional, Dict, Any
from openai import OpenAI
from app.config.settings import settings

logger = logging.getLogger(__name__)


class EmbeddingService:

    def __init__(self):
        try:
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = settings.EMBEDDING_MODEL
            logger.info(f"임베딩 서비스 초기화 완료. 모델: {self.model}")
        except Exception as e:
            logger.error(f"임베딩 서비스 초기화 실패: {str(e)}")
            raise

    def get_text_embedding(self, text: str) -> List[float]:
        try:
            if not text:
                logger.warning("비어있는 텍스트에 대한 임베딩이 요청됨")
                return []

            response = self.client.embeddings.create(
                input=text,
                model=self.model
            )

            embedding = response.data[0].embedding
            logger.debug(f"텍스트 임베딩 완료. 차원: {len(embedding)}")

            return embedding

        except Exception as e:
            logger.error(f"텍스트 임베딩 실패: {str(e)}")
            return []

    def get_bulk_text_embeddings(self, texts: List[str], batch_size: int = 2048) -> List[List[float]]:
        try:
            if not texts:
                logger.warning("빈 리스트에 대한 대량 텍스트 임베딩이 요청됨")
                return []

            all_embeddings = []
            total_texts = len(texts)

            for i in range(0, total_texts, batch_size):
                batch = texts[i:i + batch_size]

                response = self.client.embeddings.create(
                    input=batch,
                    model=self.model
                )

                batch_embeddings = [item.embedding for item in response.data]
                all_embeddings.extend(batch_embeddings)

                processed = min(i + batch_size, total_texts)
                logger.debug(f"대량 텍스트 임베딩 진행: {processed}/{total_texts}")

            logger.info(f"전체 대량 텍스트 임베딩 완료: {len(all_embeddings)}개 텍스트")
            return all_embeddings

        except Exception as e:
            logger.error(f"대량 텍스트 임베딩 실패: {str(e)}")
            return []

    def get_photocard_metadata_embedding(self,
                                         card_id: str,
                                         card_image_url: str,
                                         member_id: str,
                                         album_id: str,
                                         group_id: str,
                                         member_name: str,
                                         group_name: str,
                                         album_name: str,
                                         tag: List[str]) -> List[float]:
        try:
            metadata_parts = [
                f"card_id: {card_id}",
                f"card_image_url: {card_image_url}",
                f"member_id: {member_id}",
                f"album_id: {album_id}",
                f"group_id: {group_id}",
                f"member_name: {member_name}",
                f"group_name: {group_name}",
                f"album_name: {album_name}",
                f"tag: {', '.join(tag)}"
            ]

            metadata = " ".join(metadata_parts)
            logger.debug(f"포토카드 메타데이터: {metadata}")

            return self.get_text_embedding(metadata)

        except Exception as e:
            logger.error(f"포토카드 메타데이터 임베딩 생성 실패: {str(e)}")
            return []

    def get_bulk_photocard_metadata_embeddings(self,
                                               photocards: List[Dict[str, Any]]) -> List[List[float]]:
        try:
            metadatas = []
            for card in photocards:
                metadata_parts = [
                    f"card_id: {card['card_id']}",
                    f"card_image_url: {card['card_image_url']}",
                    f"member_id: {card['member_id']}",
                    f"album_id: {card['album_id']}",
                    f"group_id: {card['group_id']}",
                    f"member_name: {card['member_name']}",
                    f"group_name: {card['group_name']}",
                    f"album_name: {card['album_name']}",
                    f"tag: {', '.join('tag')}"
                ]

                metadata = " ".join(metadata_parts)
                metadatas.append(metadata)

            return self.get_bulk_text_embeddings(metadatas)

        except Exception as e:
            logger.error(f"포토카드 대량 임베딩 생성 실패: {str(e)}")
            return []

    def get_search_query_embedding(self,
                                   query_text: str,
                                   card_id: Optional[str] = None,
                                   card_image_url: Optional[str] = None,
                                   member_id: Optional[str] = None,
                                   album_id: Optional[str] = None,
                                   group_id: Optional[str] = None,
                                   member_name: Optional[str] = None,
                                   group_name: Optional[str] = None,
                                   album_name: Optional[str] = None,
                                   tag: Optional[List[str]] = None) -> List[float]:
        try:
            detailed_query_parts = [query_text]

            if card_id:
                detailed_query_parts.append(f"card_id: {card_id}")
            if card_image_url:
                detailed_query_parts.append(f"card_image_url: {card_image_url}")
            if member_id:
                detailed_query_parts.append(f"member_id: {member_id}")
            if album_id:
                detailed_query_parts.append(f"album_id: {album_id}")
            if group_id:
                detailed_query_parts.append(f"group_id: {group_id}")
            if member_name:
                detailed_query_parts.append(f"member_name: {member_name}")
            if group_name:
                detailed_query_parts.append(f"group_name: {group_name}")
            if album_name:
                detailed_query_parts.append(f"album_name: {album_name}")
            if tag:
                detailed_query_parts.append(f"tag: {', '.join(tag)}")

            detailed_query = " ".join(detailed_query_parts)
            logger.debug(f"검색 쿼리 임베딩 생성: {detailed_query}")

            return self.get_text_embedding(detailed_query)

        except Exception as e:
            logger.error(f"검색 쿼리 임베딩 생성 실패: {str(e)}")
            return []