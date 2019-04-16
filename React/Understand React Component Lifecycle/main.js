class Counter extends React.Component {
  /**
   * Hàm constructor - dùng để khai báo state và bind function
   */
  constructor(props) {
    // Gọi hàm super(props) để tham chiếu đến hàm khởi tạo của React.Component,
    // để đảm bảo this.props không bị undefined
    super(props);

    // Khai báo state là count với giá trị ban đầu là 0
    this.state = {
      count: 0
    };

    // Bind hàm updateCounter với this,
    // hàm này được sử dụng trong 1 interval 
    // để tăng biến đếm state - count lên 1 đơn vị sau mỗi 1 giây
    this.updateCounter = this.updateCounter.bind(this);
    console.log("constructor");
  }

  /**
   * Phương thức này được gọi sau khi Counter Component được render xong.
   * Trong đây, mình khởi tạo một interval thông qua phương thức setInterval.
   * 
   * Vì bên trên, mình đã bind this.updateCounter với this rồi, 
   * nên ở đây mình truyền thẳng. 
   * 
   * Ngược lại, nếu bên trên không bind nó với this thì mình phải sửa lại thành:
   * 
   *   + this.counterInterval = setInterval(this.updateCounter.bind(this), 1000);
   *   + Hoặc: this.counterInterval = setInterval(() => this.updateCounter(), 1000);
   */
  componentDidMount() {
    this.counterInterval = setInterval(this.updateCounter, 1000);
    console.log("componentDidMount");
  }

  /**
   * Trong hàm này mình sẽ sử dụng phương thức this.setState,
   * để tăng giá trị của this.state.count lên 1 đơn vị.
   * 
   * Giả sử, bên trên mình không bind updateCounter với this,
   * cũng không sử dụng arrow function,
   * thì bên trong hàm này, this sẽ không phải là Counter Component,
   * tức this.state là undefined => bị sai.
   */
  updateCounter() {
    this.setState({
      count: this.state.count + 1
    });
  }

  /**
   * Phương thức này được gọi mỗi khi hàm this.setState được gọi,
   * để cập nhật lại giao diện.
   * 
   * Trong hàm này, mình cũng kiểm tra khi nào giá trị state count = 5
   * thì mình sẽ xoá Component này khỏi DOM tree 
   * để test phương thức componentWillUnmount
   */
  componentDidUpdate(prevProps, prevState) {
    console.log(`componentDidUpdate: count from ${prevState.count} to ${this.state.count}`);
    if (this.state.count === 5) {
      ReactDOM.unmountComponentAtNode(document.querySelector("#container"));
    }
  }

  /**
   * Phương thức này được gọi khi Component bị xoá khỏi DOM tree.
   * Trong đây, mình sẽ xoá interval đã đăng ký từ componentDidMount,
   * thông qua phương thức clearInterval.
   */
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.counterInterval);
  }

  /**
   * Phương thức render sử dụng giá trị this.state.count để in lên màn hình.
   */
  render() {
    console.log(`render: count = ${this.state.count}`);

    return (
      <div style={{ fontSize: `2rem` }}>
        {this.state.count}
      </div>
    );
  }
}

// Render Counter Component lên DOM tree
ReactDOM.render(<Counter />, document.querySelector("#container"));