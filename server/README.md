# Welcome to MindFocus Pro Back-End 🧠

MindFocus Pro is a cutting-edge Pomodoro technique mastery app designed to enhance productivity and focus. With built-in extensions for the Neurosity Headset, it takes your productivity to the next level by leveraging brainwave data for a more personalized and effective work or study experience.

## API Endpoint

1.  Clone to directory and change to server directory

2.  cd to directory and flask run

3.  Set your endpoint to:  http://127.0.0.1:8080/api/v1/brainwaves/pbb/stream

4. Send JSON in the following format:

{
  "timestamp": 1681736400000,
  "state": "focus",
  "sessionId": 1,
  "groupId": 1,
  "deviceId": 1,
  "data": {
    "alpha": [
      0.4326838933650053,
      0.7011913998347046,
      1.3717684682104212,
      0.4043711439234614,
      0.4276277910286375,
      0.7343967679911133,
      0.4643529443786634,
      0.5012185195340365
    ],
    "beta": [
      1.0473270376446968,
      0.6565360935142369,
      0.9905849734272257,
      0.4167252084581245,
      0.5812834985846604,
      0.9092642713573444,
      0.9963075404421067,
      1.0495665446734443
    ],
    "delta": [
      0.46131690566460004,
      1.0030278320362798,
      0.8563781797682917,
      0.2911634678359473,
      0.5829804845703581,
      0.6714666592936025,
      0.37730719195446316,
      1.0851178080710937
    ],
    "gamma": [
      0.22648773160183822,
      0.2171827127990081,
      0.2626969784220435,
      0.16349594919353772,
      0.17327387900192714,
      0.18990085940799623,
      0.22908540295491436,
      0.2537584109981627
    ],
    "theta": [
      0.6434504807739541,
      0.936240328507981,
      0.8679595766147628,
      0.23662065697316603,
      0.6048174207817718,
      0.816112075629094,
      0.3367745804938397,
      1.1043745310136739
    ]
  }
}

- **Pomodoro Technique Mastery**: Achieve productivity mastery through the renowned Pomodoro technique, a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

## Features

- **Pomodoro Technique Mastery**: Achieve productivity mastery through the renowned Pomodoro technique, a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

- **Neurosity Headset Integration**: Seamlessly integrate your Neurosity Headset with MindFocus Pro to unlock advanced features that leverage brainwave data for enhanced focus and productivity.

- **Personalized Experience**: Leverage real-time brainwave data to tailor your work or study sessions according to your cognitive state, ensuring maximum productivity and focus.

- **Built-in Extensions**: Explore a range of built-in extensions specially designed to enhance your productivity and focus, including brainwave visualization, focus tracking, and more.

## Installation

1. Clone the MindFocus Pro repository to your local machine:

2. Install the required dependencies:


3. Connect your Neurosity Headset to your device and follow the setup instructions provided by Neurosity.

4. Launch MindFocus Pro and start mastering your productivity with the Pomodoro technique and Neurosity Headset integration!

## Usage

- Launch MindFocus Pro and log in to your account.
- Customize your Pomodoro settings, including work intervals, break durations, and notification preferences.
- Connect your Neurosity Headset to MindFocus Pro and ensure it is properly calibrated.
- Start a work session and let MindFocus Pro guide you through focused work intervals and rejuvenating breaks.
- Monitor your productivity and focus levels with real-time brainwave data and adjust your sessions accordingly.

## Contributing

We welcome contributions from the community to help improve MindFocus Pro and make it even more powerful and user-friendly. Whether it's fixing bugs, adding new features, or enhancing documentation, your contributions are valuable. Here's how you can contribute:

- Fork the repository.
- Create your feature branch (`git checkout -b feature/my-feature`).
- Commit your changes (`git commit -am 'Add my feature'`).
- Push to the branch (`git push origin feature/my-feature`).
- Create a new Pull Request.

## Support

If you encounter any issues, have questions, or would like to provide feedback, please feel free to reach out to us. You can contact us via [email](mailto:alanchelmickjr@gmail.com) or [open an issue](https://github.com/mindfocuspro/mindfocus-pro/issues) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

[Visit our website](https://www.mindfocuspro.com) | [Follow us on Twitter](https://twitter.com/mindfocuspro) | [Join our community](https://community.mindfocuspro.com)


## For localhost testing
run server
`python3 main.py`

using port 8080
`http://localhost:8080/api/v1/hello-world`


when you change packages
`pip freeze >requirements.txt`

