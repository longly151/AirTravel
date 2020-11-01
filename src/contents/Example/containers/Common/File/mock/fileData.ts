import { IFile } from '@core/utils/appHelper';

const fileData: IFile[] = [
  {
    name: 'Thuế',
    type: 'image/jpeg',
    uri: 'https://ctv-staging.s3.ap-northeast-2.amazonaws.com/quantum/juridical/36f6c60c111ff741ae0e.jpg',
    updatedAt: new Date('2020-10-07'),
  },
  {
    name: 'Giấy phép bán hàng',
    type: 'image/jpeg',
    updatedAt: new Date('2019-10-10'),
    uri: 'https://image.baodauthau.vn/w1024/Uploaded/2020/qjmfn/2018_06_18/t/02-1_sptz.jpg'
  },
  {
    name: 'Sổ đỏ',
    type: 'image/jpeg',
    updatedAt: new Date('2020-10-07'),
    uri: 'https://ctv-staging.s3.ap-northeast-2.amazonaws.com/quantum/juridical/84147a6bb861433f1a70.jpg'
  },
  {
    name: 'Chính sách bán hàng 1',
    type: 'application/pdf',
    uri: 'https://reesnext-prod.s3-ap-southeast-1.amazonaws.com/digital-contract.pdf',
    updatedAt: new Date('2020-06-05T21:14:46.762Z')
  },
  {
    name: 'Chính sách bán hàng 2',
    type: 'application/pdf',
    uri: 'https://reesnext-prod.s3-ap-southeast-1.amazonaws.com/digital-contract.pdf',
    updatedAt: new Date('2020-10-20T23:06:42.959Z')
  }
];
export default fileData;
