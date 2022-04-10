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
    static async uploadFiles(files: File[], type: string){

      const fd = new FormData()
      for (var i = 0; i < files.length ; i++) {
        fd.append(files[i].name, files[i]);
     }


     return await api.post(`api/uploadfiles/many/${type}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    }

}
