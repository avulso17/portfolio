export interface IMidjourneyAPI {
  imagineReq: IImagineRequest
  imagineRes: IImagineResponse
}

interface IImagineResponse {
  imageURL: string
  percentage?: number
  status?: string
}

interface IImagineRequest {
  callbackURL?: string
  prompt: string
}
