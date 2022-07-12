export const fileUpload = async (file: File):Promise< (string | null)> => {
    if (!file) return null

    const cloudUrl = 'https://api.cloudinary.com/v1_1/rjsb2022/upload'
    const formData = new FormData();
    formData.append('upload_preset', 'journalApp')
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('Error respuesta servicio')

        const data = await resp.json()

        return data.secure_url;

    } catch (error) {
        return null
    }


}