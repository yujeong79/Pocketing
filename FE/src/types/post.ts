export interface Post {
  content: PostContent[];
  pageable: PostPageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: PostSort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface PostContent {
  postId: number;
  cardId: number;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string;
  memberName: string;
  albumTitle: string;
  postImageUrl: string;
  avgPrice: number;
}

export interface PostPageable {
  pageNumber: number;
  pageSize: number;
  sort: PostSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PostSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PostSort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
