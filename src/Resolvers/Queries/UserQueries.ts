interface IUser {
  name: string,
  age: number
}

export default {
  getUser: async (): Promise<Array<IUser>> => {
    return [
      {
        name: 'Abel Tran',
        age: 20
      },
      {
        name: 'Kara',
        age: 22
      }
    ];
  }
};