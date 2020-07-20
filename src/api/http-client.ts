import axios, { AxiosInstance } from "axios";

export class HttpClient {
  public static create(
    baseUrl: string,
    headers?: { [key: string]: string }
  ): AxiosInstance {
    return axios.create({
      baseURL: baseUrl,
      headers
    });
  }
}
