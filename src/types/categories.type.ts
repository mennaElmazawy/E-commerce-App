
export interface categoryResponseData {
    results: number;
    metadata: Metadata;
    data: category[];
}

export interface category {
    image: string;
    name: string;
    _id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
}
