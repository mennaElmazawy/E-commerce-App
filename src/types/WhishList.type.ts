export interface wishlistResponse {
  status: string
  count: number
  data: whishListItem[]
}

export interface whishListItem {
  sold: number
  images: string[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

