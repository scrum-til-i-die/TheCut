# 4G06 Capstone Project - The Cut

## Members
- Stanley Liu
- Joseph Lu
- Matthew Po
- Suhavi Sandhu

## Dependencies
- node
- npm
- react-native
- docker
- docker-compose

### Development Set Up

#### ClientSide

```
$ cd frontend
```

1. `yarn intall --ignore-engines` to install dependences
2. Make sure you have expo client installed on machine
    - get the expo app on your phone as well
3. `yarn start`
4. scan the QR code to access application

#### Serverside

```
$ cd server
```

1. docker-compose build (only once or when code changes)
2. docker-compose up

#### React-Native Set Up
Follow the link to set up Android/Java development environment \
https://facebook.github.io/react-native/docs/getting-started \
On Android Studio/(your favorite code editor), run `npm run adroid`
#### Android Physical Device Set Up
https://facebook.github.io/react-native/docs/running-on-device
#### Vision API
Install Vision API: `pip3 install --upgrade google-cloud-vision`\
To test: `python3 backend/main.py`