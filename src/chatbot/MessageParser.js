class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
  }
  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();
    const normalizedMessage = this.removeVietnameseTones(lowercase);

    if (normalizedMessage.includes("hello") || normalizedMessage.includes("xin chao")) {
      this.actionProvider.greet();
    } else if (normalizedMessage.includes("muon")) {
      this.actionProvider.borrow();
    } else if (normalizedMessage.includes("tra")) {
      this.actionProvider.return();
    } else if (normalizedMessage.includes("san pham")) {
      this.actionProvider.book();
    } else if (normalizedMessage.includes("chinh sach")) {
      this.actionProvider.service();

    } else {
      this.actionProvider.nothing();
    }
  }
}

export default MessageParser;
