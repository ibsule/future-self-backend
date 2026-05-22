export interface Message {
    id: string
    content: string
    deliverAt: string
    delivered: boolean
    createdAt: string
    userId: string
  }
  
  export interface CreateMessageDto {
    content: string
    deliverAt: string
  }