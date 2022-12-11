import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_BACKEND_PATH as string,

})

export default class Files{



    static async upload(file: File, type : string){
        const data = new FormData()
            data.append('file', file)
           return await api.post(`api/uploadfiles/${type}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
    }

    static async uploadFilesAndAddToArchive(files: File[]){

      const fd = new FormData()
      const arrayFiles = Array.from(files)

      for(let i = 0; i < arrayFiles.length; i++ ) {
        fd.append("files[]", arrayFiles[i])
      }

     return await api.post(`api/uploadfiles/archive`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }

}
