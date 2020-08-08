
import { fileUpload } from '../../helper/fileUpload'
import cloudinary from 'cloudinary';


cloudinary.config({ 
    cloud_name: 'dvgvmpecl', 
    api_key: '869465466566945', 
    api_secret: 'aQle-W3uAgwH44WIYwPKEBBRVes' 
  });
describe('fileUpload test ', () => {
    it('should be loading file and return Url', async (done) => {
        const resp = await fetch('https://cdn.shopify.com/s/files/1/0229/0839/files/Busqueda_de_imagenes_5_large.jpg?v=1578328892');
        const blob = await resp.blob()  
        const file = new File([blob],'mifoto.png');
        const url =await fileUpload(file)        
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imgID = segments[segments.length-1 ].replace('.jpg','');
        cloudinary.v2.api.delete_resources(imgID, {}, ()=>{
            done()
        });
    });

    it('should be return error', async () => {

        const file = new File([],'mifoto.png');
        const url =await fileUpload(file)        
        expect(url).toBeNull();
    });
});
