import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export interface UsersType {
  [index: string]: string | number
    id:number;
    name:string;
    username:string;
    phone:string;
    email:string
}
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  //headers: {'X-Custom-Header': 'foobar'}
})
const mock = new MockAdapter(api);
const expectedPlaces:UsersType[] = [
       { id : 1, name : 'Whmad', username:'Ahi', phone:'+1 (739) 211-3944', email:"zahmad18@hotmail.com"},
       { id : 2, name : 'Vudi', username:'Bud', phone:'+1 (739) 222-3954', email:"xbudi@hotmail.com"},
       { id : 3, name : 'Yono',username:'Yo', phone:'+1 (739) 352-3954', email:"yono@hotmail.com"},
       { id : 4, name: 'Bomlah',username:'Rom', phone:'+1 (785) 362-3554', email:"vromlah@hotmail.com"},
       { id: 5, name: 'Xambang', username:'Bam', phone:'+1 (775) 365-3254', email:"bambang@hotmail.com"},
       { id: 6, name: 'Zuadalupe', username:'Guad', phone:'+1 (739) 256-3944', email:"wguadalupe_Robel18@hotmail.com"},
       { id: 7, name: 'Laura', username:'Lau', phone:'+1 (375) 642-6657', email:"laura.Vandervort-Cassin95@gmail.com"},
       { id: 8, name: 'Gregory', username:'Greg', phone:'+1 (189) 666-2493', email:"gregory76@yahoo.com"},
       { id: 9, name: 'Hilda', username:'Hil', phone:'+1 (544) 499-8524', email:"hilda49@hotmail.com"},
       { id: 10, name: 'Myron', username:'Myron', phone:'+1 (334) 970-6182', email:"myron_Grady@gmail.com"},
       { id: 11, name: 'Connie', username:'Con', phone:'+1 (915) 227-2102', email:"connie.Morar74@gmail.com"},
     ]

mock.onGet('/api/users').reply(200, {
    data: expectedPlaces
  });
export default api;