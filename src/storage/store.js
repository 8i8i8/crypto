

class Store {
  constructor() {
    this.data = null
  }
  addStoreData = (data) => {
    this.data = data
  }
  getStoreData = () => {
    return this.data;
  }
}
export default new Store;
