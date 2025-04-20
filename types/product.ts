export interface ProductDescription {
  Color?: string
  Collection?: string
  Material?: string
  Work?: string
  Occasion?: string[]
  Wash_care?: string
  Length?: number
  Blouse?: number
  Pattern?: string
}

export interface Product {
  productid: string
  image?: string
  Name: string
  Cateogory: string
  Price: number
  originalPrice?: number
  tags?: string[]
  Quantity: number
  Description?: ProductDescription
}

export interface Collection {
  slug: string
  name: string
  description: string
  image: string
  productCount: number
}

