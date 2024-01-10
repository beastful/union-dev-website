export default class Track {
  constructor(data) {
    this.length = data.length;
    this.takes = data.takes || 100;
    this.children = [];
    this.count = 0;
    this.floor = 0;
    this.ceil = data.length;
    this.local = data.local;
    this.level = this.floor;
    this.last = null;
  }
  add(node) {
    node.length = this.length * node.takes * 0.01;
    node.floor = this.count;
    this.count += node.length;
    node.ceil = this.count;
    node.level = this.level + node.floor;
    this.children.push(node);
  }
  search(node, n, arr) {
    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];
      if (child.ceil + node.floor >= n) {
        arr.push(child);
        if (child.children.length <= 0) return child;
        return this.search(child, n, arr);
      }
    }
  }
  go(n) {
    let arr = [this];

    this.search(this, n, arr, 0);

    for (let i = 0; i < arr.length; i++) {
      arr[i].local((n - arr[i].level) / arr[i].length);
    }
    return arr;
  }
}
