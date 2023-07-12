class GenNumber extends React.Component {
  componentDidUpdate() {
    let digit, time;
    digit = this.props.level.main + 2;
    time = 100 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);

    let number = document.getElementById("number");
    setTimeout(() => {
      number.innerHTML = number.innerHTML.replace(/\w/gi, "&#183;");
    }, time);
  }

  componentDidMount() {
    let number = document.getElementById("number");

    setTimeout(() => {
      number.innerHTML = number.innerHTML.replace(/\w|\W/gi, "&#183;");
    }, 1200);
  }

  render() {
    return React.createElement(
      "div",
      { className: "number-box" },
      React.createElement(
        "div",
        { className: "info-box" },
        React.createElement(
          "p",
          { className: "level" },
          "Level: ",
          this.props.level.main,
          " - ",
          this.props.level.sub
        ),
        React.createElement(
          "p",
          { className: "mistakes" },
          "Wrong: ",
          this.props.wrong,
          "/3"
        )
      ),
      React.createElement(
        "p",
        { className: "divider" },
        "############################"
      ),
      React.createElement(
        "p",
        { className: "number", id: "number" },
        this.props.wrong < 3 ? atob(this.props.question) : "????"
      ),
      React.createElement(
        "p",
        { className: "divider" },
        "############################"
      )
    );
  }
}

class InputNumber extends React.Component {
  constructor() {
    super();
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleUserInput(e) {
    e.preventDefault();

    let userNumber = btoa(this.userNumber.value);

    this.userNumber.value = "";
    this.props.compareUserInput(userNumber);
  }

  handleReset() {
    this.props.onReset();
  }

  render() {
    let layout;

    if (this.props.wrong < 3) {
      layout = React.createElement(
        "div",
        { className: "input-box" },
        React.createElement(
          "form",
          { onSubmit: this.handleUserInput },
          "Number is:",
          React.createElement("input", {
            pattern: "[0-9]+",
            type: "text",
            ref: (ref) => (this.userNumber = ref),
            requierd: true,
            autoFocus: true,
          }),
          React.createElement("br", null),
          React.createElement("br", null)
        ),
        React.createElement("button", { onClick: this.handleReset }, "Restart")
      );
    } else {
      layout = React.createElement(
        "div",
        { className: "notif-box" },
        React.createElement(
          "div",
          { className: "notif" },
          "Better luck next time!"
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("button", { onClick: this.handleReset }, "Restart")
      );
    }

    return layout;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.compareUserInput = this.compareUserInput.bind(this);
    this.randomGenerate = this.randomGenerate.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      question: btoa(this.randomGenerate(2)),
      level: { main: 1, sub: 1 },
      wrong: 0,
    };
  }

  compareUserInput(userNumber) {
    let currQuestion = this.state.question;
    let mainLevel = this.state.level.main;
    let subLevel = this.state.level.sub;
    let wrong = this.state.wrong;
    let digit;

    if (userNumber == currQuestion) {
      if (subLevel < 3) {
        subLevel++;
      } else if (subLevel == 3) {
        mainLevel++;
        subLevel = 1;
      }
    } else {
      wrong++;
    }

    digit = mainLevel + 2;

    this.setState({
      question: btoa(this.randomGenerate(digit)),
      level: { main: mainLevel, sub: subLevel },
      wrong: wrong,
    });
  }

  randomGenerate(digit) {
    let min = Math.pow(10, digit - 1);
    let max = Math.pow(10, digit) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resetState() {
    this.setState({
      question: btoa(this.randomGenerate(2)),
      level: { main: 1, sub: 1 },
      wrong: 0,
    });
  }

  render() {
    return React.createElement(
      "div",
      { className: "main" },
      React.createElement(GenNumber, {
        question: this.state.question,
        level: this.state.level,
        wrong: this.state.wrong,
      }),
      React.createElement(InputNumber, {
        compareUserInput: this.compareUserInput,
        wrong: this.state.wrong,
        onReset: this.resetState,
      })
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
