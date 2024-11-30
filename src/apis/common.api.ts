import axios, { AxiosInstance } from 'axios'

const request = axios.create({
  baseURL: 'https://app.codatta.io/api',
  timeout: 60000
})

class CommonApi {
  constructor(private request: AxiosInstance) {}

  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await this.request.post<{
      file_path: string
      original_name: string
    }>('/file/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { content_type: file.type }
    })

    return res.data
  }

  async uploadAudioFiles(files: Blob[], prefix = 'audio-') {
    const formData = new FormData()
    files.forEach((file, index) => {
      const hash = crypto.randomUUID()
      formData.append('files', file, `${prefix}${index}-${hash}.webm`)
    })

    const res = await this.request.post<{
      file_paths: string[]
      original_names: string[]
    }>('/file/batch-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          console.log(`Upload Progress: ${percentCompleted}%`)
        }
      }
    })

    return res.data
  }
}

export default new CommonApi(request)
