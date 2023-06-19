import 'whatwg-fetch';
import { fileUpload } from '../../services/fileUpload';



const urlresp = 'https://pruebas.com/foto.jpg'


jest.mock('whatwg-fetch')

describe('fileUpload unit test', () => {


  test('should return a string when upload files is success', async () => {

    (fetch as any) = jest.fn().mockResolvedValue({
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib-rb-1.2.18',
      ok: true,
      json: () => Promise.resolve({ secure_url: urlresp })
    } as Response)


    const file = new File([new ArrayBuffer(1)], 'foto.jpg');
    const url = await fileUpload(file);

    expect(url).not.toBeNull();
    expect(typeof url).toBe('string');
  })

  test('should return null when upload file fail', async () => {

    (fetch as any) = jest.fn().mockResolvedValue({
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib-rb-1.2.18',

      json: () => Promise.reject({ secure_url: urlresp })
    } as Response)
    const file = new File([new ArrayBuffer(1)], 'foto.jpg');

    const url = await fileUpload(file);

    expect(url).toBeNull();
  })

  test('should return null when file is not get', async () => {
    let file = new File([], 'foto.jpg');
    (file as any) = null;
    (fetch as any) = jest.fn()

    const url = await fileUpload(file);

    expect(url).toBeNull();
    expect(fetch).not.toBeCalled();
  })

})

