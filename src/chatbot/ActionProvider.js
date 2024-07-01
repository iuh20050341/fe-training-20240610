class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }
   greet = () => {
    const message = this.createChatBotMessage("Xin chào.");
    this.addMessageToState(message);
    }
    nothing = () => {
      const message = this.createChatBotMessage("Xin lỗi! Tôi không biết!");
      this.addMessageToState(message);
    }
    borrow = () => {
      const message = this.createChatBotMessage("Bạn muốn mượn sách? Nếu muốn trước tiên hãy đăng nhập, sau đó vào phần thông tin chi tiết của quyển sách. Ở đó sẽ có thứ bạn cần!");
      this.addMessageToState(message);
      }
      book = () => {
        const message = this.createChatBotMessage("Mọi sản phẩm của hệ thống đều là sách chính hãng");
        this.addMessageToState(message);
        }  
    return = () => {
      const message = this.createChatBotMessage("Muốn trả sách, chỉ cần chọn chức năng Return Management phía trên. Ở đó sẽ có tất cả những quyển sách bạn đang mượn, và hãy nhấn vào biểu tượng trả sách nếu bạn muốn trả");
      this.addMessageToState(message);
      }  
      service = () => {
        const message = this.createChatBotMessage("Mọi thắc mắc về chính sách! Vui lòng liên hệ qua hotline 19001099");
        this.addMessageToState(message);
        }  
   addMessageToState = (message) =>{
    this.setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message],
    }))
   }
 }
 
 export default ActionProvider;